const router = require("express").Router();
const Student = require("../models/Student.model.js");

const isAuthenticated = require("../middlewares/auth.middleware");
const Note = require("../models/Note.model.js");

//GET "/api/notes"
router.get("/", isAuthenticated, async (req, res, next) => {
  const { student } = req.payload;
  try {
    const response = await Note.find({ student: student }).populate("student");
    //test
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

//POST "/api/notes/add"
router.post("/add", isAuthenticated, async (req, res, next) => {
  try {
    const { text, status } = req.body;
    const { student } = req.payload;

    if (!text) {
      res.status(400).json({ errorMessage: "You need to write a note" });
    }

    const noteData = await Note.create({
      text,
      student: student,
      status: status,
    });

    //test
    res.status(201).json(noteData);
  } catch (err) {
    next(err);
  }
});

//PATCH "/api/notes/:id/edit"

router.patch("/:id/edit", async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const response = await Note.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );

    //test
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

//DELETE "/api/courses/:id/delete"
router.delete("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    const noteDeleted = await Note.findByIdAndDelete(id);
    //test
    res
      .status(200)
      .json({
        succeesMessage: "Delete of note Ok",
        textOfData: noteDeleted.text,
      });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
