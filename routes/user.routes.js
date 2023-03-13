const router = require("express").Router();
const User = require("../models/User.model");
const Instructor = require("../models/Instructor.model");
const Student = require("../models/Student.model");

//GET "/api/user" => User active or not?
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await User.findById(id);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

//GET "/api/user/student" => User active or not?
router.get("/student/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Student.findById(id);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

//GET "/api/user/instructor"
router.get("/instructor/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Instructor.findById(id);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
