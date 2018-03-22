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

const baseURL = 'http://www.xiami.com/search/song/page/'


function randomUserAgent() {
    const UserAgentList = [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89;GameHelper',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:46.0) Gecko/20100101 Firefox/46.0',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:46.0) Gecko/20100101 Firefox/46.0',
        'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
        'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)',
        'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
        'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)',
        'Mozilla/5.0 (Windows NT 6.3; Win64, x64; Trident/7.0; rv:11.0) like Gecko',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/13.10586',
        'Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1'
    ]
    const index = Math.floor(Math.random() * UserAgentList.length)
    return UserAgentList[index]
}

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
        for (let i = 0; i < 20; i++) {
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
                }
            })
        }
    } catch (err) {
        console.log(`[Error when GetXiaMiData]   ${err}`)
    }
    return result
}


module.exports = {
    getXiaMiData
}
