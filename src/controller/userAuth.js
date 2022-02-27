const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    let token;
    const user = await User.findOne({ email: req.body.email });
    !user &&
      res.status(404).json({ status: "Error", message: "User not found" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword &&
      res.status(400).json({ status: "Error", message: "Wrong Password" });

    if (req.body.saveInfo === true) {
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {});
    } else {
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    }

    res.status(200).json({
      status: "Success",
      data: {
        userId: user._id,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
};

module.exports = login;
