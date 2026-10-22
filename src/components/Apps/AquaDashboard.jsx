import React, { useState, useEffect } from 'react';

export default function AquaDashboard({ isOpen, onClose }) {
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcPrev, setCalcPrev] = useState(null);
  const [calcOp, setCalcOp] = useState(null);
  const [stickyNote, setStickyNote] = useState(
    "Welcome to Sarvasva's Aqua OS!\n\n• Pentester & Full Stack Engineer\n• Explore my projects in the Dock\n• Play retro games in the Arcade\n• Click clock for the Matrix Rain\n• Double-click desktop folders"
  );
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const handleCalcNum = (num) => {
    setCalcDisplay(prev => (prev === '0' ? String(num) : prev + num));
  };

  const handleCalcOp = (op) => {
    setCalcPrev(parseFloat(calcDisplay));
    setCalcOp(op);
    setCalcDisplay('0');
  };

  const handleCalcEquals = () => {
    if (calcPrev === null || !calcOp) return;
    const current = parseFloat(calcDisplay);
    let res = 0;
    if (calcOp === '+') res = calcPrev + current;
    if (calcOp === '-') res = calcPrev - current;
    if (calcOp === '×') res = calcPrev * current;
    if (calcOp === '÷') res = current !== 0 ? calcPrev / current : 'Error';
    setCalcDisplay(String(res));
    setCalcPrev(null);
    setCalcOp(null);
  };

  const handleCalcClear = () => {
    setCalcDisplay('0');
    setCalcPrev(null);
    setCalcOp(null);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99990,
        backgroundColor: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        userSelect: 'none'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 900,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
          padding: 10
        }}
      >
        {/* Widget 1: World Clock */}
        <div
          style={{
            background: 'linear-gradient(to bottom, #262626, #171717)',
            borderRadius: 16,
            padding: 20,
            color: '#ffffff',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: '50%',
              border: '3px solid #9ca3af',
              backgroundColor: 'rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)'
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 700, fontFamily: 'monospace' }}>
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span style={{ fontSize: 10, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>
              {time.toLocaleTimeString([], { second: '2-digit' })}s
            </span>
          </div>
          <span style={{ marginTop: 12, fontSize: 13, fontWeight: 600 }}>World Clock</span>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>Karnataka, India</span>
        </div>

        {/* Widget 2: Calculator */}
        <div
          style={{
            background: 'linear-gradient(to bottom, #2e2e2e, #1a1a1a)',
            borderRadius: 16,
            padding: 16,
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10
          }}
        >
          <div
            style={{
              backgroundColor: '#0a0a0a',
              borderRadius: 6,
              padding: '6px 12px',
              textAlign: 'right',
              fontFamily: 'monospace',
              fontSize: 20,
              color: '#4ade80',
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden'
            }}
          >
            {calcDisplay}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, flex: 1 }}>
            <button type="button" onClick={handleCalcClear} style={{ background: '#ef4444', color: '#fff', borderRadius: 4, padding: 8, border: 'none', cursor: 'pointer', fontWeight: 700 }}>C</button>
            <button type="button" onClick={() => handleCalcOp('÷')} style={{ background: '#d97706', color: '#fff', borderRadius: 4, padding: 8, border: 'none', cursor: 'pointer', fontWeight: 700 }}>÷</button>
            <button type="button" onClick={() => handleCalcOp('×')} style={{ background: '#d97706', color: '#fff', borderRadius: 4, padding: 8, border: 'none', cursor: 'pointer', fontWeight: 700 }}>×</button>
            <button type="button" onClick={() => handleCalcOp('-')} style={{ background: '#d97706', color: '#fff', borderRadius: 4, padding: 8, border: 'none', cursor: 'pointer', fontWeight: 700 }}>-</button>

            {[7, 8, 9].map(n => (
              <button key={n} type="button" onClick={() => handleCalcNum(n)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 4, padding: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}>{n}</button>
            ))}
            <button type="button" onClick={() => handleCalcOp('+')} style={{ background: '#d97706', color: '#fff', borderRadius: 4, padding: 8, border: 'none', cursor: 'pointer', fontWeight: 700 }}>+</button>

            {[4, 5, 6].map(n => (
              <button key={n} type="button" onClick={() => handleCalcNum(n)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 4, padding: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}>{n}</button>
            ))}
            <button type="button" onClick={handleCalcEquals} style={{ background: '#2563eb', color: '#fff', borderRadius: 4, padding: 8, border: 'none', cursor: 'pointer', fontWeight: 700, gridRow: 'span 2' }}>=</button>

            {[1, 2, 3].map(n => (
              <button key={n} type="button" onClick={() => handleCalcNum(n)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 4, padding: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}>{n}</button>
            ))}

            <button type="button" onClick={() => handleCalcNum(0)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 4, padding: 8, border: 'none', cursor: 'pointer', fontWeight: 600, gridColumn: 'span 2' }}>0</button>
            <button type="button" onClick={() => handleCalcNum('.')} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 4, padding: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}>.</button>
          </div>
        </div>

        {/* Widget 3: Sticky Note */}
        <div
          style={{
            backgroundColor: '#fef08a',
            color: '#1f2937',
            borderRadius: 16,
            padding: 16,
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            border: '1px solid #fde047',
            display: 'flex',
            flexDirection: 'column',
            transform: 'rotate(1deg)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #facc15', paddingBottom: 6, fontSize: 11, fontWeight: 700, color: '#854d0e' }}>
            <span>📌 Operator Stickies</span>
            <span style={{ fontWeight: 400 }}>Auto-saved</span>
          </div>
          <textarea
            value={stickyNote}
            onChange={(e) => setStickyNote(e.target.value)}
            style={{
              width: '100%',
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 12,
              lineHeight: 1.5,
              marginTop: 8,
              resize: 'none',
              fontFamily: 'inherit',
              color: '#1f2937'
            }}
            rows={7}
          />
        </div>
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="aqua-btn"
        style={{
          position: 'fixed',
          bottom: 24,
          padding: '6px 20px',
          fontSize: 12,
          backgroundColor: 'rgba(255,255,255,0.2)',
          color: '#ffffff',
          borderColor: 'rgba(255,255,255,0.4)',
          cursor: 'pointer'
        }}
      >
        ✕ Close Dashboard
      </button>
    </div>
  );
}
