const {
	getTasks,
	getTasksDone,
	getTasksNotDone,
} = require('../utils/getDatabase');
const { getUser } = require('../utils/getUsers');

homepage = async (req, res) => {
	if (res.locals.user == null) {
		res.redirect('/');
	} else {
		const user = await getUser(res.locals.user);

		const tasksToDo = await getTasksNotDone(user.id);

		const tasksDone = await getTasksDone(user.id);
		res.render('home', { tasksToDo: tasksToDo, tasksDone: tasksDone });
	}
};

renderTasks = async (req, res) => {
	const user = await getUser(res.locals.user);
	const allTasks = await getTasks(user.id);

	res.render('alltasks', { allTasks: allTasks, jsFile: 'test2.js' });
};

doneTasks = async (req, res) => {
	const user = await getUser(res.locals.user);
	const tasksDone = await getTasksDone(user.id);
	console.log(tasksDone);
	res.render('donetasks', { tasksDone: tasksDone });
};

module.exports = {
	renderTasks,
	doneTasks,
	homepage,
};
