const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    console.log("User is creating");
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({
        status: "Error",
        message: "User Already Exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const createdUser = await User.create(req.body);
      const { name, email, image, _id } = createdUser;

      res.status(200).json({
        status: "Success",
        data: {
          id: _id,
          name,
          email,
          image,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
};

// const getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.body.id).select("-password");
//     res.status(200).json({status: "Success",data:user});
//   } catch (err) {
//     res.status(400).json({status: "Error",message: err.message,});
//   }
// };

module.exports = {
  createUser,
};
