const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/auth.middleware");
const User = require("../models/User.model");
const Instructor = require("../models/Instructor.model");
const Student = require("../models/Student.model");

//POST "/api/auth/signup" => Registrar usuario en DB
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, type } = req.body;
    if (type === undefined) {
      return res.status(400).json({errorMessage: "You should select a type"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const dataSigup = {
      email,
      password: hashPassword,
    };

    //Check empty inputs
    if (!email || !password) {
      res.status(400).json({ messageDeveloper: "Inputs should not be empty" });
      return;
    } else {
      const newUser = await User.create(dataSigup);

      // ! For now is a type hidden in the body, change depend of what
      // ! you click in the preview component. i can pass like a state

      if (type === "instructor") {
        await Instructor.create({
          user_id: newUser._id,
        });
      } else if (type === "student") {
        await Student.create({
          user_id: newUser._id,
        });
      } else {
        res.status(502).json({ errorMessage: "No relationship was found between the user and a student or instructor, please contact Flexi Learn support." });
      }
    }

    //test
    res.status(201).json({ succeesMessage: "Post of register Ok" });
  } catch (err) {
    next(err);
  }
});

//POST "/api/auth/login" => Validar credenciales de logeo
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //User validation
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res
        .status(400)
        .json({ errorMessage: "The user was not found in the DB" });
      return;
    }

    //Password validation
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ errorMessage: "Incorrect password" });
      return;
    }

    /*        // Payload //
    Search if there is an instructor or a student
    with the ID of the logged-in user and add it to the payload.
    */

    const isInstructor = await Instructor.findOne({ user_id: foundUser._id });
    const isStudent = await Student.findOne({ user_id: foundUser._id });

    let payload = {};
    isInstructor
      ? (payload = {
          _id: foundUser._id,
          email: foundUser.email,
          instructor: isInstructor._id,
        })
      : (payload = {
          _id: foundUser._id,
          email: foundUser.email,
          student: isStudent._id,
        });

    //Token generator
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "2d",
    });

    //test
    res.status(200).json({ authToken: authToken });
  } catch (err) {
    next(err);
  }
});

//GET "/api/auth/verify" => User active or not?
router.get("/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

module.exports = router;
