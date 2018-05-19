// Created by Spades<spadesge@gmail.com> on 18/03/27

const { getNetEaseData, getNetEaseTotalNum } = require('./neteasemusic')
const { getXiaMiData, getXiaMiTotalNum } = require('./xiamimusic')
const { getQQData, getQQTotalNum } = require('./qqmusic')

module.exports = {
    getNetEaseData,
    getNetEaseTotalNum,
    getQQData,
    getQQTotalNum,
    getXiaMiData,
    getXiaMiTotalNum
}
