const { model, Schema } = require("mongoose");

const StudentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
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
