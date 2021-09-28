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
  res.sendFile(path.join(__dirname, "./client/ind.html"));
  rollbar.critical("error error");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./clie/index.html"));
  rollbar.warning("danger");
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

app.get("/", (req, res, hello) => {
  // Try catch to catch error
  try {
    res.sendFile(path.join(__dirname, "./public/index.html"));
    rollbar.info("html file served succesfully");
  } catch (err) {
    rollbar.critical(err);
  }
});

app.get("/", (req, res, house) => {
  // Try catch to catch error
  try {
    res.sendFile(path.join(__dirname, "./public/index.html"));
    rollbar.info("html file served succesfully");
  } catch (err) {
    rollbar.warning(err);
  }
});

const port = process.env.PORT || 5656;

app.use(rollbar.errorHandler());

app.listen(port, () =>
  console.log(`Hippity Hoppity your server is opening on port: ${port}`)
);
