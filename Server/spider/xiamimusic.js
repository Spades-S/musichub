// Created by Spades <spadesge@gmail.com> on 18/03/20
// Brief: 利用关键字{keyword}，当前页{page}(从1开始)检索虾米音乐曲库，最多返回20条结果
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

const cheerio = require('cheerio')
const request = require('request')

const { randomUserAgent } = require('./utils')


const baseURL = 'http://www.xiami.com/search/song/page/'


function getHTML(keyword, page) {
    return new Promise((resolve, reject) => {
        request({
            url: `${baseURL}${page}`,
            headers: {
                Accept: '*/*',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
                Connection: 'keep-alive',
                Host: 'www.xiami.com',
                'User-Agent': randomUserAgent()
            },
            qs: { key: keyword }
        }, (err, res, body) => {
            if (err) {
                reject(err)
            } else {
                resolve(body)
            }
        })
    })
}

async function getXiaMiData(keyword, page) {
    const result = []
    try {
        const HTMLOrigin = await getHTML(keyword, page)
        const $ = cheerio.load(HTMLOrigin)
        const SongResult = $('.track_list tbody').find($('td.song_name'))
        const ArtistResult = $('.track_list tbody').find($('td.song_artist'))
        const AlbumResult = $('.track_list tbody').find($('td.song_album'))
        const Length = Object.entries(SongResult).length - 4
        for (let i = 0; i < Length; i++) {
            const songName = $($(SongResult[i]).find('a')[0]).attr('title')
            const songLink = $($(SongResult[i]).find('a')[0]).attr('href')
            const artistName = $($(ArtistResult[i]).find('a')[0]).attr('title')// TODO 补全所有作者，目前只读取了第一作者
            const artistLink = $($(ArtistResult[i]).find('a')[0]).attr('href')
            const albumName = $($(AlbumResult[i]).find('a')[0]).attr('title')
            const albumLink = $($(AlbumResult[i]).find('a')[0]).attr('href')
            result.push({
                song: {
                    name: songName,
                    link: songLink
                },
                artists: [{
                    name: artistName,
                    link: artistLink
                }],
                album: {
                    name: albumName,
                    link: albumLink
                },
                from: 'xiami'
            })
        }
    } catch (err) {
        throw (err)
    }
    return result
}

module.exports = {
    getXiaMiData
}
