const { getTasksDone, getTasksNotDone } = require('../utils/getDatabase');
const { setTask } = require('../utils/setDatabase');

addtask = async (req, res) => {
	const formData = req.body;
	await setTask(formData.description);

	const tasksToDo = await getTasksNotDone();
	const tasksDone = await getTasksDone();
	res.render('home', { tasksToDo: tasksToDo, tasksDone: tasksDone });
};

module.exports = {
	addtask,
};
