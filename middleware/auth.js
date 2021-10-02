//For authorization of particular user

require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send("Invalid Token");
  }
};

