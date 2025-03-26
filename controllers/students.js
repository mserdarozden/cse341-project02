const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        console.log('Getting all students');
        const result = await mongodb.getDatabase().db().collection('students').find();
        const students = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ message: 'Failed to fetch students', error: err });
    }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid student id to find a contact.');
  }
    try {
        const studentId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('students').find({ _id: studentId });
        const students = await result.toArray();
        if (students.length === 0) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(students[0]);
        }
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).json({ message: 'Failed to fetch student', error: err });
    }
};

module.exports = {
    getAll,
    getSingle,

};