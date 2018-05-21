// Created by Spades<spadesge@gmai.com> on 18/03/27


const {
    getNetEaseData, getNetEaseTotalNum, getQQData, getQQTotalNum, getXiaMiData, getXiaMiTotalNum
}
    = require('../spider/index')

const { baseURL } = require('../config')

const pageNum = 20

// async function getLocalResult(origin = 'netease', keyword, skipPage = 1, limit = pageNum) {
//     const result = await Songs.find().or([{
//         'artists.name': keyword,
//         from: origin
//     }, {
//         'song.name': keyword,
//         from: origin
//     }, {
//         'album.name': keyword,
//         from: origin
//     }]).limit(limit).skip((skipPage - 1) * limit)
//     return result
// }


function setRouter(router) {
    router.get('/', async (ctx) => {
        const UserAgentInfo = ctx.userAgent
        if (UserAgentInfo.isMobile) {
            await ctx.render('mobile')
        } else {
            await ctx.render('index')
        }
    })
    router.get(`${baseURL}/search/:source/:keyword/:page`, async (ctx) => {
        const { source, keyword, page } = ctx.params
        const sourceArr = ['netease', 'qq', 'xiami']
        const funcArr = [getNetEaseData, getQQData, getXiaMiData]
        let res = []
        const sourceIndex = sourceArr.indexOf(source)
        if (sourceIndex >= 0) {
            res = await funcArr[sourceIndex](keyword, page)
        } else {
            ctx.throw(502, 'invalid request')
        }
        ctx.body = res
    })
    router.get(`${baseURL}/total/:source/:keyword`, async (ctx) => {
        const { source, keyword } = ctx.params
        const sourceArr = ['netease', 'qq', 'xiami']
        const funcArr = [getNetEaseTotalNum, getQQTotalNum, getXiaMiTotalNum]
        let res = 0
        const sourceIndex = sourceArr.indexOf(source)
        if (sourceIndex >= 0) {
            res = await funcArr[sourceIndex](keyword)
            // 虾米有毒，返回总条数不是很准确，做最大条数限制
            if (res >= 60 * pageNum) {
                res = 60 * pageNum
            }
        } else {
            ctx.throw(502, 'invalid request')
        }
        ctx.body = res
    })
}

module.exports = {
    setRouter
}
