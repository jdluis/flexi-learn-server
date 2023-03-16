const { model, Schema } = require("mongoose");

const NoteSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 700,
    },
    status: {
      type: String,
      enum: ["done", "pendient", "process"],
      default: "pendient",
    },
    student: [
      {
        type: Schema.Types.ObjectId,
        ref: "Testimonial",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Note = model("Note", NoteSchema);

module.exports = Note;
