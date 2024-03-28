const express = require('express');
const router = express.Router();
const tasksController = require('../public/controllers/tasks');
const { getTaskById } = require('../public/utils/getDatabase');
const formtaskController = require('../public/controllers/formtask');
const deletefromdb = require('../public/controllers/deletetask');
const markdonetask = require('../public/controllers/donetasks');
const loginController = require('../public/controllers/login');

// Define routes

router
	.route('/')
	.get(loginController.loginUser)
	.post(loginController.loginCheck);	

router.route('/logout')
	.get(loginController.logOut)

router.route('/signup')
	.get(loginController.signUpForm)
	.post(loginController.signUp)

router
	.route('/home')
	.get(tasksController.homepage)
	.post(formtaskController.addtask);


router
	.route('/delete')
	.get(deletefromdb.deletetaskslist)
	.post(deletefromdb.deletetask);

router.route('/done').get(markdonetask.taskslist).post(markdonetask.donetask);

router.get('/alltasks', tasksController.renderTasks);

router.get('/donetasks', tasksController.doneTasks);

router.get('/tasks/:taskId', async (req, res) => {
	console.log(req.params);
	if (!req?.params?.taskId) {
		return res.status(400).json({ message: 'id is required' });
	} else if (!parseInt(req.params.taskId)) {
		return res.status(400).json({ message: 'id must be an integer' });
	}
	const id = parseInt(req.params.taskId);
	const task = await getTaskById(id);

	res.status(200).send(task);
});

module.exports = router;
