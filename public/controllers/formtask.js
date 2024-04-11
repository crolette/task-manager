const { getTasksDone, getTasksNotDone } = require('../utils/getDatabase');
const { getUser } = require('../utils/getUsers');
const { setTask } = require('../utils/setDatabase');

addtask = async (req, res) => {
	console.log('addTask');
	const formData = req.body;
	const user = await getUser(res.locals.user);
	console.log(user)
	
	await setTask(formData.description, user.id);

	const tasksToDo = await getTasksNotDone(user.id);
	const tasksDone = await getTasksDone(user.id);
	res.render('home', { tasksToDo: tasksToDo, tasksDone: tasksDone });
};

module.exports = {
	addtask,
};

