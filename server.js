const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");
const app = express();

app.use(express.json());

const rollbar = new Rollbar({
  accessToken: "da412e2318b1480fb5a4e374174ddf9a",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
  rollbar.info("HTML was monitored successfully");
});

//STUDENTS STUFF

const studentArr = [];

app.post("/api/students", (req, res) => {
  //   const { name } = req.body;
  //   studentArr.push(name);

  //   rollbar.log("student successfully added!");
  //   res.status(200).send(studentArr);

  try {
    const { name } = req.body;
    studentArr.push(name);

    rollbar.log("student successfully added!");
    res.status(200).send(student);
  } catch (err) {
    rollbar.critical("not found");
  }
});

app.get("/api/food", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./client/ind.html"));
    rollbar.info("HTML was monitored successfully");
  } catch (err) {
    alert(err + "not working, try again");
    rollbar.critical("not found");
  }
});

const port = process.env.PORT || 5656;

app.use(rollbar.errorHandler());

app.listen(port, () =>
  console.log(`Hippity Hoppity your server is opening on port: ${port}`)
);
