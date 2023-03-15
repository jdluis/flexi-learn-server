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
      maxLength: 100
    },
    description: {
      type: String,
      required: false,
      maxLength:700
    },
    duration: {
      type: Number,
      required: true,
    },
    testimonials: [{
      type: Schema.Types.ObjectId,
      ref: "Testimonial",
    }]
  },
  {
    timestamps: true,
  }
);

const Lecture = model("Lecture", LectureSchema);

module.exports = Lecture;
