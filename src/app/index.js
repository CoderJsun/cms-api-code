const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const routers = require('../router')
const handleError = require('./error/error.handle')

// 对参数进行解析
app.use(bodyParser())

routers(app)

// 监听错误处理
app.on('error', handleError)


module.exports = app