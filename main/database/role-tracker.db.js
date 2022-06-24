const pool = require("../config/db");

class RoleTracker {
  //a function to insert user and role in the role table
  static async insertUserRole(user, role, name, avatar) {
    const query = `INSERT INTO user_roles (user_id, role,name,avatar) VALUES ($1, $2,$3,$4)`;
    const values = [user, role, name, avatar];
    try {
      const { rows } = await pool.query(query, values);
      return [rows, null];
    } catch (err) {
      console.log(err);
      return [null, err];
    }
  }

  static async findUsersFromRoles(roles) {
    const query = `SELECT DISTINCT(user_id) FROM user_roles WHERE role = ANY($1::text[])`;
    const values = [roles];
    try {
      const { rows } = await pool.query(query, values);

      const users = rows.map((user) => `<@${user.user_id}>`);

      return [users, null];
    } catch (err) {
      console.log(err);
      return [null, err];
    }
  }

  static async findRolesFromUser(user) {
    const query = `SELECT DISTINCT(role) FROM user_roles WHERE user_id = $1`;
    const values = [user];
    try {
      const { rows } = await pool.query(query, values);

      const roles = rows.map((role) => role.role);

      return [roles, null];
    } catch (err) {
      console.log(err);
      return [null, err];
    }
  }

  static async removeRole(user, role) {
    const query = `DELETE FROM user_roles WHERE user_id = $1 AND role = $2`;
    const values = [user, role];
    try {
      const { rows } = await pool.query(query, values);
      return [rows, null];
    } catch (err) {
      console.log(err);
      return [null, err];
    }
  }

  static async getUsersAndTheirRoles() {
    const query = `SELECT name, role,avatar FROM user_roles`;
    try {
      const { rows } = await pool.query(query);

      const userRoles = {};

      rows.forEach((row) => {
        if (!userRoles[row.name]) {
          userRoles[row.name] = {
            avatar: row.avatar,
            roles: [],
          };
        }
        userRoles[row.name].roles.push(row.role);
      });

      return [userRoles, null];
    } catch (err) {
      console.log(err);
      return [null, err];
    }
  }
}

module.exports = RoleTracker;
