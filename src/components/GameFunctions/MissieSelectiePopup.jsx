import React, { useState } from "react";
import gamedata from "../../data/GameData.js";
import Briefing from "./Briefing.jsx";

// This component is not used in the current version of the application and instead I modified the Missies_nav component to display the game information in a popup.
const MissieSelectiePopup = ({ gameID }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isBriefingVisible, setBriefingVisible] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(true);
  const game = gamedata[gameID];

  return (
    <div>
{/*       {isButtonVisible && (
        <button
          onClick={() => {
            setIsVisible(true);
            setButtonVisible(false);
          }}
        >
          Missie Selectie
        </button>
      )}
      {isVisible && (
        <div
          id="missieSelectiePopup"
          style={{ display: isVisible ? "block" : "none" }}
        >
          <div className="popup-content">
            <div className="gameTitle--H1">{game.name}</div>
            <img src="https://via.placeholder.com/150" alt="game image" />
            <p>{game.beschrijving}</p>
            <div className="gameTitle--H2">Locatie</div>
            <p>{game.locatie}</p>
            <div className="gameTitle--H2">Duur</div>
            <p>{game.duratie}</p>
            <div className="gameTitle--H2">Info</div>
            <p>{game.info}</p>
          </div>
          <button
            onClick={() => {
              setBriefingVisible(true);
              setIsVisible(false);
            }}
          >
            Verder
          </button>
        </div>
      )}
      {isBriefingVisible && <Briefing gameID={gameID} />} */}
    </div>
  );
};

export default MissieSelectiePopup;
