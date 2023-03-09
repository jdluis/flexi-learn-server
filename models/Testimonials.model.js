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
  //For assign to the specific user/course
  assignTo: {
    type: Schema.Types.ObjectId,
    refPath: 'receiverModel',
    required: false,
  },
});

const Testimonial = model("Testimonial", TestimonialsSchema)
module.exports = Testimonial