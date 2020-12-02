import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

function Logout() {
  // const [loggedOut, setLoggedOut] = useState(false);

  // const logout = () => {
  //   localStorage.removeItem("jwt");
  //   setLoggedOut(true);
  // };

  // if (loggedOut) {
  //   return <Redirect to="/" push={true} />;
  // }

  localStorage.clear();
  window.location.reload();
  window.location.href = "/";

  return (
    <div className="logout">
      <h1>Logout here!</h1>

      <Button onClick={Logout}>LogOut</Button>
    </div>
  );
}

export default Logout;
