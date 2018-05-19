// created by Spades <spadesge@gmail.com> on 18/3/13

const PostCompilePlugin = require('webpack-post-compile-plugin')
const TransformModulesPlugin = require('webpack-transform-modules-plugin')

const config = require('../config')
const { resolve } = require('./utils')
const VueLoaderConf = require('./vue-loader.conf')

module.exports = {
    context: resolve('../'),
    entry: {
        des: './src/view/desktop/desktop.js',
        mob: './src/view/mobile/mobile.js'
    },
    output: {
        path: config.assetsRoot,
        publicPath: config.publicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('../src/components')
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: VueLoaderConf
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('../src')]
        }, {
            test: /.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }]
    },
    plugins: [
        new PostCompilePlugin(),
        new TransformModulesPlugin()
    ]

}