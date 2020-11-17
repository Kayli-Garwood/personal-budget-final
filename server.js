const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const app = express();
const port = 4000;
const budgetModel = require("./models/budget_schema");
const userModel = require("./models/user_schema");
let url = "mongodb://localhost:27017/myData";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static("public"));

app.post("/register", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      let signUpData = new userModel({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        //passwordConf: req.body.passwordConf,
      }).save(function (err, doc) {
        if (err) res.json(err);
        else res.send("Successfully inserted!");
      });
      //   userModel
      //     .insertMany(signUpData)
      //     .then((data) => {
      //       res.json(data);
      //       console.log("Account added!");
      //       mongoose.connection.close();
      //     })
      //     .catch((connectionError) => {
      //       console.log(connectionError);
      //     });
      // })
      // .catch((connectionError) => {
      //   console.log(connectionError);
    });
});

app.post("/login", (req, res) => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  userModel.find({ email: req.body.email }, function (err, users) {
    if (err) res.send(err);
    else res.json(userModel);
  });
});

// app.get("/budget/:id", (req, res) => {
//   userModel.find({ email: req.body.email }, function (err, docs) {
//     if (err) res.json(err);
//     else {
//       res.render("dashboard", { user: docs[0] });
//     }
//   });
// });

// app.get("/dashboard", jwtMW, (req, res) => {
//   res.json({
//     success: true,
//     myContent: "Secret content",
//   });
// });

app.get("/budget", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      budgetModel.find({}).then((data) => {
        res.json(data);
        mongoose.connection.close();
      });
    });
});

app.post("/addBudget", (req, res) => {
  console.log(req.body);
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      newBudget = {
        title: req.body.title,
        value: req.body.value,
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
