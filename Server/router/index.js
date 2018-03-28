// Created by Spades<spadesge@gmai.com> on 18/03/27

const { getNetEaseData, getQQData, getXiaMiData } = require('../spider/index')
const { Songs } = require('../model/index')

const { baseURL } = require('../config')

function setRouter(router) {
    router.get(`${baseURL}/:provider/:keyword/:page`, async (ctx) => {
        const { provider, keyword, page } = ctx.params
        let result = []
        switch (provider.toLowerCase()) {
            case 'netease':
                result = await getNetEaseData(keyword, page)
                break
            case 'qq':
                result = await getQQData(keyword, page)
                break
            case 'xiami':
                result = await getXiaMiData(keyword, page)
                break
            default:
                break
        }
        Songs.insertMany(result, { ordered: false }, (err) => {
            if (err) {
                if (err.code !== 11000) { // err.code === 11000 表示插入重复数据
                    throw err
                }
            }
        })

        ctx.body = result
    })

    router.get(`${baseURL}/search/:keyword`, async (ctx) => {
        const { keyword } = ctx.params
        const result = await Songs.find().or([{ 'artists.name': keyword }, { 'song.name': keyword }, { 'album.name': keyword }])
        ctx.body = result
    })
}

module.exports = {
    setRouter
}
