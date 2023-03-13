const { model, Schema } = require("mongoose");

const LectureSchema = new Schema(
  {
    video_url: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lecture = model("Lecture", LectureSchema);

module.exports = Lecture;
