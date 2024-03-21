import express from "express";

import { getAllStudents, getStudentById, postStudent } from "./database.js";

const app = express();
const PORT = 3000;

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Express running on localhost:${PORT}`);
})

app.get("/", (req, res) => {
  res.send("Hello Hamilton 9")
})

app.get("/students", async(req, res) => {
  try {
    const allStudents = await getAllStudents()
    res.send(allStudents)
  } catch(err) {
    console.error(err);
    res.json({status: "error in /students"})
  }
})

app.get("/student/:id", async(req, res) => {
  if(!req?.params?.id) {
    return res.status(400).json({"message" : "id is required"})
  } else if(!parseInt(req.params.id)) {
    return res.status(400).json({"message" : "id must be an integer"})
  }
  const id = parseInt(req.params.id)
  const student = await getStudentById(id)
  res.status(200).send(student)
})

app.post("/postStudent", async(req, res) => {
  const {firstname, lastname, id_promo} = req.body
  const student = await postStudent(firstname, lastname, id_promo)
  res.send(student)
})

app.use((err, req, res) => {
  console.error(err);
  res.render('error', {error: err})
})