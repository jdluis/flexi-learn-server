const { model, Schema } = require("mongoose");

const StudentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    interested_topics: [
      {
        type: String,
        enum: ["programing", "healthy", "psychology", "marketing"],
      },
    ],
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    purchasedCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
        unique: true,
      },
    ],
    cartCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

StudentSchema.index({ "purchasedCourses": 1 }, { unique: true });

const Student = model("Student", StudentSchema);

module.exports = Student;
