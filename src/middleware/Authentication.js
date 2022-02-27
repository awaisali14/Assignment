const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    let token;
    const { authorization } = req.headers;
    if (authorization) {
      token = authorization.split(" ")[1];

      console.log(token);
    }
    if (!token) {
      return res.status(404).json({
        status: "Error",
        message: "Token is not availabe",
      });
    }
    // token verfication
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.user = { id: decode.id };
    next();
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: "Authentication Failed",
    });
  }
};

module.exports = authenticate;
