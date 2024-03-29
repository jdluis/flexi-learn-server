const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.status(200).json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const coursesRoutes = require("./courses.routes")
router.use("/courses", coursesRoutes)

const lecturesRoutes = require("./lectures.routes")
router.use("/lectures", lecturesRoutes)

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

const testimonialRoutes = require("./testimonial.routes")
router.use("/testimonial", testimonialRoutes)

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

const paymentRoutes = require("./payment.routes")
router.use("/payment", paymentRoutes)

const notesRoutes = require("./notes.routes")
router.use("/notes", notesRoutes)

const studentRoutes = require("./student.routes")
router.use("/student", studentRoutes)

module.exports = router;