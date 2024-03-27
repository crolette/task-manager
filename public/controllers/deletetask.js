const { getTasksNotDone, getTaskById } = require('../utils/getDatabase');
const { deleteTask } = require('../utils/setDatabase');

deletetaskslist = async (req, res) => {
	const tasksToDo = await getTasksNotDone();

	res.render('delete', { tasksToDo: tasksToDo });
};

deletetask = async (req, res) => {
	const formData = req.body;
	const task = await getTaskById(formData.id);
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
