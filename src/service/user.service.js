const db = require("../app/db");
class UserService {
  async createAccount(name, password) {
    const sql = `INSERT INTO t_users (name,password) values(?,?)`;
    const result = await db.execute(sql, [name, password]);
    return result;
  }

  // 查询用户
  async queryAccount(name) {
    const sql = `SELECT * FROM t_users WHERE name=?`;
    const result = await db.execute(sql, [name]);
    return result;
  }
}
module.exports = new UserService();