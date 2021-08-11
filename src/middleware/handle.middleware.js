const types = require('../app/error/error.types')
const {
    queryUser
} = require('../service/user.service')
const MD5 = require('../untils/password.handle')

// 账号处理中间件
const queryAccount = async (ctx, next) => {
    const {
        name,
        password
    } = ctx.request.body

    // 1.账号判断
    if (!name || !password) {
        const error = new Error(types.ACCOUNT_OR_PASSWORD_NULL)
        return ctx.app.emit('error', error, ctx)
    }

    // 2.查询账号
    const result = await queryUser(name)
    const user = result[0]
    if (user.length) {
        const error = new Error(types.ACCOUNT_IS_EXIST)
        return ctx.app.emit('error', error, ctx)
    }

    await next()

}

// 密码处理
const handlepassword = async (ctx, next) => {
    const {
        password
    } = ctx.request.body

    ctx.request.body.password = MD5(password)

    await next()
}

module.exports = {
    queryAccount,
    handlepassword
}