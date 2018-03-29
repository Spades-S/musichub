// Created by Spades<spadesge@gmai.com> on 18/03/27

const { getNetEaseData, getQQData, getXiaMiData } = require('../spider/index')
const { Songs } = require('../model/index')

const { baseURL, leastNum } = require('../config')

const pageNum = 20

async function getLocalResult(origin = 'netease', keyword, skipPage = 1, limit = pageNum) {
    const result = await Songs.find().or([{
        'artists.name': keyword,
        from: origin
    }, {
        'song.name': keyword,
        from: origin
    }, {
        'album.name': keyword,
        from: origin
    }]).limit(limit).skip((skipPage - 1) * limit)
    return result
}


function setRouter(router) {
    // router.get(`${baseURL}/:provider/:keyword/:page`, async (ctx) => {
    //     const { provider, keyword, page } = ctx.params
    //     let result = []
    //     switch (provider.toLowerCase()) {
    //         case 'netease':
    //             result = await getNetEaseData(keyword, page)
    //             break
    //         case 'qq':
    //             result = await getQQData(keyword, page)
    //             break
    //         case 'xiami':
    //             result = await getXiaMiData(keyword, page)
    //             break
    //         default:
    //             break
    //     }
    //     Songs.insertMany(result, { ordered: false }, (err) => {
    //         if (err) {
    //             if (err.code !== 11000) { // err.code === 11000 表示插入重复数据
    //                 throw err
    //             }
    //         }
    //     })
    //     ctx.body = result
    // })

    router.get(`${baseURL}/search/:keyword/:page`, async (ctx) => {
        const { keyword, page } = ctx.params
        console.log('test')
        let [fromNetease, fromQQ, fromXiami] = await Promise.all([
            getLocalResult('netease', keyword, page),
            getLocalResult('qq', keyword, page),
            getLocalResult('xiami', keyword, page)])

        if (fromNetease.length < leastNum) {
            fromNetease = await getNetEaseData(keyword, page)
        }
        if (fromQQ.length < leastNum) {
            fromQQ = await getQQData(keyword, page)
        }
        if (fromXiami.length < leastNum) {
            fromXiami = await getXiaMiData(keyword, page)
        }
        ctx.body = {
            fromNetease,
            fromQQ,
            fromXiami
        }
    })

    router.get(`/test`, async (ctx) => {
        ctx.body = 'first'
    })
}


module.exports = {
    setRouter
}
