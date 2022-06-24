const pool = require("../config/db");
const uniqid = require("uniqid");

class LeaveTracker {
  static async registerLeave(userID, startDate, endDate, reason, avatar, name) {
    const query = `INSERT INTO leave_tracker (user_id, start_date, end_date, reason,avatar,name,leave_id) VALUES ($1, $2, $3, $4,$5,$6,$7)`;
    const leaveID = uniqid();
    const values = [userID, startDate, endDate, reason, avatar, name, leaveID];
    try {
      await pool.query(query, values);

      return [leaveID, null];
    } catch (err) {
      console.error(err);
      return [null, err];
    }
  }

  static async findUserID(leaveID) {
    const query = `SELECT user_id FROM leave_tracker WHERE leave_id = $1`;
    const values = [leaveID];
    try {
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) {
        return [null, "Leave not found"];
      }
      return [rows[0].user_id, null];
    } catch (err) {
      console.error(err);
      return [null, "There was a database error"];
    }
  }

  static async cancelLeave(leaveID) {
    const query = `DELETE FROM leave_tracker WHERE leave_id = $1`;
    const values = [leaveID];
    try {
      await pool.query(query, values);
      return [true, null];
    } catch (err) {
      console.error(err);
      return [null, err];
    }
  }

  static async getCurrentLeaves() {
    const formattedDate = new Date().toISOString().split("T")[0];

    const query = `SELECT avatar,name,end_date,start_date FROM leave_tracker WHERE $1 >= start_date AND $1 <= end_date`;
    const values = [formattedDate];
    try {
      const { rows } = await pool.query(query, values);

      if (rows.length === 0) {
        return [0, null];
      }

      const userOnLeaves = rows.map((row) => {
        return {
          avatar: row.avatar,
          name: row.name,
          endDate: row.end_date.toISOString().split("T")[0],
          startDate: row.start_date.toISOString().split("T")[0],
        };
      });

      return [userOnLeaves, null];
    } catch (err) {
      console.error(err);
      return [null, err];
    }
  }
}

module.exports = LeaveTracker;
