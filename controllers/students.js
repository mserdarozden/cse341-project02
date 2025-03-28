const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Students']
  try {
    console.log("Getting all students");
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("students")
      .find();
    const students = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Failed to fetch students", error: err });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Students']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid student id to find a contact.");
  }
  try {
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("students")
      .find({ _id: studentId });
    const students = await result.toArray();
    if (students.length === 0) {
      res.status(404).json({ message: "Student not found" });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(students[0]);
    }
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({ message: "Failed to fetch student", error: err });
  }
};

const createStudent = async (req, res) => {
  //#swagger.tags = ['Students']
  const student = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    birthdate: req.body.birthdate,
    address: req.body.address,
    phone_number: req.body.phoneNumber,
    enrollment_year: req.body.enrollmentYear,
    major: req.body.major,
    gpa: req.body.gpa,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("students")
    .insertOne(student);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the student."
      );
  }
};

const updateStudent = async (req, res) => {
    //#swagger.tags = ['Students']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid contact id to find a contact.");
  }

  const studentId = new ObjectId(req.params.id);
  const student = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    birthdate: req.body.birthdate,
    address: req.body.address,
    phone_number: req.body.phoneNumber,
    enrollment_year: req.body.enrollmentYear,
    major: req.body.major,
    gpa: req.body.gpa,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("students")
    .replaceOne({ _id: studentId }, student);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the student."
      );
  }
};

const deleteStudent = async (req, res) => {
    //#swagger.tags = ['Students']
  const studentId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("students")
    .deleteOne({ _id: studentId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the student."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent
};
