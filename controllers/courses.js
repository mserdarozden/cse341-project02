const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Courses']
    try {
        console.log('Getting all courses');
        const result = await mongodb.getDatabase().db().collection('courses').find();
        const courses = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(courses);
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).json({ message: 'Failed to fetch courses', error: err });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Courses']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid course id to find a contact.');
  }
    try {
        const courseId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('courses').find({ _id: courseId });
        const courses = await result.toArray();
        if (courses.length === 0) {
            res.status(404).json({ message: 'Course not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(courses[0]);
        }
    } catch (err) {
        console.error('Error fetching course:', err);
        res.status(500).json({ message: 'Failed to fetch course', error: err });
    }
};

const createCourse = async (req, res) => {
  //#swagger.tags = ['Courses']
  const course = {
    title: req.body.title,
    description: req.body.description,
    credits: req.body.credits,
    teacher_name: req.body.teacherName
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("courses")
    .insertOne(course);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the course."
      );
  }
};

const updateCourse = async (req, res) => {
    //#swagger.tags = ['Courses']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid contact id to find a contact.");
  }

  const courseId = new ObjectId(req.params.id);
  const course = {
    title: req.body.title,
    description: req.body.description,
    credits: req.body.credits,
    teacher_name: req.body.teacherName
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("courses")
    .replaceOne({ _id: courseId }, course);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the course."
      );
  }
};

const deleteCourse = async (req, res) => {
    //#swagger.tags = ['Courses']
  const courseId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("courses")
    .deleteOne({ _id: courseId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the course."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createCourse,
  updateCourse,
  deleteCourse
};
