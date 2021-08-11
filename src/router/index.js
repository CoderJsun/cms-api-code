// 动态加载所有路由信息
const fs = require('fs')
const routes = (app) => {
    fs.readdirSync(__dirname).forEach((file) => {
        if (file === 'index.js') return
        const router = require(`./${file}`)
        app.use(router.routes())
        app.use(router.allowedMethods())
    })
}

module.exports = routes