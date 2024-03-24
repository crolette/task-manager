// const { setTask } = require('./setDatabase');
// import { setTask } from '/setDatabase.js';
// const { setTask } = require('./public/utils/setDatabase');

const form = document.getElementById('newtask');

// import dotenv from 'dotenv';
// dotenv.config();
const DB_HOST = 'localhost';
const DB_PASSWORD = 'P0ng01988';
const DB_USERNAME = 'crolette';
const DB_NAME = 'tasks_manager';

import mariadb from 'mariadb';
// const mariadb = require('mariadb');

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

// disconnect from the database
const endConnection = (conn) => {
	if (conn) conn.end();
};

async function setTask(description) {
	try {
		const conn = await connectToDatabase();
		const result = await conn.query(
			`INSERT INTO tasks(description) VALUES(?)`,
			[description]
		);
		endConnection(conn);
		return result;
	} catch (err) {
		console.log(err);
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log('click');
	const description = e.target[0].value;
	console.log(description);
	const value = setTask(description);
	// console.log(value);
	// const tasks = getTasks();
	console.log(tasks);
});
