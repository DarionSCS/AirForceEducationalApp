import React, { useState, useEffect, useCallback } from "react";
import styles from "../../styles/components/_ontwijkspel.css";
import { useMutation, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { CHANGE_XP, GET_XP } from '../../graphQL/queries';
import { Link } from "react-router-dom";

export default function DE() {
  const [enemies, setEnemies] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(60);
  const [userWon, setUserWon] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const { user } = useAuth0();

  const { data: xpData, loading: xpLoading, error: xpError } = useQuery(GET_XP, {
    variables: { auth0_user_id: user?.sub },
  });

  const [changeXp] = useMutation(CHANGE_XP, {
    refetchQueries: [
      { query: GET_XP, variables: { auth0_user_id: user?.sub } }
    ],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    let countdown;
    if (isStarted && !isPaused) {
      countdown = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            handleTimeUp();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [isStarted, isPaused]);

  const spawnEnemy = () => {
    let x, y;
    do {
      x = Math.random() * 90 + 5;
      y = Math.random() * 90 + 5;
    } while (Math.sqrt((x - 50) ** 2 + (y - 50) ** 2) < 16.67);
    return { id: Date.now(), x, y };
  };

  useEffect(() => {
    if (isPaused || isGameOver || !isStarted) return;

    const interval = setInterval(() => {
      setEnemies(prevEnemies => [
        ...prevEnemies,
        spawnEnemy()
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, isGameOver, isStarted]);

  const handleEnemyClick = (id) => {
    setEnemies(prevEnemies => prevEnemies.filter(enemy => enemy.id !== id));
  };

  const moveEnemies = useCallback(() => {
    setEnemies(prevEnemies =>
      prevEnemies.map(enemy => {
        const dx = 50 - enemy.x;
        const dy = 50 - enemy.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = 1;
        return {
          ...enemy,
          x: enemy.x + (dx / dist) * speed,
          y: enemy.y + (dy / dist) * speed,
        };
      })
    );
  }, []);

  const checkCollisions = useCallback(() => {
    enemies.forEach(enemy => {
      if (enemy.x >= 45 && enemy.x <= 55 && enemy.y >= 45 && enemy.y <= 55) {
        setIsGameOver(true);
      }
    });
  }, [enemies]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && !isGameOver && isStarted) {
        moveEnemies();
        checkCollisions();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [moveEnemies, checkCollisions, isPaused, isGameOver, isStarted]);

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleTimeUp = async () => {
    if (!isGameOver) {
      setUserWon(true);
      setIsGameOver(true); // Zorg ervoor dat het spel stopt
      try {
        if (!xpLoading && xpData) {
          const currentXp = xpData.speler.xp;
          await changeXp({
            variables: { auth0_user_id: user.sub, xp: currentXp + 75 },
          });
        }
      } catch (err) {
        console.error("Error updating xp:", err);
      }
    }
  }

  const handleStart = () => {
    setIsStarted(true);
    setIsPaused(false);
    setIsGameOver(false);
    setEnemies([]);
    setTimer(60);
    setUserWon(false);
  };

  const handleRetry = () => {
    handleStart();
  };

  if (xpLoading) return <p>Loading...</p>;
  if (xpError) return <p>Error loading XP: {xpError.message}</p>;

  return (
    <div className="game">
      <div className="header">
        <div className="timer">{timer}</div>
        <button className="pauseButton" onClick={handlePause}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        {!isStarted && <button className="startButton" onClick={handleStart}>Start</button>}
        {isGameOver && <button className="retry-button" onClick={handleRetry}>Retry</button>}
      </div>
      <div className="map">
        <div className="center-object"></div>
        {enemies.map(enemy => (
          <Enemy key={enemy.id} enemy={enemy} onClick={() => handleEnemyClick(enemy.id)} />
        ))}
      </div>
      {isGameOver && !userWon && <div className="game-over">Mission Failed</div>}
      {userWon && <div className="game-won">
        <p>Mission Successful!</p>
        <Link to="/">Ga terug</Link>
      </div>}
    </div>
  );
}

const Enemy = ({ enemy, onClick }) => {
  return (
    <div
      className="enemy"
      style={{ top: `${enemy.y}%`, left: `${enemy.x}%` }}
      onClick={onClick}
    ></div>
  );
};


// const styles = {
//   game: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     width: '100%',
//     padding: '10px',
//   },
//   timer: {
//     fontSize: '24px',
//     backgroundColor: '#f0f0f0',
//   },
//   pauseButton: {
//     padding: '10px',
//     fontSize: '16px',
//   },
//   startButton: {
//     padding: '10px',
//     fontSize: '16px',
//     marginLeft: '10px',
//   },
//   retryButton: {
//     padding: '10px',
//     fontSize: '16px',
//     marginLeft: '10px',
//   },
//   map: {
//     position: 'relative',
//     width: '600px',
//     height: '600px',
//     backgroundImage: 'url(/assets/images/topview.png)', // replace with your image path
//     border: '2px solid #000',
//     marginTop: '20px',
//   },
//   centerObject: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     width: '50px',
//     height: '50px',
//     backgroundColor: 'green',
//     transform: 'translate(-50%, -50%)',
//   },
//   enemy: {
//     position: 'absolute',
//     width: '30px',
//     height: '30px',
//     backgroundColor: 'red',
//     cursor: 'pointer',
//   },
//   gameOver: {
//     marginTop: '20px',
//     fontSize: '32px',
//     color: 'red',
//   },
//   gameWon: {
//     marginTop: '20px',
//     fontSize: '32px',
//     color: 'green',
//   },
// };
