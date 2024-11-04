const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const con = require('../databaseCon')

const secretPassphrase = "c0mPlexP@ssw0rd!";

const secretKey = crypto
  .createHmac("sha256", secretPassphrase)
  .update("unique_salt_for_application")
  .digest("hex");

const authLogin = async (email, password) => {
  try {
    const query = `SELECT * FROM public.user_table u WHERE u.email = $1`;
    const results = await new Promise((resolve, reject) => {
      con.query(query, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (results.rows.length > 0) {
      const data = results.rows;
      const hashedPassword = data[0].password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        const email = data[0]?.email;
        const userName=data[0]?.first_name+" "+data[0].last_name
        const userId = data[0]?.user_id;
        const role = data[0]?.role;
        const allocated_admin=data[0]?.allocated_admin

        const token = jwt.sign(
          {
            userId: data[0].user_id,
            email: data[0].email,
            role: data[0].role,
      
          },
          secretKey,
          { expiresIn: "1h" }
        );
        return { status: 200, token, userName, userId, role,email,allocated_admin };
      } else {
        return { status: 401, message: "Invalid Credentials" };
      }
    }
  } catch (error) {
    console.error("Error Executing Login", error);
  }
};

module.exports = { authLogin };
