const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
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

module.exports = {
    getAll,
    getSingle,

};