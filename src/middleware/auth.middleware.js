const jwt = require('jsonwebtoken')
const MD5 = require('../untils/password.handle')
const types = require('../app/error/error.types')
const {
    queryUser
} = require('../service/user.service')

// 验证账号
const verficationAction = async (ctx, next) => {
    const {
        name,
        password
    } = ctx.request.body

    // 1. 账号密码空的情况
    if (!name || !password) {
        const error = new Error(types.ACCOUNT_OR_PASSWORD_NULL)
        return ctx.app.emit('error', error, ctx)
    }

    // 2.验证用户名和密码
    const result = await queryUser(name)

    const user = result[0]

    if (!user) {
        const error = new Error(types.ACCOUNT_NOT_FOUND)
        return ctx.app.emit('error', error, ctx)
    }

    // 3.验证密码
    if (MD5(password) != user.password) {
        const error = new Error(types.PASSWORD_ERROR)
        return ctx.app.emit('error', error, ctx)
    }

    // 4.执行任务
    await next()
}


module.exports = {
    verficationAction
}