const router = require("express").Router();
const Courses = require("../models/Course.model.js");
const Lectures = require("../models/Course.model.js");

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
    await Courses.create({
      title,
      description,
      topic,
      price,
      instructor,
    });

    //test
    res.json({ succeesMessage: "POST add course Ok" });
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

    const response = await Courses.findByIdAndUpdate(id, {
      title,
      description,
      topic,
      price,
    }, {new: true});

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

module.exports = router;
