const router = require("express").Router();
const Testimonial = require("../models/Testimonial.model");

//GET "/api/testimonial/" => All testimonial
router.get("/", async (req, res, next) => {
  try {
    const response = await Testimonial.find().populate("author");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//GET "/api/testimonial/:id" => All testimonial of one User
router.get("/:idUser", async (req, res, next) => {
  try {
    const {idUser} = req.params;
    const response = await Testimonial.find({author: idUser}).populate("author");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Post "/api/testimonial/add/" => Add Testimonial
router.post("/add", async (req, res, next) => {
  try {
    const { message, author } = req.body;
    const response = await Testimonial.create({
      message,
      author
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

//Delete "/api/testimonial/delete/:id" => Delete by id
router.delete("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Testimonial.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});






module.exports = router;
