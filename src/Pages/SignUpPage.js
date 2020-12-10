import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function SignUpPage() {
  const [username, setUserName] = useState({});
  const [password, setPassword] = useState({});
  const [email, setEmail] = useState({});
  const history = useHistory();

  const handleUsername = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/register", { email, username, password })
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Don't have an account?</h1>
      <h2>Sign up here!</h2>
      <form onSubmit={handleSubmit}>
        <div className="email">
          <label for="email">Enter Email: </label>
          <input type="email" onChange={handleEmail} />
        </div>
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

export default SignUpPage;
