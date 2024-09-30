import React, { useState } from "react";
import gamedata from "../../data/GameData";
import Briefing from "../GameFunctions/Briefing";
import { useRotation } from "./RotationContext";

function Missies_nav() {
  const [selectedGameID, setSelectedGameID] = useState(null);
  const { setRotation, isPopupVisible, setIsPopupVisible } = useRotation();
  const [isBriefingVisible, setIsBriefingVisible] = useState(false);

  const gameKeys = Object.keys(gamedata);

  const handleGameClick = (gameID) => {
    setSelectedGameID(gameID);
    setRotation(gamedata[gameID].rotation);
    setIsPopupVisible(true);
    setIsBriefingVisible(false);
  };

  const handleVerderClick = () => {
    setIsPopupVisible(false);
    setIsBriefingVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setIsBriefingVisible(false); // nsure briefing is hidden when closing popup
  };

  return (
    <div className="uitgelichte-missies">
      <div className="lines">
        <hr className="line-yellow-left" />
        <hr className="line-white" />
        <hr className="line-yellow-right" />
      </div>
      <h2>UITGELICHTE MISSIES</h2>
      <div className="uitgelichte-missies_flex">
        {gameKeys.map((key) => {
          const game = gamedata[key];
          return (
            <div className="sprite">
              <div className="spriteOuter" key={key}>
                <button
                  className="spriteInner"
                  onClick={() => handleGameClick(key)}
                >
                  <p>{game.shorthand}</p>
                </button>
              </div>{" "}
            </div>
          );
        })}
      </div>
      {isPopupVisible && selectedGameID && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="gameTitle--H1">{gamedata[selectedGameID].name}</div>
            <img
              src={gamedata[selectedGameID].img}
              alt={gamedata[selectedGameID].imgAlt}
            />
            <p>{gamedata[selectedGameID].beschrijving}</p>
            <div className="gameTitle--H2">Locatie</div>

            {/* je mag die text-black wegdoen, maar ik zet dit gwn voor nu even voor visualisatie :P */}
            <p className="text-black">{gamedata[selectedGameID].locatie}</p>
            <div className="gameTitle--H2">Duur</div>
            <p className="text-black">{gamedata[selectedGameID].duratie}</p>
            <div className="gameTitle--H2">Info</div>
            <p className="text-black">{gamedata[selectedGameID].info}</p>
            <div>
              <button
                onClick={handleVerderClick}
                className="button button-blue"
              >
                Verder
              </button>
              <button onClick={handleClosePopup} className="button button-red">
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}
      {isBriefingVisible && selectedGameID && (
        <Briefing gameID={selectedGameID} />
      )}
    </div>
  );
}

export default Missies_nav;
