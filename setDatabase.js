// environnment variable
const { connectToDatabase, endConnection } = require('./filesystem');

// function to set a tasks
async function setTask(description) {
	console.log('setTask');
	try {
		const conn = await connectToDatabase();
		const result = await conn.query(
			`INSERT INTO tasks(description, done) VALUES(?,?)`,
			[description, (done = false)]
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
