const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  // Extract the JWT token from the Authorization header
  const token = req.headers.authorization;
  console.log(token)

  if (!token) {
    // Token is missing, return unauthorized status
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract the user ID from the decoded token payload
    req.userId = decoded.userId;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid, return unauthorized status
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

function verifyAdmin(req, res, next) {
  // Extract the JWT token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // Token is missing, return unauthorized status
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1]; // Split the header to get token part

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user has the role of "admin"
    if (decoded.role !== "admin") {
      // User does not have the admin role, return unauthorized status
      return res
        .status(401)
        .json({ message: "Unauthorized: User is not an admin" });
    }

    // Extract the user ID from the decoded token payload
    req.userId = decoded.userId;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid, return unauthorized status
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}


module.exports = { verifyToken, verifyAdmin };
