const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { startScript } = require("../../config/db");

async function httpRegisterUser(req, res) {
  try {
    // Get the existing database connection from startScript
    const connection = await startScript();

    // Validate request body
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ error: validationResult(req).array() });
    }

    // Check if user with the same name or email exists
    const [existingUser] = await connection.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [req.body.name, req.body.email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User exists already!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Insert new user into the database
    const [result] = await connection.query(
      "INSERT INTO users (username, phone, email, password, image, role) VALUES (?, ?, ?, ?, ?, ?)",
      [
        req.body.username,
        req.body.gsm,
        req.body.email,
        hashedPassword,
        req.body.img,
        "user",
      ]
    );
    const newUserId = result.insertId;

    // Send verification email and update verification code
    // sendVerificationEmail(newUserId);

    // Generate and attach token to user
    const token = generateToken(newUserId, "user");

    // Respond with success message and token
    res.status(201).json({ message: "User registered successfully", token });

    // Close the connection
    await connection.end();
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function httpLoginUser(req, res) {
  try {
    // Check if email and password are provided in the request body
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    // Start script to get database connection
    const connection = await startScript();

    // Execute the query to fetch user by email
    const [rows, fields] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    // Check if user exists
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    // User found, compare passwords
    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(404).json({ message: "Wrong email or password!" });
    }

    // If the password is valid, return the user object with a token
    const token = generateToken(user, user.role);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error in httpLoginUser:", error);
    res.status(500).json({ error: error.message });
  }
}

async function httpGetAllUsers(req, res) {
  try {
    const db = await startScript();

    // Execute SQL query to retrieve all users
    const [users] = await db.query("SELECT * FROM users");

    // Close the database connection
    await db.end();

    // Respond with the retrieved users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function httpGetUser(req, res) {
  try {
    const db = await startScript();

    // Extract the user ID from the request parameters
    const userId = req.params.param;
    // Execute SQL query to retrieve the user with the specified ID
    const [users] = await db.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);

    // Close the database connection
    await db.end();

    // Check if a user with the specified ID was found
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the retrieved user
    res.status(200).json(users[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function httpUpdateOneUser(req, res) {
  try {
    const db = await startScript();

    // Extract user ID from request parameters
    const userId = req.params.param;

    // Extract updated user data from request body
    const { name, email, phone } = req.body;

    // Construct SQL query for updating user information
    let updateFields = [];
    let queryParams = [];

    if (name) {
      updateFields.push("name = ?");
      queryParams.push(name);
    }

    if (email) {
      updateFields.push("email = ?");
      queryParams.push(email);
    }

    if (phone) {
      updateFields.push("phone = ?");
      queryParams.push(phone);
    }

    // Check if any fields are provided for update
    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    // Construct the full SQL update query
    const updateQuery = `UPDATE users SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;
    queryParams.push(userId);

    // Execute SQL query to update user information
    const result = await db.query(updateQuery, queryParams);

    // Close database connection
    await db.end();

    // Check if user was successfully updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success response
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function httpDeleteOneUser(req, res) {
  try {
    const db = await startScript();

    // Extract user ID from request parameters
    const userId = req.params.id;
    console.log(userId);

    // Execute SQL query to delete the user
    const result = await db.query("DELETE FROM users WHERE id = ?", [userId]);

    // Close database connection
    await db.end();

    // Check if user was successfully deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success response
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function httpChangePassword(req, res) {
  try {
    const db = await startScript();

    // Extract user ID and new password from request parameters
    const { userId, newPassword } = req.body;
    console.log(req.body);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Execute SQL query to update user's password
    const result = await db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, userId]
    );

    // Close database connection
    await db.end();

    // Check if user was found and password was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success response
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

function generateToken(userId, role) {
  // Define your secret key for signing the token
  const secretKey = process.env.JWT_SECRET; // Change this to your actual secret key

  // Define payload for the token (you can add more data if needed)
  const payload = {
    userId: userId,
    role: role,
  };

  // Define options for the token
  const options = {
    expiresIn: "1d", // Token expiration time (e.g., 1 day)
  };

  // Generate and return the token
  return jwt.sign(payload, secretKey, options);
}

module.exports = {
  httpRegisterUser,
  httpLoginUser,
  httpGetAllUsers,
  httpGetUser,
  httpUpdateOneUser,
  httpDeleteOneUser,
  httpChangePassword,
};
