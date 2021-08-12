const jwt = require('jsonwebtoken')
const {
    createUser
} = require('../service/user.service')
const {
    privateKey
} = require('../keys')
const {
    use
} = require('../router/auth.router')

class UserController {
    async create(ctx, next) {
        const result = await createUser(ctx.request.body)
        if (result.length) return {
            status: 200,
            data: {
                msg: '注册成功~',
            }
        }
    }

    async login(ctx, next) {
        const {
            id,
            name
        } = ctx.user

        const user = {
            id,
            name
        }

        //颁发令牌 --- 非对称加密
        const token = jwt.sign(user, privateKey, {
            expiresIn: 60 * 60,
            algorithm: 'RS256'
        })

        return ctx.body = {
            status: 200,
            data: {
                id,
                name,
                token
            }
        }
    }

    async register(ctx, next) {
        const result = await register()
        return ctx.body = result
    }
}

module.exports = new UserController()