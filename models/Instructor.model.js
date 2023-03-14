const { model, Schema } = require("mongoose");

const InstructorSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rate: Number,
    courses_sold: Number,
    testimonials: [
      {
        type: Schema.Types.ObjectId,
        ref: "Testimonial",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Instructor = model("Instructor", InstructorSchema);

module.exports = Instructor;
