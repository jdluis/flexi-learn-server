const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/auth.middleware");
const User = require("../models/User.model");
const Instructor = require("../models/Instructor.model");
const Student = require("../models/Student.model");
const { validatePassword, validateEmail } = require("../utils/validations");

//POST "/api/auth/signup" => Registrar usuario en DB
router.post("/signup", async (req, res, next) => {
  let newUser = null; //Declarar newUser fuera del bloque try para que pueda accederse desde el bloque catch
  try {
    const { email, password, type } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const dataSigup = {
      email,
      password: hashPassword,
    };

    const users = await User.find({ email: email });

    /* VALIDATIONS */
    //Check empty inputs
    if (type === null) {
      return res
        .status(400)
        .json({ messageDeveloper: "You should select a type" });
    }

    if (!email || !password) {
      return res
        .status(400)
        .json({ messageDeveloper: "Inputs should not be empty" });
    }
    //User already exist
    if (users.length > 0) {
      return res
        .status(400)
        .json({ messageDeveloper: "The email exists already, please choose another one" });
    }
    //Password
    if (validatePassword(password) === false) {
      return res.status(400).json({
        messageDeveloper: `The password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number.`,
      });
    }
    //Email
    if (validateEmail(email) === false) {
      return res.status(400).json({
        messageDeveloper: `Please enter a valid email address.`,
      });
    }

   

    if (type === "instructor") {
       newUser = await User.create(dataSigup);
      const instructorCreated = await Instructor.create({
        user_id: newUser._id,
      });

      // Verificar si el instructor no se ha creado correctamente
      if (!instructorCreated) {
        await User.findByIdAndDelete(newUser._id);
        return res.status(500).json({
          errorMessage: "Error creating instructor, please try again later.",
        });
      }
    } else if (type === "student") {
       newUser = await User.create(dataSigup);
      const studentCreated = await Student.create({
        user_id: newUser._id,
      });

      // Verificar si el estudiante no se ha creado correctamente
      if (!studentCreated) {
        await User.findByIdAndDelete(newUser._id);
        return res.status(500).json({
          errorMessage: "Error creating student, please try again later.",
        });
      }
    } else {
      await User.findByIdAndDelete(newUser._id);
      return res.status(400).json({
        errorMessage:
          "No relationship was found between the user and a student or instructor, please contact Flexi Learn support.",
      });
    }

    // Enviar una respuesta al cliente con un mensaje de éxito y un código de estado HTTP 201
    res.status(201).json({ succeesMessage: "Registration successful" });

  } catch (err) {
    // Si se ha creado el usuario, borrarlo
    if (newUser !== null) {
      await User.findByIdAndDelete(newUser._id);
    }

    // Enviar una respuesta al cliente con el mensaje de error y un código de estado HTTP 500
    res.status(500).json({
      errorMessage: "An error occurred while registering the user, please try again later.",
      errorDetails: err.message // opcional: información detallada del error
    });
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
        .json({ errorMessage: "The email was not found in the DB" });
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
          name: foundUser.first_name,
          instructor: isInstructor._id,
        })
      : (payload = {
          _id: foundUser._id,
          email: foundUser.email,
          name: foundUser.first_name,
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
