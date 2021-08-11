const {
    createUser,
    queryUserById
} = require('../service/user.service')
class UserController {
    async create(ctx, next) {
        const result = await createUser(ctx.request.body)
        return ctx.body = result
    }

    async login(ctx, next) {
        const result = await queryUserById()
        return ctx.body = result
    }

    async register(ctx, next) {
        const result = await register()
        return ctx.body = result
    }
}

module.exports = new UserController()