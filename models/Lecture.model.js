const { model, Schema } = require("mongoose");

const LectureSchema = new Schema({
    video_url: {
      type: String,
      required: true,
      unique: true,
    },
   title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  });

const Lecture = model("Lecture", LectureSchema);

module.exports = Lecture;
