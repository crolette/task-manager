const { getTasksNotDone, getTaskById } = require('../utils/getDatabase');
const { setDoneTask } = require('../utils/setDatabase');
const { getUser } = require('../utils/getUsers');

taskslist = async (req, res) => {
	const user = await getUser(res.locals.user);
	const tasksToDo = await getTasksNotDone(user.id);

	res.render('done', { tasksToDo: tasksToDo });
};

donetask = async (req, res) => {
	const formData = req.body;
	const user = await getUser(res.locals.user);
	await setDoneTask(formData.id);
	const task = await getTaskById(formData.id, user.id);

	res.render('submitted', {
		task,
		message: `Task ${formData.id} marked as done`,
	});
};

module.exports = {
	taskslist,
	donetask,
};
