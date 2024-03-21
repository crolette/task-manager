// import mysql from "mysql2";
// import dotenv from "dotenv";
// dotenv.config()

const { getTasks } = require('./getDatabase');
const { setTask, deleteTask, setDoneTask } = require('./setDatabase');

// const pool = mysql.createPool({
//   host: process.env.MARIADB_HOST,
//   user: process.env.MARIADB_USER,
//   password: process.env.MARIADB_PASSWORD,
//   database: process.env.MARIADB_DATABASE
// }).promise()

// export async function getAllStudents() {
//   const [allStudents] = await pool.query("SELECT * FROM Students");
//   return allStudents
// }

// export async function getStudentById(id) {
//   const [student] = await pool.query(`SELECT * FROM Students WHERE id = ?`, [id])
//   return student
// }

// export async function postStudent(firstname, lastname, id_promo) {
//   const [student] = await pool.query(`
//     INSERT INTO Students (firstname, lastname, id_promo)
//     VALUES (?, ?, ?)
//   `, [firstname, lastname, id_promo])
//   const id = student.insertId
//   return getStudentById(id)
// }

async function main() {
	// const result = await setTask('New Task');
	// console.log(result);
	let tasks = await getTasks();
	console.log(tasks);
	// let done = await setDoneTask(5)
	const deleted = await deleteTask(6);
	console.log(deleted);
	tasks = await getTasks();
	console.log(tasks);
}

main();
