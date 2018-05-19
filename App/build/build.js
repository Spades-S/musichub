// created by Spades <spadesge@gmail.com> on 18/3/13

require('shelljs/global')
const chalk = require('chalk')
const Webpack = require('webpack')

const config = require('../config')
const ora = require('ora')
const prodWebpackConf = require('./webpack.prod.conf')


var spinner = ora('build for production ... ')
spinner.start()
rm('-rf', config.assetsRoot)
mkdir('-p', config.assetsRoot)
rm('-rf', config.viewRoot)
mkdir('-p', config.viewRoot)
Webpack(prodWebpackConf, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        // If you are using ts-loader, setting this to true will
        // make TypeScript errors show up during build.
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')
    if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\\n'))
        process.exit(1)
    }
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
    ))

})

