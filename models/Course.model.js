const { model, Schema } = require("mongoose");

const CourseSchema = new Schema(
  {
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
      enum: ["programing", "healthy", "psychology", "marketing"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalDuration: {
      type: Number,
      required: false,
    },
    lectures: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    coverImg_url: {
      type: String,
      default:
        "https://uploads-ssl.webflow.com/63723fe799096ad12312edc2/63c6be2a0b0e6f6801c9fdfc_59.png",
    },
    rate: Number,
    level: {
      type: String,
      requiered: true,
      enum: ["beginner", "intermediate", "advanced", "expert", "all"]
    },
  },
  {
    timestamps: true,
  }
);

const Course = model("Course", CourseSchema);

module.exports = Course;
