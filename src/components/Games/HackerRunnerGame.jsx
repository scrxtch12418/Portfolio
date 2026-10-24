import React, { useState, useEffect, useRef } from 'react';
import { soundManager } from '../../utils/soundManager';
import VirtualGamepad from './VirtualGamepad';

export default function HackerRunnerGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const stateRef = useRef({
    dinoY: 142,
    dinoVelocity: 0,
    dinoJumping: false,
    obstacles: [],
    gameScore: 0,
    gameFrame: 0,
    speedMultiplier: 1,
    running: true
  });

  const jump = () => {
    const s = stateRef.current;
    if (s.running && !s.dinoJumping) {
      s.dinoVelocity = -11;
      s.dinoJumping = true;
      soundManager.playClick();
    }
  };

  const resetGame = () => {
    stateRef.current = {
      dinoY: 142,
      dinoVelocity: 0,
      dinoJumping: false,
      obstacles: [],
      gameScore: 0,
      gameFrame: 0,
      speedMultiplier: 1,
      running: true
    };
    setScore(0);
    setIsGameOver(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    let animId;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const s = stateRef.current;
      if (s.running) {
        // Clear
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, 600, 200);

        // Floor
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 170);
        ctx.lineTo(600, 170);
        ctx.stroke();

        // Floor perspective grid lines
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 1;
        for (let i = 0; i < 680; i += 40) {
          ctx.beginPath();
          ctx.moveTo(i, 170);
          ctx.lineTo(i - 60, 200);
          ctx.stroke();
        }

        // Player physics
        s.dinoVelocity += 0.65;
        s.dinoY += s.dinoVelocity;
        if (s.dinoY >= 142) {
          s.dinoY = 142;
          s.dinoVelocity = 0;
          s.dinoJumping = false;
        }

        // Draw Player box
        ctx.fillStyle = '#00ffea';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.fillRect(50, s.dinoY, 24, 28);
        ctx.strokeRect(50, s.dinoY, 24, 28);

        // Player face dots
        ctx.fillStyle = '#000';
        ctx.fillRect(56, s.dinoY + 6, 4, 4);
        ctx.fillRect(64, s.dinoY + 6, 4, 4);

        // Spawn obstacles
        s.gameFrame++;
        if (s.gameFrame % 90 === 0) {
          s.obstacles.push({
            x: 600,
            width: 14 + Math.random() * 12,
            height: 20 + Math.random() * 24,
            color: Math.random() < 0.5 ? '#ff0040' : '#ff6200',
            passed: false
          });
        }

        if (s.gameFrame % 300 === 0) {
          s.speedMultiplier += 0.15;
        }

        // Obstacles
        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const obs = s.obstacles[i];
          obs.x -= 5 * s.speedMultiplier;

          ctx.fillStyle = obs.color;
          ctx.beginPath();
          ctx.moveTo(obs.x, 170);
          ctx.lineTo(obs.x + obs.width / 2, 170 - obs.height);
          ctx.lineTo(obs.x + obs.width, 170);
          ctx.closePath();
          ctx.fill();

          // Collision check
          if (obs.x < 74 && obs.x + obs.width > 50 && s.dinoY + 28 > 170 - obs.height) {
            s.running = false;
            setIsGameOver(true);
            soundManager.playGameOver();
            return;
          }

          // Score
          if (obs.x < 45 && !obs.passed) {
            obs.passed = true;
            s.gameScore++;
            setScore(s.gameScore);
            soundManager.playScore();
          }

          if (obs.x < -40) {
            s.obstacles.splice(i, 1);
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="game-viewport">
      <div className="game-hud">
        <span>GEOMETRY DASH • SCORE: <b>{score}</b></span>
        <button className="retro-btn" onClick={jump}>JUMP (SPACE / CLICK)</button>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 600 }}>
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          onClick={jump}
          onTouchStart={(e) => {
            e.preventDefault();
            jump();
          }}
          style={{
            display: 'block',
            maxWidth: '100%',
            height: 'auto',
            background: '#050505',
            cursor: 'pointer',
            border: '2px solid #00ffea',
            borderRadius: 6,
            touchAction: 'none'
          }}
        />

        {isGameOver && (
          <div
            style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12
          }}
        >
            <div style={{ color: '#ff0040', fontFamily: 'var(--os-font-display)', fontSize: 26, fontWeight: 900, textShadow: '0 0 10px rgba(255,0,64,0.6)' }}>
              GAME OVER
            </div>
            <div style={{ color: '#fff', fontSize: 13 }}>Final Score: {score}</div>
            <button className="retro-btn" onClick={resetGame}>PLAY AGAIN</button>
          </div>
        )}
      </div>

      {/* Retro Arcade JUMP Action Control */}
      <VirtualGamepad
        showDpad={false}
        actions={[
          { id: 'jump', label: '▲', sublabel: 'JUMP', color: 'red', onClick: jump }
        ]}
        onReset={resetGame}
        resetLabel="Restart"
      />

      <div style={{ marginTop: 8, fontSize: 11, color: '#888', textAlign: 'center' }}>
        Tap canvas, hit the Jump button, or press Spacebar / Up Arrow to leap over obstacles!
      </div>
    </div>
  );
}
