const { model } = require("mongoose");

const InstructorSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rate: Number,
  },
  {
    timestamps: true,
  }
);

const Instructor = model("Instructor", InstructorSchema);

module.exports = Instructor;
