import React from "react";

function Button({ toggle }) {
  return (
    <div className="profile-wrapper">
      <div className="outer-profileButton">
        <button onClick={toggle} className="profileButton">
          {" "}
        </button>
      </div>
    </div>
  );
}

export default Button;
