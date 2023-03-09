const { model } = require("mongoose");

const TestimonialsSchema = new mongoose.Schema({
  message: {
    type: String,
    required: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //For assign to the specific user
  assignTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  //For assign to the specific course
  assignOn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: false,
  },
});

const Testimonial = model("Testimonial", TestimonialsSchema)
module.exports = Testimonial