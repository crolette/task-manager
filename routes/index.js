const express = require('express');
const router = express.Router();
const tasksController = require('../public/controllers/tasks');
const { getTaskById } = require('../public/utils/getDatabase');
const formtaskController = require('../public/controllers/formtask');
const deletefromdb = require('../public/controllers/deletetask');
const markdonetask = require('../public/controllers/donetasks');

// Define routes

router.get('/', tasksController.homepage);

// router.get('/delete', deletefromdb.deletetaskslist);
// router.post('/delete', deletefromdb.deletetask);

router
	.route('/delete')
	.get(deletefromdb.deletetaskslist)
	.post(deletefromdb.deletetask);

router.route('/done').get(markdonetask.taskslist).post(markdonetask.donetask);

router.post('/submitted', formtaskController.formtask);

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
