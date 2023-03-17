const router = require("express").Router();
const Payment = require("../models/Payment.model.js");
const isAuthenticated = require("../middlewares/auth.middleware");
const Student = require("../models/Student.model.js");

//GET "/student/cart/:studentId" => Get cartCourses
router.get("/cart/:studentId", async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const data = await Student.findById(studentId)
      .populate("cartCourses")
      .select("cartCourses");
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

//GET "/student/my-courses/:studentId" => Get purchasedCourses
router.get("/my-courses/:studentId", async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const data = await Student.findById(studentId)
      .populate("purchasedCourses")
      .select("purchasedCourses");
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

//PATCH "/student/cart/add" => Add to cartCourses
router.patch("/cart/add", async (req, res, next) => {
  const { studentId, productId } = req.body;

  //SI existe en cart eliminar
  try {
    const productsInCart = await Student.findById(studentId).select(
      "cartCourses"
    );
    if (productsInCart.cartCourses.includes(productId)) {
      res
        .status(400)
        .json({ errorMessage: "You have already added this course." });
    }

    const data = await Student.findByIdAndUpdate(studentId, {
      $addToSet: { cartCourses: productId },
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

//PATCH "/student/my-courses/add" => Add to purchasedCourses
router.patch("/my-courses/add", async (req, res, next) => {
  const { studentId, productId } = req.body;
  try {
    const productsInMycourses = await Student.findById(studentId).select(
      "purchasedCourses"
    );
    if (productsInMycourses.purchasedCourses.includes(productId)) {
      res
        .status(400)
        .json({ errorMessage: "You have already buy this course." });
    }
    const data = await Student.findByIdAndUpdate(
      studentId,
      {
        $push: { purchasedCourses: productId._id },
      },
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

//patch "/student/cart/remove" => remove  Course from cart
router.patch("/cart/remove", async (req, res, next) => {
  const { studentId, productId } = req.body;

  //SI existe en cart eliminar
  try {
    const data = await Student.findByIdAndUpdate(
      { _id: studentId },
      { $pull: { purchasedCourses: { _id: productId } } }
    );

    console.log(data);
    res.status(200).json({ messageDeveloper: "Course buy correctly" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
