const bcrypt = require("bcryptjs");
const client = require("../databaseCon");

const registerNewUser = async (user) => {
    try {
      const { email, password, firstName, lastName, role } = user;

      
      const hashedpassword = await bcrypt.hash(password, 10);

      const query =
        "INSERT INTO user_table(email,password,role,first_name,last_name) VALUES($1,$2,$3,$4,$5) RETURNING *;";
      const values = [email, hashedpassword, role, firstName, lastName];
      const results = await new Promise((resolve, reject) => {
        client.query(query, values, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
  
      if (results.rowCount > 0) {
        return { status: 201, message: "New User Registered" };
      } else {
        return { status: 500, message: "Internal Server Error" };
      }
    } catch (error) {
      console.error("Error executing registerCompanyUser:", error);
    }
  };

  const assignAdminToUser = async (admin_id, user_id) => {
    try {

      const query = `UPDATE user_table SET allocated_admin = ${admin_id} WHERE user_id = ${user_id}`;
  
      results = await client.query(query);
      // const results = await new Promise((resolve, reject) => {
      //   client.query(query, (err, results) => {
      //     if (err) {
      //       reject(err);
      //     } else {
      //       resolve(results);
      //     }
      //   });
      // });
     
      
  
      if (results.rowCount > 0) {
        return { status: 201, message: "Admin assigned to user successfully" };
      } else {
        return { status: 404, message: "User not found or no changes made" };
      }
    } catch (error) {
      console.error("Error executing assignAdminToUser:", error);
      return { status: 500, message: "Internal server error" };
    }
  };
  

  const getAllUsers = async () => {
    try {
      const query = `SELECT * FROM user_table WHERE role = 'USER'`;
      results = await client.query(query);
      // const results = await new Promise((resolve, reject) => {
      //   con.query(query, (err, results) => {
      //     if (err) {
      //       reject(err);
      //     } else {
      //       resolve(results);
      //     }
      //   });
      // });

      
  
      if (results) {
        return { status: 200, message: "Users retrieved successfully", data: results.rows };
      } else {
        return { status: 404, message: "No users found" };
      }
    } catch (error) {
      console.error("Error executing getAllUsers:", error);
      return { status: 500, message: "Internal server error" };
    }
  };
  

  module.exports = {
    registerNewUser,
    getAllUsers,
    assignAdminToUser
  }