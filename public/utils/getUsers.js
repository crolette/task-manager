const { connectToDatabase, endConnection } = require('./database');

// function to get all the tasks
async function getUser(username) {
	try {
		const conn = await connectToDatabase();
		const [result] = await conn.query('SELECT * FROM users WHERE username = ?', [
			username,
		]);
		endConnection(conn);
		return result;
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	getUser,
};
