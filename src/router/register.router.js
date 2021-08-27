const Router = require('koa-router')
const {
    create
} = require('../controller/user.controller')
const {
    checkAccount,
    handlePassword
} = require('../middleware/process.middleware')

// 用户注册接口
const regsiter = new Router({
    prefix: '/regsiter'
})
regsiter.post('/', checkAccount, handlePassword, create)


module.exports = regsiter