const Router = require('koa-router')
const {
    login
} = require('../controller/user.controller')
const {
    verficationAccount,
    verifyAuthority

} = require('../middleware/auth.middleware')

// 用户登录接口 
// 1.登录之前进行鉴权 2.之后进行token令牌颁发
const user = new Router({
    prefix: '/login'
})
user.post('/', verficationAccount, verifyAuthority, login)


module.exports = user