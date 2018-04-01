// created by Spades <spadesge@gmail.com> on 18/3/13

process.env.NODE_ENV = 'production'

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')

const baseWebpackConf = require('./webpack.base.conf')
const config = require('../config')
const utils = require('./utils')

const prodWebpackConf = {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.cssSourceMap,
            usePostCss: config.build.usePostCss,
            extract: true
        })
    },
    devtool: config.build.cssSourceMap ? config.build.devtool : false,
    output: {
        path: config.assetsRoot,
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    plugins: [
        new UglifyjsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: config.build.cssSourceMap,
            parallel: true
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css',
            allChunks: true
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.cssSourceMap
                ? {safe: true, map: {inline: false}}
                : {safe: true}
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: config.build.index,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new Webpack.HashedModuleIdsPlugin(),
        new Webpack.optimize.ModuleConcatenationPlugin(),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(utils.resolve('../node_modules')) === 0
                )
            }
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),
        new CopyWebpackPlugin([{
            from: utils.resolve('../static'),
            to: config.assetsRoot,
            ignore: ['.*']
        }])
    ]

}

if (config.build.productionGzip) {
    prodWebpackConf.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    )
}


module.exports = WebpackMerge(baseWebpackConf, prodWebpackConf)


