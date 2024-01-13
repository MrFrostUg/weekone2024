import express from "express";

const app = express();
const port = 8080;

const teacherNames = [
  "Harry Ross",
  "Bruce Cook",
  "Carolyn Morgan",
  "Albert Walker",
  "Randy Reed",
  "Larry Barnes",
  "Lois Wilson",
  "Jesse Campbell",
  "Ernest Marvin",
  "Rogers Kevin",
  "Jabel Kent",
  "Mbiira Martin"
];

const studentNames = [
  "Alice Johhson",
  "Bob Smith",
  "Charlie Buken",
  "David Silva",
  "Eva Mendez",
  "Frank Gashumba",
  "Grace Nakimera",
  "Hank Miles",
  "Ivy Caro",
  "Jack Chan",
  "Kelly Hillson",
  "Leo Jones",
  "Mia Hayu",
  "Nathan Best",
  "Olivia George",
  "Peter Nakura",
  "Quinn vivi",
  "Rachel jina",
  "Sam Gombya",
  "Tyler lokik"
];

// Create a router
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

router.get("/teachers", (req, res) => {
  res.send("Teachers List");
});

router.get("/students", (req, res) => {
  res.send("Students List");
});

router.post("/teachers", (req, res) => {
  //create a random teacher
  const randomTeacher = {
    name: teacherNames[Math.floor(Math.random() * teacherNames.length)]
  };
  res.json(randomTeacher);
});

router.post("/students", (req, res) => {
  // create a random student
  const randomStudent = {
    name: studentNames[Math.floor(Math.random() * studentNames.length)]
  };
  res.json(randomStudent);
});

// Mount the router at the root level
app.use("/", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
