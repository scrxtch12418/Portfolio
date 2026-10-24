import React, { useEffect, useRef, useState, useCallback } from 'react';
import { soundManager } from '../../utils/soundManager';
import VirtualGamepad from './VirtualGamepad';

// Level layout templates (1 = normal brick, 2 = durable 2-hit brick, 0 = empty)
const LEVEL_LAYOUTS = [
  // Level 1: Classic Rows
  {
    name: 'Level 1: Classic Rows',
    speed: 2.8,
    paddleW: 75,
    rows: [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1]
    ]
  },
  // Level 2: Pyramid
  {
    name: 'Level 2: Space Pyramid',
    speed: 3.1,
    paddleW: 70,
    rows: [
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 2, 1, 1, 0],
      [1, 1, 1, 2, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1]
    ]
  },
  // Level 3: Dual Pillars
  {
    name: 'Level 3: Twin Fortresses',
    speed: 3.4,
    paddleW: 68,
    rows: [
      [2, 1, 0, 0, 0, 1, 2],
      [2, 1, 1, 0, 1, 1, 2],
      [1, 2, 1, 0, 1, 2, 1],
      [1, 1, 2, 1, 2, 1, 1],
      [1, 0, 1, 2, 1, 0, 1]
    ]
  },
  // Level 4: Space Shield
  {
    name: 'Level 4: Cyber Shield',
    speed: 3.7,
    paddleW: 65,
    rows: [
      [1, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 1],
      [0, 1, 2, 1, 2, 1, 0],
      [0, 0, 1, 2, 1, 0, 0]
    ]
  },
  // Level 5: Boss Vault
  {
    name: 'Level 5: Master Vault',
    speed: 4.0,
    paddleW: 60,
    rows: [
      [2, 2, 2, 2, 2, 2, 2],
      [2, 1, 1, 2, 1, 1, 2],
      [2, 1, 2, 2, 2, 1, 2],
      [2, 1, 1, 2, 1, 1, 2],
      [2, 2, 2, 2, 2, 2, 2]
    ]
  }
];

const ROW_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

