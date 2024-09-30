import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <button className="Log-in-out__btn" onClick={() => loginWithRedirect()}>
        Sign in
      </button>
    )
  );
}

export default LoginButton;
