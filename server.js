const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const app = express();
const port = 4000;
const budgetModel = require("./models/budget_schema");
const userModel = require("./models/user_schema");
let url = "mongodb://localhost:27017/myData";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
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

app.post("/register", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
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
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
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
         // id: user.id,
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
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    budgetModel.find({userId: req.params.userId})
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
      mongoose.connection.close();
    });
  });
});


// app.get("/dashboard", jwtMW, (req, res) => {
//   res.json({
//     success: true,
//     myContent: "Secret content",
//   });
// });

// app.get("/budget", jwtMW, (req, res) => {
//   console.log("budget");
//   mongoose
//     .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//       budgetModel.find({}).then((data) => {
//         res.json(data);
//         mongoose.connection.close();
//       });
//     });
// });

app.post("/addBudget", jwtMW, (req, res) => {
  console.log(req.body);
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
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

// app.get("/logout", (req, res) => {
//   if (req.session) {
//     req.session.destroy(function (err) {
//       if (err) {
//         return Next(err);
//       } else {
//         return res.redirect("/");
//       }
//     });
//   }
// });

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
