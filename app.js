const express = require('express');

const { getTasks, getTaskById, getTasksDone } = require('./getDatabase');
const { setTask, deleteTask, setDoneTask } = require('./setDatabase');

const app = express();
const PORT = 3300;

app.use(express.json());

console.log(__dirname);

app.listen(PORT, () => {
	console.log(`Express running on localhost:${PORT}`);
});

app.get('/', (req, res) => {
	res.send('Hello Hamilton 9');
});

app.get('/alltasks', async (req, res) => {
	try {
		const allTasks = await getTasks();
		res.send(allTasks);
	} catch (err) {
		console.error(err);
		res.json({ status: 'error in /students' });
	}
});

app.get('/donetasks', async (req, res) => {
	try {
		const allTasks = await getTasksDone();
		res.send(allTasks);
	} catch (err) {
		console.error(err);
		res.json({ status: 'error in /students' });
	}
});

app.get('/tasks/:taskId', async (req, res) => {
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

app.post('/postTask', async (req, res) => {
	const { description } = req.body;
	try {
		const { status } = await setTask(description);
		res.status(201).send(status);
	} catch (err) {
		res.status(400);
	}
});

app.delete('/deletetask/:taskId', async (req, res) => {
	console.log(req.params);
	if (!req?.params?.taskId) {
		return res.status(400).json({ message: 'id is required' });
	} else if (!parseInt(req.params.taskId)) {
		return res.status(400).json({ message: 'id must be an integer' });
	}

	try {
		const id = parseInt(req.params.taskId);
		const task = await deleteTask(id);
		res.send(
			`<p>Task with ID ${req.params.taskId} was deleted successfully</p>`
		);
	} catch (error) {
		console.log('Error: ' + error);
		res
			.status(500)
			.json({ message: 'An error occurred while deleting the task' });
	}
});

app.patch('/donetask/:taskId', async (req, res) => {
	console.log(req.params);
	if (!req?.params?.taskId) {
		return res.status(400).json({ message: 'id is required' });
	} else if (!parseInt(req.params.taskId)) {
		return res.status(400).json({ message: 'id must be an integer' });
	}
	const id = parseInt(req.params.taskId);
	try {
		const task = await setDoneTask(id);
		console.log(task);
		res.send(`ID done taks: ${id}`);
	} catch (error) {
		// console.error('Error processing task:', error);
		res.status(500).json({ message: 'Internal server error' });
	}

	// console.log('postDoneTask');
	// const id = parseInt(req.params.taskId);
	// console.log(id);
	// const task = await setDoneTask(id);
	// console.log(task);
	// res.send(`ID done taks: ${id}`);
});

// app.use((err, req, res) => {
// 	console.error(err);
// 	res.render('error', { error: err });
// });
