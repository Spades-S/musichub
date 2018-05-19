// Created by Spades<spadesge@gmail.com> on 18/03/22

const KOA = require('koa')
const koaNunjucks = require('koa-nunjucks-2')
const Logger = require('koa-logger')
const Route = require('koa-router')
const path = require('path')
const userAgent = require('koa-useragent')

const { setRouter } = require('../router')

const { port } = require('../config')


const app = new KOA()
const router = new Route()

setRouter(router)

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
    ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type')
    ctx.set('Access-Control-Allow-Credentials', 'true')
    await next()
})

app.use(koaNunjucks({
    ext: 'html',
    path: path.resolve(__dirname, '../view'),
    nunjucksConfig: {
        trimBlocks: true
    }
}))

app.use(Logger())
app.use(userAgent)
app
    .use(router.routes())
    .use(router.allowedMethods())

app.use(require('koa-static')(path.resolve(__dirname, '../static'), {
    gzip: true
}))

app.listen(port, () => {
    console.log(`[INFO]  Service starts at port: ${port}`)
})
