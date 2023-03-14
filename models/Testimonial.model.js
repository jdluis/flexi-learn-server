const { model, Schema } = require("mongoose");

const TestimonialSchema = new Schema(
  {
    message: {
      type: String,
      required: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Testimonial = model("Testimonial", TestimonialSchema);
module.exports = Testimonial;
