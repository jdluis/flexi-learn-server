const router = require("express").Router();
const Lectures = require("../models/Lecture.model");
const Courses = require("../models/Course.model.js");

//? In courses, because i need the params Id of course.
//GET "/api/lectures"
router.get("/", async (req, res, next) => {
  const { id } = req.params;
  try {
    //Select all lectures from the specific course
    const allLectures = await Lectures.find();
    //test
    res.status(200).json(allLectures);
  } catch (err) {
    next(err);
  }
});

//PATCH "/api/lectures/:idLecture/edit"
router.patch("/:idLecture/edit", async (req, res, next) => {
  const { idLecture } = req.params;
  const { video_url, title, description, duration, testimonial } = req.body;
  try {
    const updateLecture = await Lectures.findByIdAndUpdate(
      idLecture,
      {
        video_url,
        title,
        description,
        duration,
        $push: { testimonials: testimonial },
      },
      { new: true }
    );
    //test
    res.status(201).json(updateLecture);
  } catch (err) {
    next(err);
  }
});

//GET "/api/lectures/course/:byIdLecture" => Search the Course of one lecture
router.get("/course/:byIdLecture", async (req, res, next) => {
  const { byIdLecture } = req.params;
  try {
    //test
    const courseByLecture = await Courses.findOne({ lectures: { $in: [byIdLecture] } }).populate("lectures")

    console.log(courseByLecture);

    res.status(200).json(courseByLecture);
  } catch (err) {
    next(err);
  }
});

//GET "/api/lectures/:idLecture"
router.get("/:idLecture", async (req, res, next) => {
  const { idLecture } = req.params;
  try {
    //test
    const allLecturesOfCourse = await Lectures.findById(idLecture).populate({
      path: "testimonials",
      populate: { path: "author" },
    });

    res.status(200).json(allLecturesOfCourse);
  } catch (err) {
    next(err);
  }
});

//DELETE "/api/lectures/:idLecture/delete"
router.delete("/:idLecture/delete", async (req, res, next) => {
  const { idLecture } = req.params;
  try {
    const lectureDeleted = await Lectures.findByIdAndDelete(idLecture);
    //test
    res.status(200).json({
      succeesMessage: "Delete of lecture Ok",
      lecture: lectureDeleted,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
