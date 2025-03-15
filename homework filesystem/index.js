import fs from "fs";
import path from "path"; 

const directory = path.resolve(); 
const filename = "homework.txt";
const filePath = path.join(directory, filename);

fs.writeFile(filePath, "Homework 02 in Basic Node", (err) => {
  if (err) throw err;
  console.log("File created and written!");

  fs.appendFile(filePath, " FINISHED!", (err) => {
    if (err) throw err;
    console.log("Text appended!");
    
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file");
      } else {
        console.log(data);
      }
    });
  });
});
