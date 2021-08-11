const types = require('../error/error.types')

const handleError = (error, ctx) => {
    let status, message;
    switch (error.message) {
        case types.ACCOUNT_O_PASSWORD_NULL:
            status = 400
            message = '用户名或密码不能为空'
            break;
        case types.ACCOUNT_NOT_FOUND:
            status = 400
            message = '账户不存在~'
            break;
        case types.PASSWORD_ERROR:
            status = 400
            message = '密码不正确~'
            break;
        case types.ACCOUNT_IS_EXIST:
            status = 405
            message = '账号已存在~'
            break;
        default:
            status = 404;
            message = "NOT FOUND";
    }
    ctx.body = {
        status,
        message,
        data: {}
    }
}

module.exports = handleError