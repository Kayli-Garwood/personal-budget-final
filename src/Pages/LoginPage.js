import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [username, setUserName] = useState({});
  const [password, setPassword] = useState({});
  const history = useHistory();

  const handleUsername = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/login", { username, password })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Already have an account?</h1>
      <h2>Login here!</h2>
      <form onSubmit={handleSubmit}>
        <div className="user">
          <label for="username">Enter Username: </label>
          <input type="text" onChange={handleUsername} />
        </div>

        <div className="pass">
          <label for="password">Enter Password: </label>
          <input type="password" onChange={handlePassword} />
        </div>
        <div className="login">
          <input type="submit" value="Submit!" />
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
