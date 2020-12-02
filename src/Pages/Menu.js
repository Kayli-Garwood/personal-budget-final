import React from "react";

import { Link } from "react-router-dom";
import Logout from "./Logout";

function Menu() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/logout">Log out</Link>
            {/* <button onClick={() => Logout}>Logout</button> */}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
