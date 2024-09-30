import React, { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CHANGE_XP, GET_XP } from "../../graphQL/queries";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

const Game = () => {
  const canvasRef = useRef(null);
  const { user } = useAuth0();

  const { data: xpData, loading: xpLoading, error: xpError } = useQuery(GET_XP, {
    variables: { auth0_user_id: user?.sub },
  });

  const [changeXp] = useMutation(CHANGE_XP, {
    refetchQueries: [{ query: GET_XP, variables: { auth0_user_id: user?.sub } }],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Load images
    const planeImage = new Image();
    const obstacleImage = new Image();
    planeImage.src = "/assets/images/jet.png"; // Ensure this path is correct
    obstacleImage.src = "/assets/images/rocket.png"; // Ensure this path is correct

    // Game variables
    const plane = {
      width: 100,
      height: 100,
      x: canvas.width / 2 - 50,
      y: canvas.height - 150,
      row: 2, // Start in the middle row (0 to 3)
      speed: 5,
    };
    const keys = {};
    const circles = [];
    const obstacles = [];
    let score = 0;
    let gameSpeed = 2;
    let gameOver = false;
    let lastCircleTime = 0;
    let lastObstacleTime = 0;
    const minCircleInterval = 1000; // Minimum interval between circle spawns in milliseconds
    const minObstacleInterval = 1500; // Minimum interval between obstacle spawns in milliseconds

    // Event listeners for key presses
    document.addEventListener("keydown", (e) => (keys[e.key] = true));
    document.addEventListener("keyup", (e) => (keys[e.key] = false));

    // Main game loop
    function gameLoop(timestamp) {
      if (!gameOver) {
        if (!lastCircleTime) lastCircleTime = timestamp;
        if (!lastObstacleTime) lastObstacleTime = timestamp;
        update(timestamp);
        draw();
        requestAnimationFrame(gameLoop);
      } else {
        drawGameOver();
      }
    }

    // Update game state
    function update(timestamp) {
      const rows = [
        canvas.width / 5 - plane.width / 2,
        (canvas.width / 5) * 2 - plane.width / 2,
        (canvas.width / 5) * 3 - plane.width / 2,
        (canvas.width / 5) * 4 - plane.width / 2,
      ];
      
      // Handle plane movement between rows
      if (keys["ArrowLeft"] && plane.row > 0) {
        plane.row -= 1;
        keys["ArrowLeft"] = false;
      }
      if (keys["ArrowRight"] && plane.row < 3) {
        plane.row += 1;
        keys["ArrowRight"] = false;
      }
      plane.x = rows[plane.row];

      // Move circles and check for collisions
      for (let i = circles.length - 1; i >= 0; i--) {
        circles[i].y += gameSpeed;

        // Check if plane goes through the circle
        if (
          circles[i].row === plane.row &&
          circles[i].y + circles[i].radius > plane.y &&
          circles[i].y < plane.y + plane.height
        ) {
          score += 10;
          circles.splice(i, 1);
        } else if (circles[i].y - circles[i].radius > canvas.height) {
          // Remove circles that are off-screen
          circles.splice(i, 1);
        }
      }

      // Move obstacles and check for collisions
      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].y += gameSpeed;

        // Check if plane collides with obstacle
        if (
          obstacles[i].row === plane.row &&
          obstacles[i].y + obstacles[i].radius > plane.y &&
          obstacles[i].y < plane.y + plane.height
        ) {
          gameOver = true;
        } else if (obstacles[i].y - obstacles[i].radius > canvas.height) {
          // Remove obstacles that are off-screen
          obstacles.splice(i, 1);
        }
      }

      // Add new circles at intervals
      if (timestamp - lastCircleTime > minCircleInterval) {
        const row = Math.floor(Math.random() * 4);
        circles.push({
          x: rows[row] + plane.width / 2,
          y: -40,
          radius: 40,
          row,
        });
        lastCircleTime = timestamp;
      }

      // Add new obstacles at intervals
      if (timestamp - lastObstacleTime > minObstacleInterval) {
        const row = Math.floor(Math.random() * 4);
        obstacles.push({
          x: rows[row] + plane.width / 2,
          y: -40,
          radius: 40,
          row,
        });
        lastObstacleTime = timestamp;
      }

      // Increase game speed over time
      gameSpeed += 0.001;
    }

    // Draw the game
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw circles
      circles.forEach((circle) => {
        drawCircle(ctx, circle.x, circle.y, circle.radius);
      });

      // Draw obstacles
      obstacles.forEach((obstacle) => {
        ctx.drawImage(
          obstacleImage,
          obstacle.x - obstacle.radius,
          obstacle.y - obstacle.radius,
          obstacle.radius * 2,
          obstacle.radius * 2
        );
      });

      // Draw plane
      ctx.drawImage(planeImage, plane.x, plane.y, plane.width, plane.height);

      // Draw score
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${score}`, 10, 30);
    }

    // Draw Game Over screen
    async function drawGameOver() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
      ctx.font = "20px Arial";
      ctx.fillText(
        `Final Score: ${score}`,
        canvas.width / 2 - 50,
        canvas.height / 2 + 40
      );

      try {
        if (!xpLoading && xpData) {
          const currentXp = xpData.speler.xp;
          await changeXp({
            variables: {
              auth0_user_id: user?.sub,
              xp: currentXp + score,
            },
          });
        }
      } catch (err) {
        console.error("Error updating xp: ", err);
      }
    }

    // Ensure images are loaded before starting game
    planeImage.onload = () => {
      obstacleImage.onload = () => {
        gameLoop();
      };
    };

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Function to draw a 3D-looking circle with a transparent middle
  function drawCircle(ctx, x, y, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(0, 255, 0, 0.7)";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, radius - 10, 0, Math.PI * 2, true);
    ctx.clip();
    ctx.clearRect(x - radius, y - radius, radius * 2, radius * 2);
    ctx.restore();
  }

  return <canvas ref={canvasRef}></canvas>;
};

export default Game;
