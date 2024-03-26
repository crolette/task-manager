const { getTasksNotDone } = require('../utils/getDatabase');
const { setDoneTask } = require('../utils/setDatabase');

taskslist = async (req, res) => {
	const tasksToDo = await getTasksNotDone();

	res.render('done', { tasksToDo: tasksToDo });
};

donetask = async (req, res) => {
	const formData = req.body;
	await setDoneTask(formData.id);

	res.render('submitted', {
		formData,
		message: `Task ${formData.id} marked as done`,
	});
};

module.exports = {
	taskslist,
	donetask,
};
