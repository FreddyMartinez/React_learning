const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // get token from request header
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: "No token, unauthorized request" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Invalid token" });
  }
};
