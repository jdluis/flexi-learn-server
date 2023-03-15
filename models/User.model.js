const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: false,
      maxLength: 100
    },
    last_name: {
      type: String,
      required: false,
      maxLength: 100
    },
    description: {
      type: String,
      required: false,
      maxLength: 700
    },
    profileImg_url: {
      type: String,
      default: "https://www.computerhope.com/jargon/g/guest-user.png",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);

module.exports = User;
