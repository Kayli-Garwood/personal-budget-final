import React from "react";

function Logout() {
  
  localStorage.clear();
  window.location.reload();
  window.location.href = "/login";

  return (
    <div>

    </div>
  );
}

export default Logout;
