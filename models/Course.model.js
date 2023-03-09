const { model, Schema } = require("mongoose");

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    enum: ["Programing", "Healthy", "Soft Skills"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  lectures: {
    type: Array,
    //de id de lectures
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rate: Number,
});

const Course = model("Course", CourseSchema);

module.exports = Course;
