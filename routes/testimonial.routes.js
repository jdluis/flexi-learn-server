const router = require("express").Router();
const Testimonial = require("../models/Testimonial.model");

//GET "/api/testimonial/:id" => All testimonial
router.get("/:idUser", async (req, res, next) => {
  try {
    const {idUser} = req.params;
    const response = await Testimonial.find({author:idUser}).populate("author");
    res.json(response);
  } catch (error) {
    res.json(error);
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
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

//Delete "/api/testimonial/delete/:id" => Delete by id
router.delete("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Testimonial.findByIdAndDelete(id);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});






module.exports = router;
