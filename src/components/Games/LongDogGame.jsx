import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function LongDogGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('sarvos_dog_highscore') || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const restartGame = useCallback(() => {
    setScore(0);
    setGameOver(false);
    setGameKey(k => k + 1);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    const cols = 20;
    const rows = 20;
    canvas.width = cols * gridSize;
    canvas.height = rows * gridSize;

    let snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    let dir = { x: 1, y: 0 };
    let nextDir = { x: 1, y: 0 };
    let treat = { x: 14, y: 10 };
    let currentScore = 0;
    let animId;
    let active = true;

    const spawnTreat = () => {
      let nx, ny;
      do {
        nx = Math.floor(Math.random() * cols);
        ny = Math.floor(Math.random() * rows);
      } while (snake.some(segment => segment.x === nx && segment.y === ny));
      treat = { x: nx, y: ny };
    };

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code) && dir.y === 0) {
        nextDir = { x: 0, y: -1 }; e.preventDefault();
      } else if (['ArrowDown', 'KeyS'].includes(e.code) && dir.y === 0) {
        nextDir = { x: 0, y: 1 }; e.preventDefault();
      } else if (['ArrowLeft', 'KeyA'].includes(e.code) && dir.x === 0) {
        nextDir = { x: -1, y: 0 }; e.preventDefault();
      } else if (['ArrowRight', 'KeyD'].includes(e.code) && dir.x === 0) {
        nextDir = { x: 1, y: 0 }; e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    let frameCount = 0;
    // Decreased speed: every 10 frames (~6 steps/second) instead of 6 (~10 steps/sec)
    const SPEED_DIVISOR = 10;

    const loop = () => {
      if (!active) return;
      animId = requestAnimationFrame(loop);
      frameCount++;

      if (frameCount % SPEED_DIVISOR === 0) {
        dir = nextDir;
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

        // Wall collision
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
          active = false;
          setGameOver(true);
          return;
        }

        // Self collision
        if (snake.some(s => s.x === head.x && s.y === head.y)) {
          active = false;
          setGameOver(true);
          return;
        }

        snake.unshift(head);

        // Check treat
        if (head.x === treat.x && head.y === treat.y) {
          currentScore += 10;
          setScore(currentScore);
          if (currentScore > highScore) {
            setHighScore(currentScore);
            localStorage.setItem('sarvos_dog_highscore', String(currentScore));
          }
          spawnTreat();
        } else {
          snake.pop();
        }
      }

      // Draw
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid subtle lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j <= rows; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * gridSize);
        ctx.lineTo(canvas.width, j * gridSize);
        ctx.stroke();
      }

      // Draw Bone / Apple Treat
      ctx.fillStyle = '#fef08a';
      ctx.font = '14px sans-serif';
      ctx.fillText('🦴', treat.x * gridSize + 2, treat.y * gridSize + 15);

      // Draw Snake / Long Dog body
      snake.forEach((seg, idx) => {
        if (idx === 0) {
          // Head
          ctx.fillStyle = '#f97316';
          ctx.beginPath();
          ctx.roundRect(seg.x * gridSize + 1, seg.y * gridSize + 1, gridSize - 2, gridSize - 2, 6);
          ctx.fill();

          // Ears / eyes
          ctx.fillStyle = '#c2410c';
          ctx.fillRect(seg.x * gridSize + 4, seg.y * gridSize + 3, 3, 3);
          ctx.fillRect(seg.x * gridSize + 13, seg.y * gridSize + 3, 3, 3);
        } else {
          // Segments
          ctx.fillStyle = idx % 2 === 0 ? '#fb923c' : '#f97316';
          ctx.beginPath();
          ctx.roundRect(seg.x * gridSize + 2, seg.y * gridSize + 2, gridSize - 4, gridSize - 4, 4);
          ctx.fill();
        }
      });
    };

    loop();

    return () => {
      active = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameKey]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, backgroundColor: '#02040a', padding: 12, borderRadius: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', color: '#fde68a', fontSize: 12, fontFamily: 'monospace', fontWeight: 700, padding: '0 4px' }}>
        <span style={{ color: '#22c55e' }}>🐍 RETRO SNAKE</span>
        <span>FOOD: {score / 10}</span>
        <span style={{ color: '#38bdf8' }}>HIGH: {highScore / 10}</span>
      </div>

      <div style={{ position: 'relative', border: '2px solid #ea580c', borderRadius: 4, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
        <canvas ref={canvasRef} style={{ display: 'block' }} />

        {gameOver && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.88)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ffffff', gap: 8, fontFamily: 'monospace', backdropFilter: 'blur(3px)' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#ef4444', margin: 0 }}>COLLISION!</h3>
            <p style={{ fontSize: 12, color: '#d1d5db', margin: 0 }}>Bones Eaten: {score / 10} • Length: {score / 10 + 3}</p>
            <button
              type="button"
              onClick={restartGame}
              className="aqua-btn primary"
              style={{ fontSize: 12, padding: '6px 18px', marginTop: 6 }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace', textAlign: 'center' }}>
        Use Arrow Keys or WASD to navigate. Relaxed, controlled speed.
      </div>
    </div>
  );
}
