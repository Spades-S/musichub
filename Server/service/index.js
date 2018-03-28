// Created by Spades<spadesge@gmail.com> on 18/03/22

const KOA = require('koa')
const Logger = require('koa-logger')
const Route = require('koa-router')
const { setRouter } = require('../router')

const { port } = require('../config')


const app = new KOA()
const router = new Route()

setRouter(router)


app.use(Logger())
app
    .use(router.routes())
    .use(router.allowedMethods())


app.listen(port, () => {
    console.log(`[INFO]  Service starts at port: ${port}`)
})
