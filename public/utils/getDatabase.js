// environnment variable

const { connectToDatabase, endConnection } = require('./database');

// function to get all the tasks
async function getTasks() {
	try {
		const conn = await connectToDatabase();
		const result = await conn.query('SELECT * FROM tasks');
		endConnection(conn);
		return result;
	} catch (err) {
		console.log(err);
	}
}

// function to get all the tasks that are not done
async function getTasksNotDone() {
	try {
		const conn = await connectToDatabase();
		const result = await conn.query('SELECT * FROM tasks WHERE done = 0');
		endConnection(conn);
		return result;
	} catch (err) {
		console.log(err);
	}
}

// function to get all the tasks that are not done
async function getTasksDone() {
	try {
		const conn = await connectToDatabase();
		const result = await conn.query('SELECT * FROM tasks WHERE done = 1');
		endConnection(conn);
		return result;
	} catch (err) {
		console.log(err);
	}
}

// function to get a specific ID
async function getTaskById(id) {
	try {
		const conn = await connectToDatabase();
		const [task] = await conn.query(`SELECT * FROM tasks WHERE id = ?`, [id]);
		console.log('getTaskById');
		console.log(task);
		endConnection(conn);
		return task;
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	getTasks,
	getTaskById,
	getTasksDone,
	getTasksNotDone,
};
