// Created by Spades<spadesge@gmail.com> on 18/03/19
// Brief: 利用关键字{keyword}，当前页{page}(从1开始)检索网易云音乐曲库，单次最多返回20条结果
// 返回结果：Array
// ArrayItem ={
//     song: {
//         name: 'songName',
//         link: 'songLink'
//     },
//     artists: [{ name: 'artistItemName', link: 'artistItemLink' }, ...],
//     album: {
//         name: 'albumName',
//         link: 'albumLink'
//     }
// }

const request = require('request')
const querystring = require('query-string')

const Encrypt = require('./netease_crypto')
const { randomUserAgent } = require('./utils')

const NetEaseMusicConfig = {
    host: 'music.163.com',
    path: '/weapi/search/get',
    method: 'POST',
    data: {
        csrf_token: '',
        s: '',
        limit: 20,
        offset: 0,
        type: 1
    }
}


function createWebAPIRequest(keyword, page) {
    const {
        host, path, method, data
    } = NetEaseMusicConfig
    data.offset = (page - 1) * 20
    data.s = keyword
    const cryptoreq = Encrypt(data)
    const options = {
        url: `http://${host}${path}`,
        method,
        headers: {
            Accept: '*/*',
            'Accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
            Connection: 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            Referer: 'https://music.163.com',
            Host: 'music.163.com',
            'User-Agent': randomUserAgent()
        },
        body: querystring.stringify({
            params: cryptoreq.params,
            encSecKey: cryptoreq.encSecKey
        })
    }
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (err) {
                reject(err)
            } else {
                resolve(body)
            }
        })
    })
}

async function getNetEaseData(keyword, page) {
    const result = []
    try {
        const originData = await createWebAPIRequest(keyword, page)
        const songsData = JSON.parse(originData).result.songs
        songsData.forEach((songItem) => {
            const {
                name: songName,
                id: songId,
                artists: originArtists,
                album: { name: albumName, id: albumId }
            } = songItem
            const artists = []
            originArtists.forEach((artistItem) => {
                artists.push({
                    name: artistItem.name,
                    link: `https://music.163.com/#/artist?id=${artistItem.id}`
                })
            })

            result.push({
                song: {
                    name: songName,
                    link: `https://music.163.com/#/song?id=${songId}`
                },
                artists,
                album: {
                    name: albumName,
                    link: `https://music.163.com/#/album?id=${albumId}`
                }
            })
        })
    } catch (err) {
        console.log(err)
    }
    return result
}


module.exports = {
    getNetEaseData
}
