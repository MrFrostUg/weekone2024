import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 8080;
const addNewUser=[];
const users = [
  {"id": "1", "name":"John","surname":"Smith","country":"USA","salary":6000},
  {"id": "2", "name":"Emma","surname":"Wilson","country":"UK","salary":5500},
  {"id": "3", "name":"Hans","surname":"Müller","country":"Germany","salary":7000},
  ];
  
// Middleware to parse JSON in the request body
app.use(bodyParser.json());


// Create a router
const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Welcome to Home Page");
});

router.get("/users", (_req, res) => {
  res.json(users);
});

router.get("/users/userWithLowestSalary", (_req, res) => {
  // Find the user with the lowest salary
  let userWithLowestSalary = users.reduce((minSalaryUser, currentUser) => {
    return currentUser.salary < minSalaryUser.salary ? currentUser : minSalaryUser;
  }, users[0]);

  // Return the user with the lowest salary
  res.json(userWithLowestSalary);
});


// Find the user with the highest salary
router.get("/users/userWithHighestSalary", (_req, res) => {
 // Find the user with the highest salary

  let userWithHighestSalary = users.reduce((maxSalaryUser, currentUser) => {
    return currentUser.salary > maxSalaryUser.salary ? currentUser : maxSalaryUser;
}, users[0]);

 // Return the user with the highest salary
 res.json(userWithHighestSalary);
});
// Add new user using POST with a unique ID
router.post('/users/addUser', (req, res) => {
  const newUser = {...req.body,  id: uuidv4()}; // Add a unique ID using uuidv4()

  // Add the new user to the array
  users.push(newUser);

  // Respond with a success message
  res.json({ message: 'User created successfully'});

});



 // GET endpoint to search for a user from Switzerland
router.get('/user/:country', (req, res) => {
  const countryToSearch = req.params.country.toLowerCase(); // Convert to lowercase for case-insensitive comparison

  // Find the user from Switzerland
  const userFromSwitzerland = users.find(user => user.country.toLowerCase() === countryToSearch);

  if (userFromSwitzerland) {
    res.json(userFromSwitzerland);
  } else {
    res.status(404).json({ message: `No person found from ${countryToSearch}` });
  }
});

// Mount the router at the root level
app.use("/", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
