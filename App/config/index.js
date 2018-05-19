// created by Spades <spadesge@gmail.com> on 18/3/13

const path = require('path')

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

module.exports = {
    assetsRoot: resolve('../../Server/static'),
    viewRoot: resolve('../../Server/view'),
    build: {
        node_env: 'production',
        cssSourceMap: true,
        usePostCss: false,
        devtool: 'source-map',
        desktop: resolve('../../Server/view/index.html'),
        mobile: resolve('../../Server/view/mobile.html'),
        productionGzip: true
    },
    dev: {
        node_env: 'development',
        cssSourceMap: true,
        usePostCss: false
    },
    publicPath: '/',
    styleLang: 'scss'
}
