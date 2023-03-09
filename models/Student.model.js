const { model } = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    interested_topics: {
      enum: ["healthy", "porgramming"],
    },
  },
  {
    timestamps: true,
  }
);

const Student = model("Student", StudentSchema);

module.exports = Student;
