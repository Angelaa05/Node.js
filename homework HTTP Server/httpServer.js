//Create a server using the HTTP module. The server should handle the following routes:

// / (default route): Returns an HTML response with any content of your choice.
// /student: Returns an HTML response with the following student information:
// Student Name: "Your Name" Student Lastname: "Your Lastname" Academy: "The Academy you are at" Subject:
// "The current subject being learned"
// The server should listen on port 3000.

import http from "node:http";

//Create the server

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("<h1>Welcome!</h1>");
});

//Start the server

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
