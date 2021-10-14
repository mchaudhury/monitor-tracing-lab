const express = require("express");
const path = require("path");
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "a670c7d8243845c29afafff46ff0e8bf",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;

app.use(rollbar.errorHandler());

app.get("/", (req, res, next) => {
  // 'try-catch' to catch error
  try {
    res.sendFile(path.join(__dirname, "./client/index.html"));
    rollbar.info("html file served succesfully");
  } catch (err) {
    rollbar.critical(err);
  }
});

app.get("/js", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./client/index.js"));
    rollbar.info("index.js file served succesfully");
  } catch (err) {
    alert(err + "functionality might not work, try reloading.");
    rollbar.critical("Index.js never got served.");
  }
});

app.post("/api/student", (req, res) => {
  let { name } = req.body;
  name = name.trim();

  const index = students.findIndex((studentName) => studentName === name);

  if (index === -1 && name !== "") {
    students.push(name);
    rollbar.log("Student added successfully", {
      author: "Adam",
      type: "manual entry",
    });
    res.status(200).send(students);
  } else if (name === "") {
    rollbar.critical("No name given");
    res.status(400).send("must provide a name.");
  } else {
    rollbar.error("student already exists");
    res.status(400).send("that student already exists");
  }
});

app.listen(port, () => console.log(`Server running at port: ${port}`));

// const express = require("express");
// const path = require("path");
// const Rollbar = require("rollbar");
// const app = express();

// app.use(express.json());

// const port = process.env.PORT || 5656;

// const rollbar = new Rollbar({
//   accessToken: "da412e2318b1480fb5a4e374174ddf9a",
//   captureUncaught: true,
//   captureUnhandledRejections: true,
// });

// app.use(rollbar.errorHandler());

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/index.html"));
//   rollbar.info("HTML was monitored successfully");
// });

// app.get("/", (req, res, next) => {
//   // Try catch to catch error
//   try {
//     res.sendFile(path.join(__dirname, "./client/index.html"));
//     rollbar.info("html file served succesfully");
//   } catch (err) {
//     rollbar.critical(err);
//   }
// });

// app.get("/js", (req, res) => {
//   try {
//     res.sendFile(path.join(__dirname, "./client/index.js"));
//     rollbar.info("index.js file served succesfully");
//   } catch (err) {
//     alert(err + "functionality may not work, try reloading.");
//     rollbar.critical("Index.js was never served.");
//   }
// });

// //STUDENTS STUFF

// const studentArr = [];

// app.post("/api/students", (req, res) => {
//   const { name } = req.body;
//   studentArr.push(name);
//   rollbar.info("Student was added successfully");

//   // Critical & Warning rollbar
//   //   const { names } = req.body;
//   //   studentArr.push(name);
//   //   rollbar.critical("student NOT successfully added!");
//   //   res.status(200).send(studentArr);
//   //   rollbar.warning("warning, name is not found");
// });

// app.get("/api/message", (req, res) => {
//   const message = "Hello, Hi there!";
//   //   res.sendFile(path.join(__dirname, "./client/index.html"));
//   rollbar.log("The message has been sent");
//   res.status(200).send(message);
// });

// app.get("/", (req, res, next) => {
//   // Try catch to catch error
//   try {
//     res.sendFile(path.join(__dirname, "./client/index.html"));
//     rollbar.info("html file served succesfully");
//   } catch (err) {
//     rollbar.critical(err);
//   }
// });

// app.get("/js", (req, res) => {
//   try {
//     res.sendFile(path.join(__dirname, "./client/index.js"));
//     rollbar.info("index.js file served succesfully");
//   } catch (err) {
//     alert(err + "functionality might not work, try reloading.");
//     rollbar.critical("Index.js never got served.");
//   }
// });

// app.post("/api/student", (req, res) => {
//   let { name } = req.body;
//   name = name.trim();

//   const index = students.findIndex((studentName) => studentName === name);

//   if (index === -1 && name !== "") {
//     students.push(name);
//     rollbar.log("Student added successfully", {
//       author: "Adam",
//       type: "manual entry",
//     });
//     res.status(200).send(students);
//   } else if (name === "") {
//     rollbar.critical("No name given");
//     res.status(400).send("You have to provide a name.");
//   } else {
//     rollbar.error("Student already exists");
//     res.status(400).send("That student already exists");
//   }
// });

// app.listen(port, () => console.log(`Server is opening on port: ${port}`));
