import React from 'react';
import { useState } from 'react';

function Button() {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleButton = () => {
      setIsOpen(!isOpen);
      console.log(isOpen);
    };
  
    const toggleProfile = () => {
      setProfileOpen(!isProfileOpen);
    };
  
    return (
      <div className="outer-profileButton">
          <button onClick={toggleProfile} className="profileButton">
          {" "}
          </button>
      </div>
    )
}

export default Button