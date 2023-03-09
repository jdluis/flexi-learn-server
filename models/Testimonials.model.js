const { model, Schema } = require("mongoose");

const TestimonialsSchema = new Schema({
  message: {
    type: String,
    required: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //For assign to the specific user
  assignTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  //For assign to the specific course
  assignOn: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: false,
  },
});

const Testimonial = model("Testimonial", TestimonialsSchema)
module.exports = Testimonial