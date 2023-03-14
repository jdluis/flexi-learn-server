// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const Courses = require("../models/Course.model");
const User = require("../models/User.model");
const Instructor = require("../models/Instructor.model");
const Student = require("../models/Student.model");


const courseSeed = require("./courses.seed.json");
const usersSeed = require("./users.seed.json");
const instructorSeed = require("./instructor.seed.json");
const studentSeed = require("./student.seed.json");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/flexi-learn-server";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

mongoose.connection
  .dropDatabase()
  .then(() => {
    console.log(`Database dropped successfully`);
    console.log(`Seeding users`);
    // Carga las semillas después de eliminar la base de datos
    return User.create(usersSeed);
  })
  .then(() => {
    console.log(`Seeding instructor`);
    // Carga las semillas después de eliminar la base de datos
    return Instructor.create(instructorSeed);
  })
  .then(() => {
    console.log(`Seeding Students`);
    // Carga las semillas después de eliminar la base de datos
    return Student.create(studentSeed);
  })
  .then(() => {
    console.log(`Seeding courses`);
    // Carga las semillas después de eliminar la base de datos
    return Courses.create(courseSeed);
  })
  .then(() => {
    console.log("Se añadieron las semillas a la base de datos");

    // Cerrar la conexión a MongoDB
    return mongoose.connection.close();
  })
    .then(() => {
    console.log("Conexión a MongoDB cerrada");
  })
  .catch((error) => {
    console.error("Error al vaciar la base de datos:", error);
  });
