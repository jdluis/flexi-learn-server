const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/auth.middleware");
const User = require("../models/User.model");

//POST "/api/auth/signup" => Registrar usuario en DB
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const dataSigup = {
      email,
      password: hashPassword,
    };

    //Check empty inputs
    if (!email || !password) {
      res.json({ messageDeveloper: "Inputs should not be empty" });
      return;
    } else {
      await User.create(dataSigup);
    }

    //test
    res.json({ errorMessage: "Post of register Ok", data: dataSigup });
  } catch (err) {
    next(err);
    console.log(err);
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
        .json({ errorMessage: "No se encontro el usuario en la DB" });
      return;
    }

    //Password validation
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ errorMessage: "Contraseña incorrecta" });
      return;
    }

    //payload
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
    };

    //Token generator
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "2d",
    });

    //test
    res.status(200).json({ authToken: authToken });
  } catch (err) {
    next(err);
    console.log(err);
  }
});

//GET "/api/auth/verify" => User active or not?
router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(req.payload)
  res.status(200).json(req.payload);
});
module.exports = router;