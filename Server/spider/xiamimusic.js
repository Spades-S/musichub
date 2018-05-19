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
                'User-Agent': randomUserAgent(),
                Cookie: 'gid=152145358999356; _unsign_token=d0b3720790f2c64d7a5a324759b97ade; UM_distinctid=1623db36afc2e-01e3ed65e9807f-32637b05-1fa400-1623db36afde95; cna=L7PTEXieqy0CAdNlPXTzpeqD; bdshare_firstime=1521453852565; xmgid=232463ac-4f40-4c3c-a20b-a4d6dcb06b8a; join_from=0zqfTI9Kv2Ew3f7BEdw; XMPLAYER_url=/song/playlist/id/376022/object_name/default/object_id/0; XMPLAYER_addSongsToggler=0; __guestplay=Mzc2MDIyLDQ%3D; XMPLAYER_isOpen=0; _xiamitoken=a918ba724d6dc84eecb4597343590505; CNZZDATA921634=cnzz_eid%3D344463155-1521450138-null%26ntime%3D1523599350; CNZZDATA2629111=cnzz_eid%3D988709049-1521448475-null%26ntime%3D1523597682; uidXM=334224086; t_sign_auth=2; _umdata=85957DF9A4B3B3E8EB96018203FA79C62AE388548A6FBD080329FBF177164F1095E358161FA9767ECD43AD3E795C914C54D9233ADA5D6EC37BE1C9E615F12B9B; login_method=mobilelogin; member_auth=0z7PHo4a4m1uhqiQRdpjdXJJ5rXdT2CByd5TibUt5lYgJdsKZYf7l6uSQQ9K2iSToF4md%2F3NiW4N; user=334224086%22Spades%22images%2Fdefault%2Fxiami_7%2Favatar_new.png%220%22401%22%3Ca+href%3D%27http%3A%2F%2Fwww.xiami.com%2Fwebsitehelp%23help9_3%27+%3ELv4%3C%2Fa%3E%220%220%22799%2211542a0794%221523602971; isg=BMfHKwglUY6zedV9A_wEhei1Vn1RZJ-yXHxI35m0t9Z9COTKi5wr_gWKrshW4HMm'
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
            let songName
            let songLink
            const firstTagAInSongResult = $(SongResult[i]).find('a')[0]
            if ($(firstTagAInSongResult).attr('class') === 'slide_down') {
                songName = $($(SongResult[i]).find('a')[1]).attr('title')
                songLink = $($(SongResult[i]).find('a')[1]).attr('href')
            } else {
                songName = $(firstTagAInSongResult).attr('title')
                songLink = $(firstTagAInSongResult).attr('href')
            }

            const artistName = $($(ArtistResult[i]).find('a')[0]).attr('title')// TODO 补全所有作者，目前只读取了第一作者
            const artistLink = $($(ArtistResult[i]).find('a')[0]).attr('href')
            const albumName = $($(AlbumResult[i]).find('a')[0]).attr('title')
            const albumLink = $($(AlbumResult[i]).find('a')[0]).attr('href')
            // console.log(`[albumName]   ${albumName}`)
            // console.log(`[albumLink]   ${albumLink}`)
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
        throw (err)
    }
    return result
}

async function getXiaMiTotalNum(keyword) {
    let res = 0
    try {
        const HTMLOrigin = await getHTML(keyword, 1)
        const $ = cheerio.load(HTMLOrigin)
        res = Number($($('.seek_counts').find('b')[0]).text())
    } catch (err) {
        throw (err)
    }
    return res
}


module.exports = {
    getXiaMiData,
    getXiaMiTotalNum
}
