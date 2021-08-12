const db = require("../app/db");
class UserService {
  async createUser(params) {
    const {
      name,
      password
    } = params;
    const sql = `INSERT INTO t_users (name,password) values(?,?)`;
    const result = await db.execute(sql, [name, password]);
    return result[0];
  }

  // 查询用户
  async queryUser(name) {
    const sql = `SELECT * FROM t_users WHERE name=?`;
    const result = await db.execute(sql, [name]);
    return result[0];
  }
}
module.exports = new UserService();