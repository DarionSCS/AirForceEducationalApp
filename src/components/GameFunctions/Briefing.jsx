import React from "react";
import gamedata from "../../data/GameData";
import { Link } from "react-router-dom";

export default function Briefing(props) {
  const game = gamedata[props.gameID];

  return (
    <div className="popup-overlay">
      {/* <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 50;
        }
        .popup-content {
          background-color: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
          margin: 0 16px;
        }
        .button {
          padding: 8px 16px;
          border-radius: 4px;
          color: white;
          border: none;
          cursor: pointer;
        }
        .button-blue {
          background-color: #4299e1;
        }
        .button-blue:hover {
          background-color: #3182ce;
        }

        .text-black {
          color: #000;
        }
      `}</style> */}
      <div className="popup-content text-black">
        <p className="text-black">Briefing:</p>
        <p className="text-black">{game.briefing}</p>
        <p className="text-black">Instructies:</p>
        <ul>
          {Object.entries(game.instructies).map(([key, instructie]) => (
            <li key={key}>{instructie}</li>
          ))}
        </ul>
        <Link to={`/missies/${game.shorthand}`}>
          <button className="button button-blue">Start</button>
        </Link>
      </div>
    </div>
  );
}
