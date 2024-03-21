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
	console.log('connect');
	let conn;
	try {
		conn = await mariadb.createConnection({
			host: 'localhost',
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

async function create_table() {
	// ALTER TABLE tasks ADD COLUMNS done BOOLEAN NOT NULL DEFAULT false;
	// ALTER TABLE tasks ADD COLUMN done BOOLEAN NOT NULL DEFAULT false;
	// CREATE TABLE tasks(id INT PRIMARY KEY AUTO_INCREMENT):
	return conn.query(
		'CREATE TABLE IF NOT EXISTS test.contacts (id INT PRIMARY KEY AUTO_INCREMENT,first_name VARCHAR(25),last_name VARCHAR(25),email VARCHAR(100)) ENGINE=InnoDB'
	);
}

module.exports = {
	connectToDatabase,
	endConnection,
};

// // read the file and returns the objects == tasksList
// function readFile() {
// 	try {
// 		tasksList = fs.readFileSync(path);
// 		tasksList = JSON.parse(tasksList);
// 		return tasksList;
// 	} catch (error) {
// 		createFile();
// 		return error;
// 	}
// }

// // create if the file exists
// function checkIfFileExists(path) {
// 	return fs.existsSync(path);
// }

// // create the file with an empty array
// function createFile() {
// 	fs.writeFile(path, '[]', function (err) {
// 		if (err) throw err;
// 	});
// }

// // write the new task in the file
// function writeNewTaskInFile(tasksList, description) {
// 	let id = tasksList.length ? tasksList.length + 1 : 1;

// 	// create the new object with the task description and the corresponding id
// 	const newTask = {
// 		id,
// 		description,
// 		done: false,
// 	};
// 	// push the newTask in the array
// 	tasksList.push(newTask);
// 	writeFile(tasksList);
// }

// // function to write the new tasks list in the file
// function writeFile(tasksList) {
// 	try {
// 		fs.writeFileSync(path, JSON.stringify(tasksList, null, 2), (file) =>
// 			console.log(file)
// 		);
// 	} catch (error) {
// 		console.log('An error has occurred ', error);
// 	}
// }

// // function to delete task from the list with the corresponding id
// function deleteTaskFromList(tasksList, id) {
// 	// push the newTask in the array
// 	id = Number(id);
// 	tasksList = tasksList.filter((task) => task.id != id);
// 	updateIdList(tasksList);
// 	writeFile(tasksList);
// 	return tasksList;
// }

// // update the id's in the list after deletion / mark as done
// function updateIdList(tasksList) {
// 	let id = 1;
// 	tasksList.forEach((element) => {
// 		element.id = id;
// 		id++;
// 	});
// }

// // check the done task
// function checkDoneTask(tasksList, id) {
// 	let index = tasksList.findIndex((task) => task.id == id);

// 	console.log(`Task "` + tasksList[index].description + `" marked as done`);

// 	tasksList[index].done = true;
// 	writeFile(tasksList);

// 	return tasksList;
// }
