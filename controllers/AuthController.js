const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register User
const register = async (req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      status: 0,
      message: "Email is required.",
    });
  } else if (!req.body.password) {
    res.status(400).send({
      status: 0,
      message: "Password is required.",
    });
  } else {
    const user = await User.find({ email: req.body.email });
    if (user.length >= 1) {
      res.status(400).send({
        status: 0,
        message: "Email already exists!",
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          res.status(400).send({
            status: 0,
            message: err + " password is incorrect!",
          });
        } else {
          const newuser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
          });
          const token = jwt.sign(
            {
              email: newuser.email,
              userId: newuser._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "20hr",
            }
          );
          User.findOneAndUpdate({ user_authentication: token }).exec();
          //  console.log(user[0].user_authentication);
          newuser.user_authentication = token;
          // user.save()
          await newuser
            .save()

            .then(async (result) => {
              //   console.log(result);

              return res.status(200).send({
                status: 1,
                message: "User verification code successfully sent to email.",
                data: {
                  user_id: result._id,
                  email: result.email,
                  userName: result.userName,
                },
              });
            })
            .catch((errr) => {
              res.status(400).send({
                status: 0,
                message: errr,
              });
            });
        }
      });
    }
  }
};

//Login
const login = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      status: 0,
      message: "Email field is required.",
    });
  } else if (!req.body.password) {
    return res.status(400).send({
      status: 0,
      message: "Password field is required.",
    });
  } else {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        status: 0,
        message: "Email not found!",
      });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(400).send({
            status: 0,
            message: "Auth Failed",
          });
        } else if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "20hr",
            }
          );
          User.findOneAndUpdate(
            {
              user_authentication: token,
            },
            { new: true }
          ).exec();
          return res.status(200).send({
            status: 1,
            message: "User logged in successfully!",
            token: token,
            data: {
              userId: user._id,
              email: user.email,
              userName: user.userName,
            },
          });
        }
        return res.status(400).send({
          status: 0,
          message: "Incorrect password.",
        });
      });
    }
  }
};

module.exports = {
  register,
  login,
};
