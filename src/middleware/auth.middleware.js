const jwt = require('jsonwebtoken')
const MD5 = require('../untils/password.handle')
const types = require('../app/error/error.types')
const servce = require('../service/user.service')

const {
    publicKey
} = require('../keys')

// 账号权限验证
const verficationAccount = async (ctx, next) => {
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
    const result = await servce.queryUser(name)
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

    // 将用户信息进行绑定
    ctx.user = user

    console.log('middleware 验证通过 ~')

    // 4.执行任务
    await next()
}

// 鉴权
const verifyAuthority = async (ctx, next) => {
    console.log('verifyAuthority~')
    // 获取  const authorization = ctx.headers.authorization
    const authority = ctx.headers.authorization
    if (!authority) {
        const error = new Error(types.INVALID_TOKEN)
        return ctx.app.emit('error', error, ctx)
    }
    const token = authority.replace('Bearer ', '')

    try {

        const result = jwt.verify(token, publicKey, {
            algorithms: ['RS256']
        })

        console.log(result)

        if (result) {
            ctx.user = result
        }

        await next()

    } catch {
        // 鉴权失败~
        const error = new Error(types.INVALID_TOKEN)
        return ctx.app.emit('error', error, ctx)
    }


}


module.exports = {
    verficationAccount,
    verifyAuthority
}