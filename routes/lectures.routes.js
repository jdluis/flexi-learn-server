const router = require("express").Router();
const Lectures = require("../models/Lecture.model");

//? In courses, because i need the params Id of course.
//GET "/api/lectures"
router.get("/", async (req, res, next) => {
  const { id } = req.params;
  try {
    //Select all lectures from the specific course
    const allLectures = await Lectures.find();
    //test
    res.json(allLectures);
  } catch (err) {
    next(err);
    console.log(err);
    res.json({ errorMessage: err });
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
    res.json(updateLecture);
  } catch (err) {
    next(err);
    console.log(err);
    res.json({ errorMessage: err });
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
    
    res.json(allLecturesOfCourse);
  } catch (err) {
    next(err);
    console.log(err);
    res.json({ errorMessage: err });
  }
});

//DELETE "/api/lectures/:idLecture/delete"
router.delete("/:idLecture/delete", async (req, res, next) => {
  const { idLecture } = req.params;
  try {
    await Lectures.findByIdAndDelete(idLecture);
    //test
    res.json({ succeesMessage: "Delete of lecture Ok" });
  } catch (err) {
    next(err);
    console.log(err);
    res.json({ errorMessage: err });
  }
});

module.exports = router;
