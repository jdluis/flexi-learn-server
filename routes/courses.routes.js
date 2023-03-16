const router = require("express").Router();
const Courses = require("../models/Course.model.js");
const Lectures = require("../models/Lecture.model.js");
const Instructor = require("../models/Instructor.model");
const isAuthenticated = require("../middlewares/auth.middleware");

//GET "/api/courses"
router.get("/", async (req, res, next) => {
  try {
    const response = await Courses.find().populate("instructor");

    //test
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

//GET "/api/courses"
router.get("/my-courses", isAuthenticated, async (req, res, next) => {
  try {
    const { instructor } = req.payload;

    const response = await Courses.find({ instructor: instructor }).populate(
      "instructor"
    );
    //test
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

//GET "/api/courses/:id"
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Courses.findById(id).populate("lectures instructor");
    //test
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

//POST "/api/courses/add"
router.post("/add", isAuthenticated, async (req, res, next) => {
  if (req.payload === null) {
    res
      .status(500)
      .json({ errorMessage: "You can't create the course without user" });
  }

  try {
    // ! The lectures will be relationed after in the lectures routes
    const {
      title,
      topic,
      level,
      description,
      price,
      totalDuration,
      coverImg_url,
    } = req.body;

    if (!title || !topic || !level || !price || !coverImg_url) {
      return res
        .status(400)
        .json({ messageDeveloper: "Inputs should not be empty" });
    }

    const course = await Courses.create({
      title,
      topic,
      level,
      description,
      price,
      totalDuration,
      coverImg_url,
      instructor: req.payload.instructor,
    });

    //test
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
});

//PATCH "/api/courses/:id/edit"

router.patch("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    //Ahora quedan vacios, cuando este el front, el default
    // value sera el que ya estaba
    const {
      title,
      topic,
      level,
      description,
      price,
      totalDuration,
      coverImg_url,
    } = req.body;

    const response = await Courses.findByIdAndUpdate(
      id,
      {
        title,
        topic,
        level,
        description,
        price,
        totalDuration,
        coverImg_url,
      },
      { new: true }
    );

    //test
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

//DELETE "/api/courses/:id/delete"
router.delete("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Courses.findByIdAndDelete(id);
    //test
    res.status(200).json({ succeesMessage: "Delete of course Ok" });
  } catch (err) {
    next(err);
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
    res.status(200).json(allLecturesOfCourse);
  } catch (err) {
    next(err);
  }
});

//POST "/api/courses/:id/lectures/add"
router.post("/:id/lectures/add", async (req, res, next) => {
  const { id } = req.params;
  try {
    const { video_url, title, description, duration } = req.body;

    if (!video_url || !title || !duration) {
      return res.status(400).json("Inputs should not be empty");
    }

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
    res.status(201).json({
      succeesMessage: "POST add lecture Ok",
      lecture: response,
      course: actualCourse,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
