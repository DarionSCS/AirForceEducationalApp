import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../../styles/components/_logInOutBtn.css";

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <button className="Log-in-out__btn" onClick={() => logout()}>
        Sign out
      </button>
    )
  );
}

export default LogoutButton;
