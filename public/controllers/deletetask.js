const { getTasksNotDone, getTaskById } = require('../utils/getDatabase');
const { getUser } = require('../utils/getUsers');
const { deleteTask } = require('../utils/setDatabase');

deletetaskslist = async (req, res) => {
	const user = await getUser(res.locals.user);
	const tasksToDo = await getTasksNotDone(user.id);

	res.render('delete', { tasksToDo: tasksToDo });
};

deletetask = async (req, res) => {
	const formData = req.body;
	const user = await getUser(res.locals.user);
	const task = await getTaskById(formData.id, user.id);
	await deleteTask(formData.id);

	res.render('submitted', {
		task,
		message: `Task ${formData.id} deleted`,
	});
};

module.exports = {
	deletetaskslist,
	deletetask,
};
