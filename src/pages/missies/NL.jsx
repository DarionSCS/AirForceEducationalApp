import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CHANGE_XP, GET_XP } from "../../graphQL/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";


const NL = () => {
  const { user } = useAuth0();
  const [airplanes, setAirplanes] = useState([]); // array of airplane objects
  const [gameOver, setGameOver] = useState(false); // boolean to indicate game over
  const [userWon, setUserWon] = useState(false);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const radarRef = useRef(null);
  const spawnInterval = 500; // spawn new airplane every x s
  const [spawnCounter, setSpawnCounter] = useState(0);

  const { data: xpData, loading: xpLoading, error: xpError } = useQuery(GET_XP, {
    variables: { auth0_user_id: user?.sub },
  });

  const [changeXp] = useMutation(CHANGE_XP, {
    refetchQueries: [
      { query: GET_XP, variables: { auth0_user_id: user?.sub } },
    ],
    awaitRefetchQueries: true,
  });

  // check to see if the new airplane is at a safe distance from other airplanes
  const isSafeDistance = (x, y, airplanes, minDistance) => {
    for (let airplane of airplanes) {
      let dx = airplane.x - x;
      let dy = airplane.y - y;
      if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
        return false;
      }
    }
    return true;
  };

  // this is so the red airplanes don't collide with each other (since they cant change direction)
  const willCollideInFuture = (newAirplane, airplanes) => {
    const futureSteps = 500; // how far into the future we check
    const stepSize = 1; // step size in pixels

    for (let step = 0; step < futureSteps; step++) {
      let futureX =
        newAirplane.x +
        Math.cos((newAirplane.direction * Math.PI) / 180) * stepSize * step; // calculate future x position
      let futureY =
        newAirplane.y +
        Math.sin((newAirplane.direction * Math.PI) / 180) * stepSize * step; // calculate future y position

      for (let airplane of airplanes) {
        if (airplane.borderColor === "red") {
          // only check for red airplanes, because they cant rotate
          let airplaneFutureX =
            airplane.x +
            Math.cos((airplane.direction * Math.PI) / 180) * stepSize * step;
          let airplaneFutureY =
            airplane.y +
            Math.sin((airplane.direction * Math.PI) / 180) * stepSize * step;

          let dx = futureX - airplaneFutureX;
          let dy = futureY - airplaneFutureY;

          if (Math.sqrt(dx * dx + dy * dy) < 20) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const addAirplane = () => {
    if (airplanes.length < 10) {
      let newAirplane;
      let attempts = 0;
      const maxAttempts = 50;

      do {
        const borderColor = Math.random() > 0.5 ? "orange" : "red";
        newAirplane = {
          id: Math.random(),
          x: Math.random() * 300 + 10, // spawn within radar bounds
          y: Math.random() * 300 + 10, // spawn within radar bounds
          direction: Math.random() * 360,
          borderColor,
        };
        attempts++;
      } while (
        (!isSafeDistance(newAirplane.x, newAirplane.y, airplanes, 40) ||
          (newAirplane.borderColor === "red" &&
            willCollideInFuture(newAirplane, airplanes))) &&
        attempts < maxAttempts
      );

      if (attempts < maxAttempts) {
        setAirplanes((prevAirplanes) => [...prevAirplanes, newAirplane]);
      }
    }
  };

  const moveAirplanes = () => {
    setAirplanes((prevAirplanes) =>
      prevAirplanes
        .map((airplane) => {
          let newX =
            airplane.x + Math.cos((airplane.direction * Math.PI) / 180) * 1; // smaller increments
          let newY =
            airplane.y + Math.sin((airplane.direction * Math.PI) / 180) * 1; // smaller increments

          // Remove airplanes that go out of radar bounds
          if (newX < 0 || newX > 400 || newY < 0 || newY > 400) {
            return null;
          }

          return { ...airplane, x: newX, y: newY };
        })
        .filter((airplane) => airplane !== null)
    );
  };

  const handleAirplaneClick = (id) => {
    setAirplanes((prevAirplanes) =>
      prevAirplanes.map((airplane) =>
        airplane.id === id && airplane.borderColor === "orange"
          ? { ...airplane, direction: airplane.direction + 90 }
          : airplane
      )
    );
  };

  const detectCollisions = async () => {
    let collisionDetected = false;
    for (let i = 0; i < airplanes.length; i++) {
      for (let j = i + 1; j < airplanes.length; j++) {
        let dx = airplanes[i].x - airplanes[j].x;
        let dy = airplanes[i].y - airplanes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 20) {
          collisionDetected = true;
          break;
        }
      }
      if (collisionDetected) break;
    }

    if (collisionDetected) {
      setGameOver(true);

      try {
        if (!xpLoading && xpData) {
          const currentXp = xpData.speler.xp;
          const xpToGet = timer * 10;
          await changeXp({
            variables: { auth0_user_id: user.sub, xp: currentXp + xpToGet }
          })
        } 
      } catch (err) {
        console.error("Error updating XP: ", err);  
      }
    }
  };

  useEffect(() => {
    if (gameOver || !started) return;

    const interval = setInterval(() => {
      moveAirplanes();
      detectCollisions();
      setSpawnCounter((prevCounter) => {
        if (prevCounter >= spawnInterval / 50) {
          addAirplane();
          return 0;
        }
        return prevCounter + 1;
      });
    }, 50); // shorter interval for smoother animation
    return () => clearInterval(interval);
  }, [gameOver, airplanes, started]);

  useEffect(() => {
    if (!started || gameOver) return;

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [started, gameOver]);

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className="NL-container">
      <style>
        {`
          .NL-container {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #1a1a1a;
            flex-direction: column;
          }
          .game-over {
            color: white;
            font-size: 3rem;
          }
          .radar {
            position: relative;
            width: 400px;
            height: 400px;
            background-color: #0a0a0a;
            border-radius: 50%;
            border: 2px solid white;
            overflow: hidden;
          }
          .radar::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
              0deg,
              transparent,
              transparent 19px,
              rgba(255, 255, 255, 0.1) 20px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 19px,
              rgba(255, 255, 255, 0.1) 20px
            ),
            radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
            background-size: 20px 20px, 20px 20px, 20px 20px;
            transform: translate(-50%, -50%);
          }
          .sweep {
            position: absolute;
            width: 100%;
            height: 100%;
            background: conic-gradient(from 90deg at 50% 50%, transparent 0%, rgba(255, 255, 255, 0.2) 25%, transparent 50%);
            animation: sweep 2s linear infinite;
            border-radius: 50%;
          }
          @keyframes sweep {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .airplane {
            position: absolute;
            width: 20px;
            height: 20px;
            cursor: pointer;
          }
          .border-orange {
            border: 2px solid orange;
          }
          .border-red {
            border: 2px solid red;
          }
          .start-button {
            margin-bottom: 20px;
            padding: 10px 20px;
            font-size: 1.2rem;
            color: white;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .timer {
            color: white;
            font-size: 1.5rem;
            margin-bottom: 10px;
          }
        `}
      </style>
      {!started ? (
        <button className="start-button" onClick={handleStart}>
          Start Game
        </button>
      ) : (
        <>
          <div className="timer">Timer: {timer}s</div>
          {gameOver ? (
          <div className="game-over">
            <p>Game Over</p>
            <Link to="/">Ga terug</Link>
          </div>
          
          ) : (
            <div ref={radarRef} className="radar">
              <div className="sweep"></div>
              {airplanes.map((airplane) => (
                <img
                  key={airplane.id}
                  src="/assets/images/airplane.png"
                  alt="Airplane"
                  onClick={() => handleAirplaneClick(airplane.id)}
                  className={`airplane ${
                    airplane.borderColor === "orange"
                      ? "border-orange"
                      : "border-red"
                  }`}
                  style={{
                    left: `${airplane.x}px`,
                    top: `${airplane.y}px`,
                    transform: `rotate(${airplane.direction + 45}deg)`,
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NL;
