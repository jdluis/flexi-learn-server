const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const coursesRoutes = require("./courses.routes")
router.use("/courses", coursesRoutes)

const lecturesRoutes = require("./lectures.routes")
router.use("/lectures", lecturesRoutes)

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

module.exports = router;