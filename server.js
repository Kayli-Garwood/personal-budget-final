const express = require("express");
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const app = express();
const connectDB = require('./DB/connection');
const port = process.env.port || 4000;
const budgetModel = require("./models/budget_schema");
const userModel = require("./models/user_schema");
const URI = "mongodb+srv://kgarwood:103198@newcluster.rlswc.mongodb.net/users?retryWrites=true&w=majority"


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://104.131.54.49");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const secretKey = "My super secret key";
const jwtMW = exjwt({
  secret: secretKey,
  algorithms: ["HS256"],
});

connectDB();

app.use(express.static(path.join(__dirname, 'build')));

app.post("/register", (req, res) => {
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      let signUpData = new userModel({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      }).save(function (err, doc) {
        if (err) res.json(err);
        else res.send("Successfully inserted!");
      });
    });
});

app.post("/login", (req, res) => {
  console.log("receive");
  mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
  userModel.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      console.log("user: " + user);
      if (user.email == req.body.email && user.password == req.body.password) {
        let token = jwt.sign(
          { email: user.email, password: user.password },
          secretKey,
          { expiresIn: "7d" }
        );
        console.log(token);
        let obj = {
          login: true,
          user: user.email,
          token: token,
          userID: user._id,
        };
        res.json(obj);
        console.log("login is done");
      }
    }
  });
});


app.get("/budget/:userId", (req, res) => {
  console.log(req.params.userId);
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    budgetModel.find({userId: req.params.userId})
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
      mongoose.connection.close();
    });
  });
});

app.post("/addBudget", jwtMW, (req, res) => {
  console.log(req.body);
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      newBudget = {
        userId: req.body.userId,
        title: req.body.title,
        value: req.body.value,
        color: req.body.color,
      };
      budgetModel
        .insertMany(newBudget)
        .then((data) => {
          console.log(data);
          res.json(data);
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    })
    .catch((connectionError) => {
      console.log(connectionError);
    });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
