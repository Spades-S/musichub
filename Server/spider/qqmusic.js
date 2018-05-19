// Created by Spades<spadesge@gmail.com> on 18/03/21
// Brief: 利用关键字{keyword}，当前页{page}(从1开始)检索QQ音乐曲库有版权，单次最多返回20条结果
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

const { randomUserAgent } = require('./utils')

const pageNum = 20

function createWebAPIRequest(keyword, page, pagenum) {
    const options = {
        url: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
        headers: {
            accept: '*/*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
            referer: 'https://y.qq.com/portal/search.html',
            'user-agent': randomUserAgent()
        },
        qs: {
            ct: 24,
            qqmusic_ver: 1298,
            new_json: 1,
            remoteplace: 'txt.yqq.center',
            searchid: 40301121301522732,
            t: 0,
            aggr: 1,
            cr: 1,
            catZhida: 1,
            lossless: 0,
            flag_qc: 0,
            p: page,
            n: pagenum,
            w: keyword,
            g_tk: 5381,
            jsonpCallback: '',
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0
        }
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

async function getQQData(keyword, page) {
    const result = []
    try {
        const originData = await createWebAPIRequest(keyword, page, pageNum)
        const { data: { song: { list: songList } } } = JSON.parse(originData)
        songList.forEach((songItem) => {
            const {
                name: songName,
                mid: songLink,
                album: { name: albumName, mid: albumLink },
                singer: originArtistArrar
            } = songItem
            const artistArrar = []
            originArtistArrar.forEach((singerItem) => {
                const { name: artistName, mid: artistLink } = singerItem
                artistArrar.push({
                    name: artistName,
                    link: `https://y.qq.com/n/yqq/singer/${artistLink}.html`
                })
            })

            result.push({
                song: {
                    name: songName,
                    link: `https://y.qq.com/n/yqq/song/${songLink}.html`
                },
                album: {
                    name: albumName,
                    link: `https://y.qq.com/n/yqq/album/${albumLink}.html`
                },
                artists: artistArrar
            })
        })
    } catch (err) {
        throw (err)
    }
    return result
}


async function getQQTotalNum(keyword) {
    let num = 0
    try {
        const originData = await createWebAPIRequest(keyword, 1, 1)
        num = JSON.parse(originData).data.song.totalnum
    } catch (err) {
        throw (err)
    }
    return num
}

module.exports = {
    getQQData,
    getQQTotalNum
}
