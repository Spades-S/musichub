// Created by Spades<spadesge@gmail.com> on 18/03/22

const fs = require('fs')
const http2 = require('spdy')
const KOA = require('koa')
const Logger = require('koa-logger')
const path = require('path')
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
app.use(require('koa-static')('./static'))


const options = {
    key: fs.readFileSync(path.resolve(__dirname, './certicate/localhost-privkey.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './certicate/localhost-cert.pem'))
}

const server = http2.createServer(options, app.callback())

server.listen(port, () => {
    console.log(`[INFO]  Service starts at port: ${port}`)
})
