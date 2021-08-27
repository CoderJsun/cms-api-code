const types = require('../error/error.types')

const handleError = (error, ctx) => {
    let status, msg;
    switch (error.message) {
        case types.ACCOUNT_O_PASSWORD_NULL:
            status = 400
            msg = '用户名或密码不能为空'
            break;
        case types.ACCOUNT_NOT_FOUND:
            status = 400
            msg = '账户不存在~'
            break;
        case types.PASSWORD_ERROR:
            status = 400
            msg = '密码不正确~'
            break;
        case types.INVALID_TOKEN:
            status = 400
            msg = '无效的token ~'
            break;
        case types.ACCOUNT_IS_EXIST:
            status = 405
            msg = '账号已存在~'
            break;
        default:
            status = 404;
            msg = "NOT FOUND";
    }
    ctx.body = {
        status,
        data: {
            msg
        }
    }
}

module.exports = handleError