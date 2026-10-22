import React, { useEffect, useRef } from 'react';

export default function AquaMatrixMode({ onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+-/<>~';
    const charArray = chars.split('');
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -height / fontSize);
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = '#bbf7d0';
        ctx.fillText(text, x, y);

        ctx.fillStyle = '#22c55e';
        ctx.fillText(charArray[Math.floor(Math.random() * charArray.length)], x, y - fontSize);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#000000',
        cursor: 'pointer',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24
      }}
      title="Click or press Esc to exit"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />

      {/* Header Badge */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '6px 16px',
          borderRadius: 20,
          backgroundColor: 'rgba(0,0,0,0.85)',
          border: '1px solid rgba(34, 197, 94, 0.5)',
          color: '#4ade80',
          fontFamily: 'monospace',
          fontSize: 11,
          letterSpacing: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.8)'
        }}
      >
        • SYSTEM OVERRIDE: MATRIX STREAM ACTIVE •
      </div>

      {/* Exit prompt */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '8px 20px',
          borderRadius: 8,
          backgroundColor: 'rgba(0,0,0,0.9)',
          border: '1px solid rgba(34, 197, 94, 0.6)',
          color: '#86efac',
          fontFamily: 'monospace',
          fontSize: 13,
          letterSpacing: 1,
          boxShadow: '0 0 24px rgba(34, 197, 94, 0.35)'
        }}
      >
        [ CLICK ANYWHERE OR PRESS ESC TO EXIT ]
      </div>
    </div>
  );
}
