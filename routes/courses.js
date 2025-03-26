const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');

router.get('/', coursesController.getAll);

router.get('/:id', coursesController.getSingle);

module.exports = router;
