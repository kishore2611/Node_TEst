const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    userName: {
      type: String,
      maxLength: 30,
      minLength: 3,
      default: null,
    },
    email: {
      type: String,
      unique: true,
      match: [
        /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
    },
    is_verified: {
      type: Number,
      default: 0,
    },
    is_blocked: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: "user",
    },
    user_authentication: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
