const { model, Schema } = require("mongoose");

const InstructorSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
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
