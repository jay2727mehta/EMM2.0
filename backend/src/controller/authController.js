const express = require("express");
const router = express.Router();
const authService = require("../DL/Auth/authDL");
const regService = require("../DL/Register/registerDL");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const authConfig = await authService.authLogin(email, password);
    console.log(authConfig);
    
    if (authConfig.status === 200) {
      res.json({ message: "Login Success", authConfig });
    } else if (authConfig.status === 401) {
      res.json({ Message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Error Executing Login", error);
    res.status(500).json({ error: "Internal Server Error in auth controller" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const registerObj = req.body;
    const response = await regService.registerNewUser(registerObj);
    console.log(response);
    if (response.status === 201) {
      res.status(201).json({ message: "Registration Success" });
    } else if (response.status === 401) {
      res.status(409).json({ Message: "Registration Failed" });
    }
  } catch (error) {
    console.error("Error Executing Registration", error);
    res.status(500).json({ error: "Internal Server Error in auth controller" });
  }
});

router.get("/getalluser", async (req, res) => {
  try {
    const response = await regService.getAllUsers();

    if (response.status === 200) {
      res.status(200).json({ response});
    } else if (response.status === 401) {
      res.status(409).json({ Message: "" });
    }
  } catch (error) {
    console.error("", error);
    res.status(500).json({ error: "Internal Server Error in auth controller" });
  }
});


router.put("/assignAdmin", async (req, res) => {
  try {
    const { admin_id, user_id } = req.body; // Assuming admin_id and user_id are passed in the request body
    // Call the service that assigns admin to the user
    const response = await regService.assignAdminToUser(admin_id, user_id);

    if (response.status === 201) {
      res.status(201).json({ message: "Admin assigned successfully" });
    } else if (response.status === 404) {
      res.status(404).json({ message: "User not found or no changes made" });
    }else{
      res.status(405)
    }
  } catch (error) {
    console.error("Error in assignAdmin API:", error);
    res.status(500).json({ error: "Internal Server Error in assignAdmin API" });
  }
});

module.exports = router;
