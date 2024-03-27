const {
	getTasks,
	getTasksDone,
	getTasksNotDone,
} = require('../utils/getDatabase');

homepage = async (req, res) => {
	const tasksToDo = await getTasksNotDone();
	const tasksDone = await getTasksDone();
	res.render('home', { tasksToDo: tasksToDo, tasksDone: tasksDone });
};


renderTasks = async (req, res) => {
	const allTasks = await getTasks();

	res.render('alltasks', { allTasks: allTasks, jsFile: 'test2.js' });
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
