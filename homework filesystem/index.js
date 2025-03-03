// Initialize a new npm project and create an index.js file.
// Using the fs module create a new file called homework.txt
// Inside the file write the following "Homework 02 in Basic Node"
var fs = require("fs");

fs.writeFile("homework.txt", "Homework 02 in Basic Node", function (err) {
  if (err) throw err;
  console.log("Saved!");
});

// Create a path to the file using the path module
var path = require("path");

const directory = __dirname;
const filename = "homework.txt";
filePath = path.join(directory, filename);
console.log("Full path to the file", filename);

// Append to the file the following " FINISHED!"

fs.appendFile("homework.txt", "FINISHED!", function (err) {
  if (err) throw err;
  console.log("Saved!");
});

//Read the file contents and print them out in the console.

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log("Error reading the file");
  } else {
    console.log(data);
  }
});
