const { connectToDatabase, endConnection } = require('./database');

// function to get all the tasks
async function setUser(username, password) {
	try {
		const conn = await connectToDatabase();
		const [result] = await conn.query('INSERT INTO users(username, password) VALUES(?,?)', [username, password]);
		endConnection(conn);
		return result;
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
    setUser
}