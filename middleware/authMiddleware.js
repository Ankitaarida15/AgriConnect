const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    console.log(req.headers);

    if (!authHeader) {
      return res.status(401).json({
        message: "Access Denied. No Token Provided."
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Authorization Header:", authHeader);
    console.log("Token:", token);
    console.log("JWT Secret:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {

    console.log("JWT Error:", error);

    return res.status(401).json({
      message: "Invalid Token"
    });

  }

};

module.exports = authMiddleware;