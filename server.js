const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const bodyParser = require("body-parser");
const path = require("path");

const mysql = require("mysql");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 4000;

var connection = mysql.createConnection({
  host: "sql9.freemysqlhosting.net",
  user: "sql9375908",
  password: "dQ3pw11usx",
  database: "sql9375908",
});
connection.connect();

const secretKey = "Secret Key";
const jwtMW = exjwt({
  secret: secretKey,
  algorithms: ["HS256"],
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.log(error);
      return;
    }
    for (let user of results) {
      if (username == user.username && password == user.password) {
        console.log("User has valid account!");
        let token = jwt.sign(
          { id: user.id, username: user.username },
          secretKey,
          { expiresIn: "7d" }
        );
        res.json({
          success: true,
          err: null,
          token,
        });
        break;
      } else {
        res.status(401).json({
          success: false,
          token: null,
          err: "Username or password is incorrect. Please try again.",
        });
      }
    }
  });
});

app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;

  const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
  connection.query(sql, (err, results) => {
    connection.end();
    if (err) throw err;
    console.log("Account added!");
  });

  res.json({
    success: true,
    err: null,
  });
});

// app.get("/api/LoggedIn", jwtMW, (req, res) => {
//   res.json({
//     success: true,
//     myContent: "You are still logged in!",
//   });
// });

// app.get("/api/logout", (req, res) => {
//   res.push("/");
// });

app.use(function (err, req, res, next) {
  if (err.name == "UnauthorizedError") {
    res.status(401).json({
      success: false,
      err: "Please log in to continue!",
    });
  } else {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
