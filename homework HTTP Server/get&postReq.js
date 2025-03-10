// Add EventEmitter
// Implement EventEmitter for handling student registrations.
// When a student submits their name:
// Emit an event called studentAdded.
// The event should:
// Log the student’s name in a console.
// Write the student’s name into students.txt using the FS module.

// Extend the HTTP server to handle an additional route
// /add_student (GET request): Returns an HTML form with:
// A single text input for the student’s name. -A submit button.
// When submitted, the form sends a POST request to /all_students.
// /all_students (POST request): Retrieves the student name from the form submission.

const http = require("http");
const fs = require("fs");
const EventEmitter = require("events");
const querystring = require("querystring");

import http from "node:http";

//Create an EventEmitter

const eventEmitter = new EventEmitter();

eventEmitter.on("student", (studentName) => {
  console.log(`Student Added: ${studentName}`);
});
// Append the student's name to students.txt
fs.appendFile("students.txt", `${studentName}\n`, (err) => {
  if (err) {
    console.error("Error writing to file", err);
  } else {
    console.log("Student name written to students.txt");
  }
});

const server = http.createServer((req, res) => {
  if (req.url === "/add_student" && req.method === "GET") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`
            <h1>Add Student</h1>
            <form method="POST" action="/all_students">
            <label for="name">Student Name:</label>
            <input type="text" id="name" name="name" required>
            <button type="submit">Submit</button>
            </form>`);
  } else if (req.url === "/all_students" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { name } = querystring.parse(body);
      res.writeHead(200, { "content-type": "text/html" });
      res.end(`<h1>All Students</h1>
//         <p>Student Name Submitted: ${name}</p>`);
    });
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(3001, () => {
  console.log("Server is running at http://localhost:3001");
});
