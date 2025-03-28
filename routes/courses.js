const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const coursesController = require('../controllers/courses');

router.get('/', coursesController.getAll);

router.get('/:id', coursesController.getSingle);

router.post('/', validation.saveCourse, coursesController.createCourse);

router.put('/:id', validation.saveCourse, coursesController.updateCourse);

router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
