// environnment variable

const { connectToDatabase, endConnection } = require('./filesystem');

// function to get all the tasks
async function getTasks() {
	console.log('clients');
	try {
		const conn = await connectToDatabase();
		const result = await conn.query(
			'SELECT * FROM tasks'
		);
		endConnection(conn);
		return result;
	} catch (err) {
		console.log(err);
	}
}

// function to get a specific ID
async function getTaskById(id) {
	const [task] = await pool.query(`SELECT * FROM tasks WHERE id = ?`, [id]);
	return task;
}

module.exports = {
	getTasks,
	getTaskById,
};
