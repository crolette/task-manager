// environnment variable
// import dotenv from 'dotenv';

// dotenv.config();
require('dotenv').config();
DB_HOST = process.env.DB_HOST;
DB_USERNAME = process.env.DB_USERNAME;
DB_PASSWORD = process.env.DB_PASSWORD;
DB_NAME = process.env.DB_NAME;

// import mariadb from 'mariadb';
const mariadb = require('mariadb');

// create a connection to the database
const connectToDatabase = async () => {
	console.log('connectToDB');
	let conn;
	try {
		conn = await mariadb.createConnection({
			host: DB_HOST,
			user: DB_USERNAME,
			password: DB_PASSWORD,
			database: DB_NAME,
			trace: true,
		});
	} catch (err) {
		console.log(err);
	}

	return conn;
};

// create a connection to the database
const connectToServer = async () => {
	console.log('connectServer');
	let conn;
	try {
		conn = await mariadb.createConnection({
			host: DB_HOST,
			user: DB_USERNAME,
			password: DB_PASSWORD,
			trace: true,
		});
	} catch (err) {
		console.log(err);
	}

	return conn;
};

// disconnect from the database
const endConnection = (conn) => {
	if (conn) conn.end();
};

// check if database exists
// CREATE DATABASE IF NOT EXISTS DBName;
async function checkDatabase() {
	let db;
	try {
		let conn = await connectToServer();
		// db = await conn.query('CREATE DATABASE IF NOT EXISTS tasks_manager');
		db = await conn.query(
			`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'tasks_manager'`
		);
		console.log('CHECK DATABASE');
		console.log(db);
		endConnection(conn);
		return db;
	} catch (error) {
		console.log(error);
	}
}

async function createDatabase() {
	let db;
	let conn;
	try {
		conn = await connectToServer();
		db = await conn.query(`CREATE DATABASE IF NOT EXISTS tasks_manager`);
		await createTables();
		endConnection(conn);
		return db;
	} catch (error) {
		console.log(error);
	}
}

async function checkIfIdExists(id) {
	try {
		conn = await connectToDatabase();
		db = await conn.query(`SELECT id FROM tasks WHERE id = ?`, [id]);
		endConnection(conn);
		return db;
	} catch (error) {
		console.log(error);
	}
}

async function createTables() {
	conn = await connectToDatabase();
	await conn.query(
		'CREATE TABLE IF NOT EXISTS tasks(id INT PRIMARY KEY AUTO_INCREMENT, description VARCHAR(30), done BOOLEAN NOT NULL DEFAULT false)'
	);
	// await conn.query(
	// 	'CREATE TABLE IF NOT EXISTS tasks_done(id INT PRIMARY KEY AUTO_INCREMENT, description VARCHAR(30), done BOOLEAN NOT NULL DEFAULT false)'
	// );
	endConnection(conn);
}

module.exports = {
	connectToDatabase,
	endConnection,
	createDatabase,
	checkDatabase,
	createDatabase,
	checkIfIdExists,
};

// exports = {
// 	connectToDatabase,
// 	endConnection,
// 	createDatabase,
// 	checkDatabase,
// 	createDatabase,
// 	checkIfIdExists,
// };
