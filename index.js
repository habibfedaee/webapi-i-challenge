// implement your API here

// require the express npm module, needs to be added to the project using 'npm install express'
const express = require("express");
const db = require("./data/db.js");

// creates an expressa application using the express module
const server = express();
server.use(express.json());

let id = 0;
let getId = () => ++id; // helper function to creates auto-incrementing ids
let hobbits = [
  { id: 1, name: "Sawise Gamgee" },
  { id: 2, name: "Frodo Baggins" },
];
// configures our server to execute a function for every GET request to '/'
// the second argument passed to the .get() method is the 'Route Handler Function'
// the route handler function will run on every GET request to '/'
server.get("/hobbits", (req, res) => {
  // express will pass the request and response object to this function
  // the .send() on the response object can be used to send a response to the client
  //res.send("Hello World!");

  // route handler code here:
  res.status(200).json(hobbits);
});

// get by id:
server.get("/hobbits/:id", (req, res) => {
  // the desired id comes in the URL, and is found in req.params.id
  res.status(200).json(hobbits.find((hob) => hob.id == req.params.id));
});

// post hobbits:
server.post("/hobbits", (req, res) => {
  // post new hobbit, the desired name comes in the body, and is found in 'req.params.name'
  hobbits.push({ id: getId(), name: req.params.name });
  res.status(201).json(hobbits); // 201 status code means created
});

// update hobbits
server.put("/hobbit/:id", (req, res) => {
  // update existing hobbit
  // the id to update is in the 'req.params.id' and the desired name in 'req.params.name'
  hobbits = hobbits.map((hob) =>
    hob.id == req.params.id ? { ...hob, name: req.params.name } : hob
  );
  res.status(200).json(hobbits);
});

// delete hobbits:
server.delete("/hobbits/:id", (req, res) => {
  // delete existing hobbit:
  hobbits = hobbits.filter((hob) => hob.id != req.params.id);
  res.status(200).json(hobbits);
});

//---------------------- users endpoint ----------------------
server.get("/users", async (req, res) => {
  const users = await db.find();
  res.status(200).json(users);
});

// once the server is fully configured we can have it 'listen' for connections on a particular 'port'
// the callback function passed as the second argument will run once the server starts
server.listen(8000, () => {
  console.log("API running on port 8000");
});
