const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
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
