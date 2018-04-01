// created by Spades <spadesge@gmail.com> on 18/3/13

const config = require('../config')
const utils = require('./utils')

const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction ? config.build.cssSourceMap : config.dev.cssSourceMap


module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: sourceMapEnabled,
        extract: isProduction
    }),
    transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}
