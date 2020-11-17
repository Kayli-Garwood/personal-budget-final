import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [password, setPassword] = useState({});
  const [email, setEmail] = useState({});
  const history = useHistory();

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/login", { email, password })
      .then((res) => {
        history.push("/dashboard");
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
        <div className="email">
          <label for="email">Enter Email: </label>
          <input type="email" onChange={handleEmail} />
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
