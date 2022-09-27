const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  // console.log('Token',verifyToken);

  if (!req.headers["authorization"]) {
    return res.status(400).send({ status: 0, message: "Unauthorized" });
  }

  try {
    // Get token from header
    const token = req.headers["authorization"].split(" ")[1];

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // console.log("token ** ", decoded);

    //Get user from the token
    req.userId = decoded.userId;
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    // console.log(error)
    return res.status(401).send({ status: 0, message: "unathorized error" });
  }
};

module.exports = { verifyToken };
