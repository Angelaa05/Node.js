import http from "node:http";
import events from "node:events";
import fs from "node:fs";
import querystring from "node:querystring";

const eventEmitter = new events.EventEmitter();

eventEmitter.on("studentAdded", (studentName) => {
  console.log(`New student registered: ${studentName}`);
  fs.appendFile("students.txt", `${studentName}\n`, (err) => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log(
        `Student name "${studentName}" successfully saved to students.txt`
      );
    }
  });
});

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to my server!</h1>");
  } else if (req.url === "/student") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h1>Student information</h1>
            <p>Student Name: "Your Name"</p>
            <p>Student Lastname: "Your Lastname"</p>
            <p>Academy: "The Academy you are at"</p>
            <p>Subject: "The current subject being learned"</p>`);
  } else if (req.url === "/add_student" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h1>Add student</h1>
            <form action="/all_students" method="POST">
                <label for="name">Student Name:</label>
                <input type="text" id="name" name="student_name" required>
                <button type="submit">Submit</button>
            </form>`);
  } else if (req.url === "/all_students" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsedData = querystring.parse(body);
      const studentName = parsedData.student_name;

      if (!studentName) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end("<h1>400 Bad Request</h1><p>Student name is required!</p>");
        return;
      }

      eventEmitter.emit("studentAdded", studentName);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <h1>All Students</h1>
        <p><strong>Student Name:</strong> ${studentName}</p>
      `);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`<h1>404 Not Found</h1>`);
  }
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
