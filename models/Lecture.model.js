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
    resources: { //Pendiente de implementar
      type: String,
      required: false,
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
