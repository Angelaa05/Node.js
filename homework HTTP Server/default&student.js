import http from "node:http";

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>Successfully welcome to my server");
  } else if (req.url === "/student") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`
            <h1>Student Information</h1>
            <ul>
            <li>Student Name: "Your Name"</li>
            <li>Student Lastname: "Your Lastname"</li>
            <li>Academy: "The Academy you are at"</li>
            <li>Subject: "The current subject being learned"</li>
            </ul>`);
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>404 Not Fount</h1>");
  }
});
//
server.listen(3001, () => {
  console.log("Server is running at http://localhost:3001");
});
