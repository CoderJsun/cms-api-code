const Router = require('koa-router')
const {
    create
} = require('../controller/user.controller')
const {
    queryAccount,
    handlepassword
} = require('../middleware/handle.middleware')

// 用户注册接口
const regsiter = new Router({
    prefix: '/regsiter'
})
regsiter.post('/', queryAccount, handlepassword, create)


module.exports = regsiter