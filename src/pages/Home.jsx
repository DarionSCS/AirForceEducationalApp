import React from "react";
import { useState, Suspense } from "react";
import "../styles/main.css";
import MissieSelectiePopup from "../components/GameFunctions/MissieSelectiePopup";

import Earth from "../components/home/NewCustomSphere";
//import Dot from "../components/Dot";
import Missies_nav from "../components/home/Missies_nav";
import Profiel from "./profiel/Profiel";
import { RotationProvider } from "../components/home/RotationContext";
import Button from "../components/profiel/Button";

import AuthenticationButton from "../components/authentication/AuthenticationButton";

export default function Home() {
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
    <div>
      {isProfileOpen ? null : <Button toggle={toggleProfile} />}
      <MissieSelectiePopup gameID="NL" />

      <div
        className={`home-overlay container ${isProfileOpen ? "shifted" : ""}`}
      >
        <div className={`profile-panel ${isProfileOpen ? "open" : "hidden"}`}>
          <Profiel toggleProfile={toggleProfile} />
        </div>
        <RotationProvider>
          <Earth />
          <Missies_nav />
        </RotationProvider>
      </div>
    </div>
  );
}
