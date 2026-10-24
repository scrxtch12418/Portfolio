import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundManager } from '../../utils/soundManager';

const COLS = 10;
const ROWS = 20;

const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: '#00ffea' },
  O: { shape: [[1, 1], [1, 1]], color: '#ffff00' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#bf00ff' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#00ff66' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#ff0040' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#0055ff' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#ffaa00' }
};

const SHAPES = Object.keys(TETROMINOES);

export default function TetrisGame() {
  const [grid, setGrid] = useState(() => Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  const [currentPiece, setCurrentPiece] = useState(null);
  const [piecePos, setPiecePos] = useState({ x: 3, y: 0 });
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const gridRef = useRef(grid);
  gridRef.current = grid;
  const pieceRef = useRef(currentPiece);
  pieceRef.current = currentPiece;
  const posRef = useRef(piecePos);
  posRef.current = piecePos;

  const spawnPiece = useCallback(() => {
    const key = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const p = TETROMINOES[key];
    const initialPos = { x: Math.floor((COLS - p.shape[0].length) / 2), y: 0 };

    // Check collision at spawn (game over)
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[r].length; c++) {
        if (p.shape[r][c] && gridRef.current[initialPos.y + r]?.[initialPos.x + c]) {
          setIsGameOver(true);
          soundManager.playGameOver();
          return null;
        }
      }
    }

    setCurrentPiece(p);
    setPiecePos(initialPos);
    return p;
  }, []);

  const checkCollision = useCallback((shape, pos, currentGrid = gridRef.current) => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const newY = pos.y + r;
          const newX = pos.x + c;
          if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
          if (newY >= 0 && currentGrid[newY][newX]) return true;
        }
      }
    }
    return false;
  }, []);

  const rotate = (matrix) => {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]).reverse());
  };

  const handleRotate = useCallback(() => {
    if (!pieceRef.current || isGameOver || isPaused) return;
    const rotated = rotate(pieceRef.current.shape);
    if (!checkCollision(rotated, posRef.current)) {
      soundManager.playClick();
      setCurrentPiece(prev => ({ ...prev, shape: rotated }));
    }
  }, [checkCollision, isGameOver, isPaused]);

  const handleMove = useCallback((dx) => {
    if (!pieceRef.current || isGameOver || isPaused) return;
    const nextPos = { x: posRef.current.x + dx, y: posRef.current.y };
    if (!checkCollision(pieceRef.current.shape, nextPos)) {
      setPiecePos(nextPos);
    }
  }, [checkCollision, isGameOver, isPaused]);

  const lockPiece = useCallback((piece, pos) => {
    const newGrid = gridRef.current.map(row => [...row]);
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c]) {
          const y = pos.y + r;
          const x = pos.x + c;
          if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
            newGrid[y][x] = piece.color;
          }
        }
      }
    }

    // Check line clears
    let cleared = 0;
    const filteredGrid = newGrid.filter(row => {
      const full = row.every(cell => cell !== 0);
      if (full) cleared++;
      return !full;
    });

    while (filteredGrid.length < ROWS) {
      filteredGrid.unshift(Array(COLS).fill(0));
    }

    if (cleared > 0) {
      soundManager.playScore();
      const points = [0, 100, 300, 500, 800][cleared] || 1000;
      setScore(s => s + points * level);
      setLines(l => {
        const nextLines = l + cleared;
        setLevel(Math.floor(nextLines / 10) + 1);
        return nextLines;
      });
    }

    setGrid(filteredGrid);
    spawnPiece();
  }, [level, spawnPiece]);

  const handleDrop = useCallback(() => {
    if (!pieceRef.current || isGameOver || isPaused) return;
    const nextPos = { x: posRef.current.x, y: posRef.current.y + 1 };
    if (!checkCollision(pieceRef.current.shape, nextPos)) {
      setPiecePos(nextPos);
    } else {
      lockPiece(pieceRef.current, posRef.current);
    }
  }, [checkCollision, lockPiece, isGameOver, isPaused]);

  const handleHardDrop = useCallback(() => {
    if (!pieceRef.current || isGameOver || isPaused) return;
    let y = posRef.current.y;
    while (!checkCollision(pieceRef.current.shape, { x: posRef.current.x, y: y + 1 })) {
      y++;
    }
    lockPiece(pieceRef.current, { x: posRef.current.x, y });
  }, [checkCollision, lockPiece, isGameOver, isPaused]);

  // Keyboard listeners
  useEffect(() => {
    const onKeyDown = (e) => {
      if (["ArrowLeft", "KeyA"].includes(e.code)) {
        e.preventDefault();
        handleMove(-1);
      } else if (["ArrowRight", "KeyD"].includes(e.code)) {
        e.preventDefault();
        handleMove(1);
      } else if (["ArrowDown", "KeyS"].includes(e.code)) {
        e.preventDefault();
        handleDrop();
      } else if (["ArrowUp", "KeyW"].includes(e.code)) {
        e.preventDefault();
        handleRotate();
      } else if (e.code === "Space") {
        e.preventDefault();
        handleHardDrop();
      } else if (e.code === "KeyP") {
        setIsPaused(p => !p);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleMove, handleDrop, handleRotate, handleHardDrop]);

  // Initial spawn & drop timer loop
  useEffect(() => {
    spawnPiece();
  }, [spawnPiece]);

  useEffect(() => {
    if (isGameOver || isPaused) return;
    const speed = Math.max(120, 800 - (level - 1) * 70);
    const timer = setInterval(handleDrop, speed);
    return () => clearInterval(timer);
  }, [handleDrop, level, isGameOver, isPaused]);

  const resetGame = () => {
    playClick();
    setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    setScore(0);
    setLines(0);
    setLevel(1);
    setIsGameOver(false);
    setIsPaused(false);
    spawnPiece();
  };

  // Compose display matrix including falling piece
  const displayGrid = grid.map(row => [...row]);
  if (currentPiece) {
    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[r].length; c++) {
        if (currentPiece.shape[r][c]) {
          const y = piecePos.y + r;
          const x = piecePos.x + c;
          if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
            displayGrid[y][x] = currentPiece.color;
          }
        }
      }
    }
  }

  return (
    <div className="game-viewport">
      <div className="game-hud">
        <span>SCORE: <b>{score}</b></span>
        <span>LINES: <b>{lines}</b></span>
        <span>LVL: <b>{level}</b></span>
      </div>

      <div
        style={{
          position: 'relative',
          width: 220,
          height: 380,
          background: '#090a0f',
          border: '3px solid #444',
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gap: 1
        }}
      >
        {displayGrid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              style={{
                background: cell || '#12131a',
                border: cell ? '1px solid #fff' : 'none',
                boxShadow: cell ? `inset 1px 1px #fff, inset -1px -1px #000` : 'none'
              }}
            />
          ))
        )}

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
            <div style={{ color: '#ff0040', fontFamily: 'var(--os-font-display)', fontSize: 24, fontWeight: 900 }}>
              GAME OVER
            </div>
            <div style={{ color: '#fff', fontSize: 13 }}>Final Score: {score}</div>
            <button className="retro-btn" onClick={resetGame}>PLAY AGAIN</button>
          </div>
        )}
      </div>

      {/* Touch Buttons */}
      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="retro-btn" onClick={() => handleMove(-1)}>◀ Left</button>
        <button className="retro-btn" onClick={handleRotate}>↻ Rotate</button>
        <button className="retro-btn" onClick={() => handleMove(1)}>Right ▶</button>
        <button className="retro-btn" onClick={handleDrop}>▼ Drop</button>
        <button className="retro-btn" onClick={handleHardDrop}>⬇ Fall</button>
      </div>
    </div>
  );
}
