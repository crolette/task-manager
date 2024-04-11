const { connectToDatabase, endConnection } = require('./database');
const crypto = require('crypto');

// function to set a user
async function setUser(username, hash, salt) {
	try {
		const conn = await connectToDatabase();
		const [result] = await conn.query(
			'INSERT INTO users(username, hash, salt) VALUES(?,?, ?)',
			[username, hash, salt]
		);
		endConnection(conn);
		return result;
	} catch (err) {
		console.log(err);
	}
}

function setHashPwd(password) {
	console.log('hashpwd');
	const salt = crypto.randomBytes(16).toString('hex');
console.log(salt);
	const hash = crypto
		.pbkdf2Sync(password, salt, 1000, 64, `sha512`)
		.toString(`hex`);
	console.log(hash);
	return [hash, salt];
}

module.exports = {
	setUser,
	setHashPwd,
};
