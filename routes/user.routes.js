const router = require("express").Router();
const User = require("../models/User.model");
const Instructor = require("../models/Instructor.model");
const Student = require("../models/Student.model");

//GET "/api/user"
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await User.findById(id);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

//GET "/api/user/student"
router.get("/student/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Student.findById(id);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

//PATCH "/api/user/student/:id/edit"
router.patch("/student/:id/edt", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { interested_topics, cart, purchasedCourses } = req.body;
    const response = await Student.findByIdAndUpdate(id, {
      interested_topics,
      cart,
      purchasedCourses,
    });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

//GET "/api/user/instructor"
router.get("/instructor/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Instructor.findById(id).populate("user_id")
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

//PATCH "/api/user/instructor/:id/edit"
router.patch("/instructor/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { courses_sold } = req.body;
    const response = await Instructor.findByIdAndUpdate(id, {
      courses_sold,
    });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
