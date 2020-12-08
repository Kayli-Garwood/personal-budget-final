import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  // localStorage.setItem('token', null);
  // history.push("/login");
  const history = useHistory();

  // const handlePassword = (event) => {
  //   setPassword(event.target.value);
  // };

  // const handleEmail = (event) => {
  //   setEmail(event.target.value);
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //  await axios.post("http://localhost:4000/login", {email, password},
    //   (req, res) => {
    //     console.log("testing");
    //     console.log(res);
    //     // document.getElementById("email").value = "";
    //     // document.getElementById("password").value = "";
    //     if (res) {
    //       const token = res.data.token;
    //       localStorage.setItem("jwt", token);
    //       //history.pushState("/dashboard");
    //       //  getDashboard();
    //     }
    // })

    await axios
      .post("http://localhost:4000/login", { email, password })
      .then((res) => {
        if (res) {
          const token = res.data.token;
          localStorage.setItem("jwt", token);
          localStorage.setItem("userId", res.data.userID);
          history.push("/dashboard");
          //  getDashboard();
        }
      });
  };

  // function getDashboard() {
  //   const token = localStorage.getItem("jwt");
  //   axios
  //     .get("/budget", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       if (res) {
  //         history.pushState(null, null, "dashboard");
  //         //  document.querySelector("body").innerHTML = "";
  //       }
  //     });
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios
  //     .post("http://localhost:4000/login", { email, password })
  //     .then((res) => {
  //       history.push("/dashboard");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div>
      <h1>Already have an account?</h1>
      <h2>Login here!</h2>
      <form onSubmit={handleSubmit}>
        <div className="email">
          <label htmlFor="email">Enter Email: </label>
          <input type="email" name="email" id="email" />
        </div>

        <div className="pass">
          <label htmlFor="password">Enter Password: </label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="login">
          <input type="submit" value="Submit!" />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
