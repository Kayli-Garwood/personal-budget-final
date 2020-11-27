import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

async function LoginPage() {
  // const [password, setPassword] = useState({});
  // const [email, setEmail] = useState({});
  // const history = useHistory();

  // const handlePassword = (event) => {
  //   setPassword(event.target.value);
  // };

  // const handleEmail = (event) => {
  //   setEmail(event.target.value);
  // };

  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  await axios.post("http://localhost:4000/login", { email, password }),
    function (req, res) {
      console.log(res);
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      if (res.LoginPage) {
        const token = res.data.token;
        localStorage.setItem("jwt", token);
        history.pushState("/dashboard");
        //  getDashboard();
      }
    };

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
      <form>
        <div className="email">
          <label for="email">Enter Email: </label>
          <input type="email" name="email" id="email" />
        </div>

        <div className="pass">
          <label for="password">Enter Password: </label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="login">
          <button onClick="login()">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
