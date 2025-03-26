const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');

router.get('/', studentsController.getAll);

router.get('/:id', studentsController.getSingle);

module.exports = router;
