// environnment variable
const { connectToDatabase, endConnection } = require('./database');
// import { connectToDatabase, endConnection } from './database.js';

// function to set a tasks
async function setTask(description, user_id) {
	console.log('set Task');
	try {
		const conn = await connectToDatabase();
		const result = await conn.query(
			`INSERT INTO tasks(description, user_id) VALUES(?, ?)`,
			[description, user_id]
		);
		endConnection(conn);
		return result;
	} catch (err) {
		console.log(err);
	}
}

// function to delete a task based on the id
async function deleteTask(id) {
	console.log('deleteTask');
	try {
		const conn = await connectToDatabase();
		const result = await conn.query('DELETE FROM tasks WHERE id = ?', [id]);
		endConnection(conn);
		return result;
	} catch (err) {
		console.log(err);
	}
}

async function setDoneTask(id) {
	console.log('done');
	try {
		const conn = await connectToDatabase();
		const result = await conn.query(`UPDATE tasks SET done = ? WHERE id = ?`, [
			1,
			id,
		]);
		endConnection(conn);
		return result;
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	setTask,
	deleteTask,
	setDoneTask,
};

