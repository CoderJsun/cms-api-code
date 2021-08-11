const mysql2 = require('mysql2')
const config = require('./config')

const db = mysql2.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD
})

db.getConnection((err, conn) => {
    conn.connect((err) => {
        if (!err) {
            console.log('数据库连接 success ~')
        }
    })
})

module.exports = db.promise()