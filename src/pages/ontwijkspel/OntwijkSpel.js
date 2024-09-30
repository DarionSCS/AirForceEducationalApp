import React, { useState, useEffect, useCallback } from 'react';
import "../../styles/components/_ontwijkspel.css";

export default function OntwijkSpel() {
  const [enemies, setEnemies] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(60);
  const [userWon, setUserWon] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    let countdown;
    if (isStarted && !isPaused) {
      countdown = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
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
    } while (Math.sqrt((x - 50) ** 2 + (y - 50) ** 2) < 16.67); // Ensure enemy is at least 100px away from the center
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
        const speed = 0.5; // Adjust the speed as necessary
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

  const handleTimeUp = () => {
    if (!isGameOver) {
      alert('Mission Successful!');
      setUserWon(true);
    }
  };

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

  return (
    <div>
      <div>
        <div>{timer}</div>
        <button onClick={handlePause}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        {!isStarted && <button onClick={handleStart}>Start</button>}
        {isGameOver && <button onClick={handleRetry}>Retry</button>}
      </div>
      <div>
        <div></div>
        <Soldier position="top-left" />
        <Soldier position="top-right" />
        <Soldier position="bottom-left" />
        <Soldier position="bottom-right" />
        {enemies.map(enemy => (
          <Enemy key={enemy.id} enemy={enemy} onClick={() => handleEnemyClick(enemy.id)} />
        ))}
      </div>
      {isGameOver && <div>Mission Failed</div>}
    </div>
  );
}

const Enemy = ({ enemy, onClick }) => {
  return (
    <div
      onClick={onClick}
    ></div>
  );
};

const Soldier = ({ position }) => {
  const positions = {
    'top-left': { top: '10%', left: '10%' },
    'top-right': { top: '10%', right: '10%' },
    'bottom-left': { bottom: '10%', left: '10%' },
    'bottom-right': { bottom: '10%', right: '10%' },
  };

  return <div ></div>;
};

