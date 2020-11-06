import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function SignUpPage() {
  
  const [username, setUserName] = useState({})
  const [password, setPassword] = useState({})
  const history = useHistory();

  const handleUsername = (event) => {
    setUserName(event.target.username);
  }

  const handlePassword = (event) => {
    setPassword(event.target.password)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/api/signup', { username, password})
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
       <title>Signup below!</title>
       <form onSubmit = {handleSubmit}>
          <label for="username">Enter Username</label>
          <input type="text" onChange={handleUsername}/>

          <label for="password">Enter Password</label>
          <input type="password" onChange={handlePassword}/>

          <input type = "submit" value="Submit!" onChange={handleSubmit}/>
       </form>
    </div>
  );
}

export default SignUpPage;