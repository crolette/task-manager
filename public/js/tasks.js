const {
	getTasks,
	getTasksDone,
	getTasksNotDone,
} = require('../utils/getDatabase');
const express = require('express');
// const router = express.Router();



homepage = async (req, res) => {
	const tasksToDo = await getTasksNotDone();
	const tasksDone = await getTasksDone();

	res.render('home', { tasksToDo: tasksToDo, tasksDone: tasksDone });
};

renderTasks = async (req, res) => {
	const allTasks = await getTasks();
	console.log(allTasks);

	res.render('alltasks', { allTasks: allTasks });
};

doneTasks = async (req, res) => {
	const tasksDone = await getTasksDone();
	console.log(tasksDone);
	res.render('donetasks', { tasksDone: tasksDone });
};

module.exports = {
	renderTasks,
	doneTasks,
	homepage,
};