export default function BricklowGame() {
  const canvasRef = useRef(null);
  const movePaddleDeltaRef = useRef(null);
  const [score, setScore] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [levelNotice, setLevelNotice] = useState('Level 1: Classic Rows');
  const [gameKey, setGameKey] = useState(0);

  const restartGame = useCallback(() => {
    setScore(0);
    setLevelIndex(0);
    setLives(3);
    setGameOver(false);
    setGameWon(false);
    setLevelNotice(LEVEL_LAYOUTS[0].name);
    setGameKey(k => k + 1);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 400;
    canvas.height = 480;

    let curLevel = 0;
    let cfg = LEVEL_LAYOUTS[0];

    let paddleW = cfg.paddleW;
    let paddleH = 12;
    let paddleX = (canvas.width - paddleW) / 2;

    let ballX = canvas.width / 2;
    let ballY = canvas.height - 45;
    let currentSpeed = cfg.speed;
    let ballDx = currentSpeed * 0.75 * (Math.random() > 0.5 ? 1 : -1);
    let ballDy = -currentSpeed;
    let ballRadius = 6;

    let currentLives = 3;
    let currentScore = 0;
    let rightPressed = false;
    let leftPressed = false;
    let animId;
    let active = true;

    // Build bricks for this level
    const bCols = 7;
    const bW = 48;
    const bH = 15;
    const bPadding = 7;
    const bOffsetTop = 45;
    const bOffsetLeft = 12;

    let bricks = [];
    const buildLevelBricks = (lvlIdx) => {
      const layout = LEVEL_LAYOUTS[lvlIdx].rows;
      bricks = [];
      for (let c = 0; c < bCols; c++) {
        bricks[c] = [];
        for (let r = 0; r < layout.length; r++) {
          const type = layout[r][c] || 0;
          bricks[c][r] = {
            status: type > 0 ? type : 0,
            maxHits: type,
            color: type === 2 ? '#94a3b8' : ROW_COLORS[r % ROW_COLORS.length]
          };
        }
      }
    };

    buildLevelBricks(curLevel);

    const handleKeyDown = (e) => {
      if (['ArrowRight', 'KeyD'].includes(e.code)) rightPressed = true;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) leftPressed = true;
    };
    const handleKeyUp = (e) => {
      if (['ArrowRight', 'KeyD'].includes(e.code)) rightPressed = false;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) leftPressed = false;
    };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = Math.max(0, Math.min(relativeX - paddleW / 2, canvas.width - paddleW));
      }
    };

    const movePaddleDelta = (delta) => {
      paddleX = Math.max(0, Math.min(paddleX + delta, canvas.width - paddleW));
    };
    movePaddleDeltaRef.current = movePaddleDelta;

    const handleTouch = (e) => {
      if (e.touches && e.touches.length > 0) {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const scale = canvas.width / rect.width;
        const relativeX = touchX * scale;
        paddleX = Math.max(0, Math.min(relativeX - paddleW / 2, canvas.width - paddleW));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchstart', handleTouch, { passive: false });
    canvas.addEventListener('touchmove', handleTouch, { passive: false });

    const resetBall = () => {
      ballX = canvas.width / 2;
      ballY = canvas.height - 45;
      ballDx = currentSpeed * 0.75 * (Math.random() > 0.5 ? 1 : -1);
      ballDy = -currentSpeed;
      paddleX = (canvas.width - paddleW) / 2;
    };

    const nextLevel = () => {
      if (curLevel + 1 < LEVEL_LAYOUTS.length) {
        curLevel += 1;
        setLevelIndex(curLevel);
        cfg = LEVEL_LAYOUTS[curLevel];
        paddleW = cfg.paddleW;
        currentSpeed = cfg.speed;
        setLevelNotice(cfg.name);
        setTimeout(() => setLevelNotice(''), 2000);
        buildLevelBricks(curLevel);
        resetBall();
      } else {
        active = false;
        setGameWon(true);
      }
    };

    const loop = () => {
      if (!active) return;
      animId = requestAnimationFrame(loop);

      ctx.fillStyle = '#0a0f1d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render subtle background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }

      // Check and render bricks
      let remaining = 0;
      for (let c = 0; c < bCols; c++) {
        for (let r = 0; r < bricks[c]?.length; r++) {
          const b = bricks[c][r];
          if (b.status > 0) {
            remaining++;
            const brickX = c * (bW + bPadding) + bOffsetLeft;
            const brickY = r * (bH + bPadding) + bOffsetTop;

            // Ball collision
            if (
              ballX + ballRadius > brickX &&
              ballX - ballRadius < brickX + bW &&
              ballY + ballRadius > brickY &&
              ballY - ballRadius < brickY + bH
            ) {
              ballDy = -ballDy;
              b.status -= 1;
              currentScore += b.maxHits > 1 ? 40 : 20;
              setScore(currentScore);
              soundManager.playTone(b.maxHits > 1 ? 640 : 480, 'square', 0.04, 0, 0.05);

              // Flash color if damaged
              if (b.status === 1 && b.maxHits === 2) {
                b.color = '#f59e0b';
              }
            }

            // Draw brick
            ctx.fillStyle = b.color;
            ctx.beginPath();
            ctx.roundRect(brickX, brickY, bW, bH, 3);
            ctx.fill();

            // Bevel & border
            ctx.strokeStyle = 'rgba(255,255,255,0.4)';
            ctx.lineWidth = 1;
            ctx.strokeRect(brickX, brickY, bW, bH);

            if (b.maxHits === 2 && b.status === 2) {
              // Silver rivet design
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(brickX + 4, brickY + 6, 3, 3);
              ctx.fillRect(brickX + bW - 7, brickY + 6, 3, 3);
            }
          }
        }
      }

      // Level Complete Check
      if (remaining === 0) {
        currentScore += 200;
        setScore(currentScore);
        soundManager.playGameWin();
        nextLevel();
        return;
      }

      // Ball Wall Bounces
      if (ballX + ballDx > canvas.width - ballRadius || ballX + ballDx < ballRadius) {
        ballDx = -ballDx;
      }
      if (ballY + ballDy < ballRadius + 30) {
        ballDy = -ballDy;
      } else if (ballY + ballDy > canvas.height - ballRadius - paddleH - 12) {
        // Paddle collision check
        if (ballX > paddleX - 5 && ballX < paddleX + paddleW + 5) {
          // Angle modifier depending on where ball hits paddle
          const hitOffset = (ballX - (paddleX + paddleW / 2)) / (paddleW / 2);
          ballDx = hitOffset * currentSpeed * 1.1;
          ballDy = -Math.abs(ballDy);
          soundManager.playBounce();
        } else if (ballY + ballDy > canvas.height - ballRadius) {
          // Missed paddle
          currentLives -= 1;
          setLives(currentLives);
          if (currentLives <= 0) {
            active = false;
            setGameOver(true);
            soundManager.playGameOver();
            return;
          } else {
            soundManager.playTone(220, 'sawtooth', 0.16, 0, 0.08);
            resetBall();
          }
        }
      }

      // Move paddle with keys
      if (rightPressed && paddleX < canvas.width - paddleW) {
        paddleX += 6;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 6;
      }

      // Move Ball
      ballX += ballDx;
      ballY += ballDy;

      // Draw Paddle (Glossy Aqua Style)
      const padGrad = ctx.createLinearGradient(paddleX, canvas.height - 24, paddleX, canvas.height - 12);
      padGrad.addColorStop(0, '#38bdf8');
      padGrad.addColorStop(0.5, '#0284c7');
      padGrad.addColorStop(1, '#0369a1');
      ctx.fillStyle = padGrad;
      ctx.beginPath();
      ctx.roundRect(paddleX, canvas.height - 24, paddleW, paddleH, 6);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw Ball
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
    };

    loop();

    return () => {
      active = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchstart', handleTouch);
      canvas.removeEventListener('touchmove', handleTouch);
    };
  }, [gameKey]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, backgroundColor: '#02040a', padding: 12, borderRadius: 6 }}>
      {/* Top HUD */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', color: '#ffffff', fontSize: 12, fontFamily: 'monospace', fontWeight: 700, padding: '0 4px' }}>
        <span style={{ color: '#38bdf8' }}>🧱 BRICK BREAKER</span>
        <span>LEVEL {levelIndex + 1}/5</span>
        <span style={{ color: '#facc15' }}>SCORE: {score}</span>
        <span style={{ color: '#ef4444' }}>{'❤️'.repeat(Math.max(0, lives))}</span>
      </div>

      <div style={{ position: 'relative', border: '2px solid #0284c7', borderRadius: 4, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.6)', touchAction: 'none' }}>
        <canvas ref={canvasRef} style={{ display: 'block', cursor: 'none', maxWidth: '100%', height: 'auto' }} />

        {/* Level notice banner */}
        {levelNotice && !gameOver && !gameWon && (
          <div style={{ position: 'absolute', top: 15, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(2,132,199,0.85)', color: '#fff', padding: '4px 14px', borderRadius: 12, fontSize: 11, fontWeight: 700, fontFamily: 'monospace', whiteSpace: 'nowrap', pointerEvents: 'none', animation: 'fadeIn 0.2s' }}>
            {levelNotice}
          </div>
        )}

        {gameOver && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.88)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ffffff', gap: 8, fontFamily: 'monospace', backdropFilter: 'blur(3px)' }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#ef4444', margin: 0 }}>GAME OVER</h3>
            <p style={{ fontSize: 12, color: '#d1d5db', margin: 0 }}>Reached Level {levelIndex + 1} • Score: {score}</p>
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

        {gameWon && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.88)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ffffff', gap: 8, fontFamily: 'monospace', backdropFilter: 'blur(3px)' }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#22c55e', margin: 0 }}>VICTORY!</h3>
            <p style={{ fontSize: 12, color: '#d1d5db', margin: 0 }}>All 5 Levels Cleared! Final Score: {score}</p>
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

      {/* Retro Arcade Virtual Paddle Controller */}
      <VirtualGamepad
        showDpad={true}
        horizontalOnly={true}
        onLeft={() => movePaddleDeltaRef.current?.(-24)}
        onRight={() => movePaddleDeltaRef.current?.(24)}
        onReset={restartGame}
        resetLabel="Restart"
      />

      <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace', textAlign: 'center' }}>
        Drag finger directly on screen, or use Left/Right Paddle buttons or Arrow Keys!
      </div>
    </div>
  );
}
