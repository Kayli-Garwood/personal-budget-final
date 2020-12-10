import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await axios
      .post("http://localhost:4000/login", { email, password })
      .then((res) => {
        if (res) {
          const token = res.data.token;
          localStorage.setItem("jwt", token);
          localStorage.setItem("userId", res.data.userID);
          history.push("/dashboard");
        }
      });
  };

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
