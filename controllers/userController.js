const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const user = await User.findOne(req.user._id);
    if (!user) {
      return res.status(400).send({
        status: 0,
        message: "user not found",
      });
    } else {
      return res.status(200).send({
        status: 1,
        message: "User Detail",
        data: {
          userName: user.userName,
          email: user.email,
        },
      });
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const updateuser = {
      userName: req.body.userName,
      email: req.body.email,
    };
    const edituser = await User.findOneAndUpdate(
      { _id: req.user._id },
      updateuser,
      { new: true }
    );
    if (!edituser) {
      return res.status(400).send({
        status: 0,
        message: "user not found",
      });
    } else {
      return res.status(200).send({
        status: 1,
        message: "User Updated",
        data: {
          userName: edituser.userName,
          email: edituser.email,
        },
      });
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const deleteUser = async (req, res) => {
    try {
      const userdelete = await User.findOneAndDelete({ _id: req.user._id });
      if (!userdelete) {
        return res.status(400).send({
          status: 0,
          message: "user not found",
        });
      } else {
        return res.status(200).send({
          status: 1,
          message: "User Deleted",
        });
      }
    } catch (error) {
      return res.status(404).send(error.message);
    }
  };

module.exports = {
  getUser,
  updateUser,
  deleteUser
};
