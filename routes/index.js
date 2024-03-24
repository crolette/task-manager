const express = require('express');
const router = express.Router();
const tasksController = require('../public/js/tasks');

// Define routes

router.get('/', tasksController.homepage);

router.get('/alltasks', tasksController.renderTasks);

router.get('/donetasks', tasksController.doneTasks);

module.exports = router;
