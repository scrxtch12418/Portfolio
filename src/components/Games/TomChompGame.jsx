import React, { useEffect, useRef, useState, useCallback } from 'react';
import { soundManager } from '../../utils/soundManager';
import VirtualGamepad from './VirtualGamepad';

const TILE_SIZE = 20;
const COLS = 19;
const ROWS = 21;

// 1 = Wall, 0 = Dot (10 pts), 3 = Power Pellet (50 pts, frightens ghosts), 2 = Empty Path
const MAZE_TEMPLATE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 2, 1, 1, 1, 0, 1, 1, 1, 1],
  [2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2],
  [1, 1, 1, 1, 0, 1, 2, 1, 1, 2, 1, 1, 2, 1, 0, 1, 1, 1, 1],
  [2, 2, 2, 2, 0, 2, 2, 1, 2, 2, 2, 1, 2, 2, 0, 2, 2, 2, 2],
  [1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1],
  [2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2],
  [1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 3, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 3, 1],
  [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

export default function TomChompGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return parseInt(localStorage.getItem('sarvos_pacman_highscore') || '1420', 10);
      }
    } catch {}
    return 1420;
  });
  const highScoreRef = useRef(highScore);
  highScoreRef.current = highScore;
  const [gameOver, setGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  // Direction handler ref for external buttons
  const inputDirRef = useRef({ dx: 0, dy: 0 });

  const restartGame = useCallback(() => {
    setScore(0);
    setGameOver(false);
    setIsWon(false);
    inputDirRef.current = { dx: 0, dy: 0 };
    setGameKey(k => k + 1);
  }, []);

  const handleSetDirection = (dx, dy) => {
    inputDirRef.current = { dx, dy };
  };

  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 18) {
      handleSetDirection(dx > 0 ? 1 : -1, 0);
    } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 18) {
      handleSetDirection(0, dy > 0 ? 1 : -1);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = COLS * TILE_SIZE;
    canvas.height = ROWS * TILE_SIZE;

    // Deep clone maze template
    const maze = MAZE_TEMPLATE.map(row => [...row]);

    // Speed 2 divides evenly into TILE_SIZE (20) for 100% exact alignment
    const SPEED = 2;

    let player = {
      x: 9 * TILE_SIZE + 10,
      y: 16 * TILE_SIZE + 10,
      dirX: 0,
      dirY: 0,
      desiredDirX: 0,
      desiredDirY: 0,
      mouthAngle: 0.25,
      mouthSpeed: 0.04,
      mouthClosing: false
    };

    let ghosts = [
      { x: 9 * TILE_SIZE + 10, y: 8 * TILE_SIZE + 10, dirX: 1, dirY: 0, color: '#ef4444', homeX: 9, homeY: 8, respawnTimer: 0 },
      { x: 8 * TILE_SIZE + 10, y: 10 * TILE_SIZE + 10, dirX: -1, dirY: 0, color: '#06b6d4', homeX: 8, homeY: 10, respawnTimer: 0 },
      { x: 10 * TILE_SIZE + 10, y: 10 * TILE_SIZE + 10, dirX: 1, dirY: 0, color: '#f97316', homeX: 10, homeY: 10, respawnTimer: 0 }
    ];

    let frightenedTimer = 0;
    let currentScore = 0;
    let animId;
    let active = true;
    let pulseCount = 0;

    const canMove = (col, row) => {
      if (row < 0 || row >= ROWS) return true; // wrap tunnel
      if (col < 0 || col >= COLS) return true; // wrap tunnel
      return maze[row] && maze[row][col] !== 1;
    };

    const handleKeyDown = (e) => {
      const code = e.code || '';
      const key = (e.key || '').toLowerCase();
      let dx = 0, dy = 0;

      if (['arrowup', 'w'].includes(key) || ['arrowup', 'keyw'].includes(code.toLowerCase())) {
        dx = 0; dy = -1; e.preventDefault();
      } else if (['arrowdown', 's'].includes(key) || ['arrowdown', 'keys'].includes(code.toLowerCase())) {
        dx = 0; dy = 1; e.preventDefault();
      } else if (['arrowleft', 'a'].includes(key) || ['arrowleft', 'keya'].includes(code.toLowerCase())) {
        dx = -1; dy = 0; e.preventDefault();
      } else if (['arrowright', 'd'].includes(key) || ['arrowright', 'keyd'].includes(code.toLowerCase())) {
        dx = 1; dy = 0; e.preventDefault();
      } else {
        return;
      }

      inputDirRef.current = { dx, dy };
    };

    window.addEventListener('keydown', handleKeyDown);

    const gameLoop = () => {
      if (!active) return;
      animId = requestAnimationFrame(gameLoop);
      pulseCount++;

      if (frightenedTimer > 0) {
        frightenedTimer--;
      }

      // Read external input
      const input = inputDirRef.current;
      if (input.dx !== 0 || input.dy !== 0) {
        player.desiredDirX = input.dx;
        player.desiredDirY = input.dy;

        // Instant 180 reverse in corridor
        if (input.dx === -player.dirX && input.dy === -player.dirY) {
          player.dirX = input.dx;
          player.dirY = input.dy;
        }
      }

      // --- 1. Pac-Man Logic ---
      const isAtTileCenter = (player.x % TILE_SIZE === 10) && (player.y % TILE_SIZE === 10);
      const tileCol = Math.floor(player.x / TILE_SIZE);
      const tileRow = Math.floor(player.y / TILE_SIZE);

      if (isAtTileCenter) {
        // Can we turn to desired direction?
        if (player.desiredDirX !== 0 || player.desiredDirY !== 0) {
          if (canMove(tileCol + player.desiredDirX, tileRow + player.desiredDirY)) {
            player.dirX = player.desiredDirX;
            player.dirY = player.desiredDirY;
          }
        }

        // Check if forward movement is blocked by wall
        if (player.dirX !== 0 || player.dirY !== 0) {
          if (!canMove(tileCol + player.dirX, tileRow + player.dirY)) {
            player.dirX = 0;
            player.dirY = 0;
          }
        }

        // Eat dot / power pellet
        if (maze[tileRow] && maze[tileRow][tileCol] === 0) {
          maze[tileRow][tileCol] = 2;
          currentScore += 10;
          setScore(currentScore);
          soundManager.playChomp(true);
          if (currentScore > highScoreRef.current) {
            highScoreRef.current = currentScore;
            setHighScore(currentScore);
            try {
              localStorage.setItem('sarvos_pacman_highscore', String(currentScore));
            } catch {}
          }
        } else if (maze[tileRow] && maze[tileRow][tileCol] === 3) {
          maze[tileRow][tileCol] = 2;
          currentScore += 50;
          setScore(currentScore);
          frightenedTimer = 380; // ~6.5 seconds
          soundManager.playTone(880, 'triangle', 0.12, 0, 0.1);
        }
      }

      // Advance Pac-Man
      player.x += player.dirX * SPEED;
      player.y += player.dirY * SPEED;

      // Tunnel wrapping
      if (player.x < -10) player.x = COLS * TILE_SIZE + 10;
      if (player.x > COLS * TILE_SIZE + 10) player.x = -10;

      // Mouth animation
      if (player.dirX !== 0 || player.dirY !== 0) {
        if (player.mouthClosing) {
          player.mouthAngle -= player.mouthSpeed;
          if (player.mouthAngle <= 0.02) player.mouthClosing = false;
        } else {
          player.mouthAngle += player.mouthSpeed;
          if (player.mouthAngle >= 0.32) player.mouthClosing = true;
        }
      }

      // --- 2. Ghosts Logic & AI ---
      ghosts.forEach(g => {
        if (g.respawnTimer > 0) {
          g.respawnTimer--;
          return;
        }

        const isGhostAtCenter = (g.x % TILE_SIZE === 10) && (g.y % TILE_SIZE === 10);
        const gCol = Math.floor(g.x / TILE_SIZE);
        const gRow = Math.floor(g.y / TILE_SIZE);

        if (isGhostAtCenter) {
          const validDirs = [
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 }
          ].filter(d => canMove(gCol + d.dx, gRow + d.dy));

          // Filter out 180 reverse unless in dead end
          const forwardDirs = validDirs.filter(d => !(d.dx === -g.dirX && d.dy === -g.dirY));
          const choices = forwardDirs.length > 0 ? forwardDirs : validDirs;

          if (choices.length > 0) {
            if (frightenedTimer > 0) {
              // Run away from player or wander
              choices.sort((a, b) => {
                const distA = Math.hypot((gCol + a.dx) * TILE_SIZE - player.x, (gRow + a.dy) * TILE_SIZE - player.y);
                const distB = Math.hypot((gCol + b.dx) * TILE_SIZE - player.x, (gRow + b.dy) * TILE_SIZE - player.y);
                return distB - distA; // furthest away
              });
              g.dirX = choices[0].dx;
              g.dirY = choices[0].dy;
            } else if (Math.random() < 0.75) {
              // Target player
              choices.sort((a, b) => {
                const distA = Math.hypot((gCol + a.dx) * TILE_SIZE - player.x, (gRow + a.dy) * TILE_SIZE - player.y);
                const distB = Math.hypot((gCol + b.dx) * TILE_SIZE - player.x, (gRow + b.dy) * TILE_SIZE - player.y);
                return distA - distB;
              });
              g.dirX = choices[0].dx;
              g.dirY = choices[0].dy;
            } else {
              const pick = choices[Math.floor(Math.random() * choices.length)];
              g.dirX = pick.dx;
              g.dirY = pick.dy;
            }
          }
        }

        const gSpeed = frightenedTimer > 0 ? 1 : SPEED;
        g.x += g.dirX * gSpeed;
        g.y += g.dirY * gSpeed;

        // Tunnel wrapping
        if (g.x < -10) g.x = COLS * TILE_SIZE + 10;
        if (g.x > COLS * TILE_SIZE + 10) g.x = -10;

        // Collision with Pac-Man
        const dist = Math.hypot(g.x - player.x, g.y - player.y);
        if (dist < 13) {
          if (frightenedTimer > 0) {
            // Eat ghost
            currentScore += 200;
            setScore(currentScore);
            g.x = g.homeX * TILE_SIZE + 10;
            g.y = g.homeY * TILE_SIZE + 10;
            g.dirX = 0;
            g.dirY = -1;
            g.respawnTimer = 120; // 2s pause
            soundManager.playTone(950, 'sawtooth', 0.1, 0, 0.09);
          } else {
            // Player dies
            active = false;
            setGameOver(true);
            soundManager.playGameOver();
          }
        }
      });

      // --- 3. Draw Screen ---
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let dotsRemaining = 0;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const val = maze[r][c];
          if (val === 1) {
            ctx.fillStyle = '#1e3a8a';
            ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 1;
            ctx.strokeRect(c * TILE_SIZE + 1, r * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
          } else if (val === 0) {
            dotsRemaining++;
            ctx.fillStyle = '#fef08a';
            ctx.beginPath();
            ctx.arc(c * TILE_SIZE + 10, r * TILE_SIZE + 10, 2.5, 0, Math.PI * 2);
            ctx.fill();
          } else if (val === 3) {
            dotsRemaining++;
            const pulse = (Math.sin(pulseCount * 0.15) + 1) * 1.5;
            ctx.fillStyle = '#facc15';
            ctx.beginPath();
            ctx.arc(c * TILE_SIZE + 10, r * TILE_SIZE + 10, 5 + pulse, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      if (dotsRemaining === 0 && currentScore > 0) {
        active = false;
        setIsWon(true);
        soundManager.playGameWin();
      }

      // Draw Pac-Man
      let baseAngle = 0;
      if (player.dirX === 1) baseAngle = 0;
      else if (player.dirX === -1) baseAngle = Math.PI;
      else if (player.dirY === 1) baseAngle = Math.PI / 2;
      else if (player.dirY === -1) baseAngle = -Math.PI / 2;

      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(
        player.x,
        player.y,
        TILE_SIZE / 2 - 1,
        baseAngle + player.mouthAngle * Math.PI,
        baseAngle + (2 - player.mouthAngle) * Math.PI
      );
      ctx.lineTo(player.x, player.y);
      ctx.fill();

      // Eye
      const eyeX = player.x + Math.cos(baseAngle - Math.PI / 3) * 5;
      const eyeY = player.y + Math.sin(baseAngle - Math.PI / 3) * 5;
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Draw Ghosts
      ghosts.forEach(g => {
        if (g.respawnTimer > 0) return;
        const isFrightened = frightenedTimer > 0;
        const gColor = isFrightened ? (frightenedTimer < 90 && pulseCount % 12 < 6 ? '#ffffff' : '#2563eb') : g.color;

        ctx.fillStyle = gColor;
        ctx.beginPath();
        ctx.arc(g.x, g.y - 1, TILE_SIZE / 2 - 2, Math.PI, 0, false);
        ctx.lineTo(g.x + TILE_SIZE / 2 - 2, g.y + TILE_SIZE / 2 - 2);

        // Tentacles
        const footW = (TILE_SIZE - 4) / 3;
        ctx.lineTo(g.x + TILE_SIZE / 2 - 2 - footW * 0.5, g.y + TILE_SIZE / 2 - 5);
        ctx.lineTo(g.x + TILE_SIZE / 2 - 2 - footW, g.y + TILE_SIZE / 2 - 2);
        ctx.lineTo(g.x + TILE_SIZE / 2 - 2 - footW * 1.5, g.y + TILE_SIZE / 2 - 5);
        ctx.lineTo(g.x + TILE_SIZE / 2 - 2 - footW * 2, g.y + TILE_SIZE / 2 - 2);
        ctx.lineTo(g.x - TILE_SIZE / 2 + 2, g.y + TILE_SIZE / 2 - 2);
        ctx.closePath();
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(g.x - 3, g.y - 2, 2.5, 0, Math.PI * 2);
        ctx.arc(g.x + 3, g.y - 2, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = isFrightened ? '#facc15' : '#1e3a8a';
        ctx.beginPath();
        ctx.arc(g.x - 3 + g.dirX * 1.2, g.y - 2 + g.dirY * 1.2, 1.2, 0, Math.PI * 2);
        ctx.arc(g.x + 3 + g.dirX * 1.2, g.y - 2 + g.dirY * 1.2, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    gameLoop();

    return () => {
      active = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameKey]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, backgroundColor: '#02040a', padding: '10px 14px', borderRadius: 6, userSelect: 'none' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', color: '#ffffff', fontSize: 12, fontFamily: 'monospace', fontWeight: 700, padding: '0 4px' }}>
        <span style={{ color: '#facc15', display: 'flex', alignItems: 'center', gap: 4 }}>
          🟡 PAC-MAN
        </span>
        <span>SCORE: {score}</span>
        <span style={{ color: '#38bdf8' }}>HIGH: {highScore}</span>
      </div>

      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ position: 'relative', border: '2px solid #2563eb', borderRadius: 4, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.6)', touchAction: 'none' }}
      >
        <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />

        {gameOver && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ffffff', gap: 8, fontFamily: 'monospace', backdropFilter: 'blur(3px)' }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#ef4444', margin: 0 }}>GAME OVER</h3>
            <p style={{ fontSize: 12, color: '#d1d5db', margin: 0 }}>Final Score: {score}</p>
            <button
              type="button"
              onClick={restartGame}
              className="aqua-btn primary"
              style={{ fontSize: 12, padding: '6px 18px', marginTop: 6, cursor: 'pointer' }}
            >
              Play Again
            </button>
          </div>
        )}

        {isWon && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ffffff', gap: 8, fontFamily: 'monospace', backdropFilter: 'blur(3px)' }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#facc15', margin: 0 }}>YOU WIN!</h3>
            <p style={{ fontSize: 12, color: '#d1d5db', margin: 0 }}>Level Cleared! Score: {score}</p>
            <button
              type="button"
              onClick={restartGame}
              className="aqua-btn primary"
              style={{ fontSize: 12, padding: '6px 18px', marginTop: 6, cursor: 'pointer' }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Retro Arcade Virtual Gamepad */}
      <VirtualGamepad
        onUp={() => handleSetDirection(0, -1)}
        onDown={() => handleSetDirection(0, 1)}
        onLeft={() => handleSetDirection(-1, 0)}
        onRight={() => handleSetDirection(1, 0)}
        onReset={restartGame}
        resetLabel="Reset"
      />

      <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace', textAlign: 'center' }}>
        Swipe on screen, use Arrow Keys / WASD, or tap the Virtual D-Pad to steer!
      </div>
    </div>
  );
}
