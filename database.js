import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MARIADB_HOST,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE
}).promise()


export async function getAllStudents() {
  const [allStudents] = await pool.query("SELECT * FROM Students");
  return allStudents
}

export async function getStudentById(id) {
  const [student] = await pool.query(`SELECT * FROM Students WHERE id = ?`, [id])
  return student
}

export async function postStudent(firstname, lastname, id_promo) {
  const [student] = await pool.query(`
    INSERT INTO Students (firstname, lastname, id_promo)
    VALUES (?, ?, ?)
  `, [firstname, lastname, id_promo])
  const id = student.insertId
  return getStudentById(id)
}
