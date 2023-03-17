const router = require("express").Router();
const User = require("../models/User.model");
const Instructor = require("../models/Instructor.model");
const Student = require("../models/Student.model");

//GET "/api/user"
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await User.findById(id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//PATCH "/api/user/:id/edit"
router.patch("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name, description, profileImg_url } =
      req.body;
    const response = await User.findByIdAndUpdate(id, {
      email,
      first_name,
      last_name,
      description,
      profileImg_url,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

//GET "/api/user/student"
router.get("/student/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Student.findById(id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//PATCH "/api/user/student/:id/edit"=>Not working yet
router.patch("/student/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { interested_topics, cart, purchasedCourses } = req.body;
    const response = await Student.findByIdAndUpdate(id, {
      interested_topics,
      cart,
      purchasedCourses,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

//GET "/api/user/instructor"
router.get("/instructor/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Instructor.findById(id).populate("user_id");
    res.status(200).json(response);
  } catch (error) {
    next(error);
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
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});


router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    //Debo eliminar toda la relacion de usuarios, 
    //menos los cursos y comentarios

    await User.findByIdAndDelete(id);
    //Dependiendo de si era instructor o student buscar y eliminar
   /*  await Instructor.findByIdAndDelete(id);
    await Student.findByIdAndDelete(id); */

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
