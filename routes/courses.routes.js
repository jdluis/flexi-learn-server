const router = require("express").Router();
const Courses = require("../models/Course.model.js");
const Lectures = require("../models/Lecture.model.js");
const Instructor = require("../models/Instructor.model");

//GET "/api/courses"
router.get("/", async (req, res, next) => {
  try {
    const response = await Courses.find().populate("instructor");
    //test
    res.json({ succeesMessage: "Get of courses Ok", data: response });
  } catch (err) {
    next(err);
    console.log(err);
  }
});

//GET "/api/courses/:id"
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Courses.findById(id);
    //test
    res.json({ succeesMessage: "Get of courses details Ok", data: response });
  } catch (err) {
    next(err);
    console.log(err);
  }
});

//POST "/api/courses/add"
router.post("/add", async (req, res, next) => {
  try {
    // ! The lectures will be relationed after in the lectures routes
    const { title, description, topic, price, instructor } = req.body;
    const course = await Courses.create({
      title,
      description,
      topic,
      price,
      instructor,
    });

    //test
    res.json({ succeesMessage: "POST add course Ok", data: course });
  } catch (err) {
    next(err);
    console.log(err);
  }
});

//PATCH "/api/courses/:id/edit"

router.patch("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    //Ahora quedan vacios, cuando este el front, el default
    // value sera el que ya estaba
    const { title, description, topic, price } = req.body;

    const response = await Courses.findByIdAndUpdate(
      id,
      {
        title,
        description,
        topic,
        price,
      },
      { new: true }
    );

    //test
    res.json({ succeesMessage: "Patch of course Ok", data: response });
  } catch (err) {
    next(err);
    console.log(err);
  }
});

//DELETE "/api/courses/:id"
router.delete("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Courses.findByIdAndDelete(id);
    //test
    res.json({ succeesMessage: "Delete of course Ok" });
  } catch (err) {
    next(err);
    console.log(err);
  }
});

//? LECTURES ROUTES
//! I use this routes here because i need the ID of course in params for now.

//GET "/api/courses/:id/lectures"
router.get("/:id/lectures/", async (req, res, next) => {
  const { id } = req.params;
  try {
    //Select all lectures from the specific course
    const allLecturesOfCourse = await Courses.findById(id)
      .select("lectures")
      .populate("lectures");
    //test
    res.json({
      succeesMessage: "Get of lectures Ok",
      data: allLecturesOfCourse,
    });
  } catch (err) {
    next(err);
    console.log(err);
    res.json({ errorMessage: err });
  }
});


//POST "/api/courses/:id/lectures/add"
router.post("/:id/lectures/add", async (req, res, next) => {
  const { id } = req.params;
  try {
    const { video_url, title, description, duration } = req.body;
    const response = await Lectures.create({
      video_url,
      title,
      description,
      duration,
    });

    const actualCourse = await Courses.findByIdAndUpdate(
      id,
      {
        $push: { lectures: response._id },
      },
      { new: true }
    );

    //test
    res.json({
      succeesMessage: "POST add lecture Ok",
      lecture: response,
      course: actualCourse,
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
});

module.exports = router;
