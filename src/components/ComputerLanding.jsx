import React, { useRef, useState } from 'react';
import { soundManager } from '../utils/soundManager';

// Exact CRT screen bounding box ratios of the new retro workstation computer (251, 165, 410, 313 in 1024x1024)
const SCREEN_BOUNDS = {
  left: 251 / 1024,
  top: 165 / 1024,
  width: 410 / 1024,
  height: 313 / 1024
};

export default function ComputerLanding({ onEnter, theme = 'light', onToggleTheme }) {
  const imgRef = useRef(null);
  const [zoomProps, setZoomProps] = useState(null);
  const [isEntering, setIsEntering] = useState(false);

  const isLight = theme === 'light';

  const handleClick = () => {
    if (isEntering) return;
    setIsEntering(true);
    soundManager.playLogon();

    const d = imgRef.current;
    const f = window.innerWidth;
    const h = window.innerHeight;
    let m = 8;
    let p = 0;
    let v = 0;
    let b = '50% 45%';

    if (d) {
      const A = d.getBoundingClientRect();
      const C = A.left + SCREEN_BOUNDS.left * A.width;
      const M = A.top + SCREEN_BOUNDS.top * A.height;
      const j = SCREEN_BOUNDS.width * A.width;
      const O = SCREEN_BOUNDS.height * A.height;

      if (j > 1 && O > 1) {
        const _ = C + j / 2;
        const H = M + O / 2;
        const U = f < 768;
        const Q = U ? 1.55 : 1.12;
        const I = Math.max(f / j, h / O) * Q;

        if (Number.isFinite(I) && I > 1) {
          m = I;
          b = `${_}px ${H}px`;
          if (!U) {
            p = f / 2 - _;
            v = h / 2 - H;
          }
        }
      }
    }

    setZoomProps({ scale: m, x: p, y: v, origin: b });

    // Complete the zoom animation and notify parent to unmount landing overlay
    setTimeout(() => {
      onEnter?.();
    }, 1650);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#3b386e',
        backgroundImage: "url('/images/intro_bg.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isEntering ? 'default' : 'pointer',
        userSelect: 'none',
        overflow: 'hidden',
        transformOrigin: zoomProps?.origin ?? '50% 45%',
        transform: isEntering && zoomProps
          ? `translate3d(${zoomProps.x}px, ${zoomProps.y}px, 0) scale(${zoomProps.scale})`
          : 'translate3d(0, 0, 0) scale(1)',
        opacity: isEntering ? 0 : 1,
        transition: isEntering
          ? 'transform 1.7s cubic-bezier(0.7, 0, 0.16, 1), opacity 0.55s ease-in-out 1.15s'
          : 'opacity 0.4s ease-out',
        pointerEvents: isEntering ? 'none' : 'auto',
        willChange: 'transform, opacity'
      }}
      role="banner"
      aria-label="Click computer to enter Sarvasva's portfolio"
    >
      {/* Top Floating Theme Switcher */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 24,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleTheme?.();
          }}
          title={isLight ? 'Desktop Theme: Light (Click to switch to Dark)' : 'Desktop Theme: Dark (Click to switch to Light)'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '7px 14px',
            borderRadius: 20,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            userSelect: 'none'
          }}
        >
          <span style={{ fontSize: 14 }}>{isLight ? '☀️' : '🌙'}</span>
          <span>{isLight ? 'Aqua Light' : 'Aqua Dark'}</span>
        </button>
      </div>

      {/* Soft Radial Ambient Spotlight Glow tuned to intro_bg */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 55% at 50% 65%, rgba(216, 180, 254, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* The Retro Workstation Computer Image with authentic CRT screen overlay */}
      <div style={{ position: 'relative', zIndex: 10, display: 'inline-flex' }}>
        <img
          ref={imgRef}
          src="/images/retro_computer.webp"
          alt="Retro Workstation Computer"
          draggable={false}
          style={{
            height: 'min(78vh, 740px)',
            maxWidth: '94vw',
            aspectRatio: '1 / 1',
            objectFit: 'contain',
            filter: 'drop-shadow(0 24px 48px rgba(18, 12, 45, 0.55)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.35))',
            pointerEvents: 'none'
          }}
        />

        {/* Razor-Sharp CRT Screen Overlay — Perfectly Fitted into Monitor Bezel */}
        <div
          style={{
            position: 'absolute',
            left: `${SCREEN_BOUNDS.left * 100}%`,
            top: `${SCREEN_BOUNDS.top * 100}%`,
            width: `${SCREEN_BOUNDS.width * 100}%`,
            height: `${SCREEN_BOUNDS.height * 100}%`,
            borderRadius: '8px',
            overflow: 'hidden',
            pointerEvents: 'none',
            boxShadow: 'inset 0 0 16px rgba(0,0,0,0.65), inset 0 2px 4px rgba(0,0,0,0.85)',
            backgroundImage: 'url(/images/aqua-wallpaper.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Lucida Grande", "Segoe UI", Roboto, sans-serif'
          }}
        >
          {/* Screen Content Surface (Top menubar removed as requested) */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {/* Desktop Icons on Right (Neat vertical column, zoomed out) */}
            <div
              style={{
                position: 'absolute',
                top: '6%',
                right: '3.5%',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'center',
                zIndex: 2
              }}
            >
              {[
                { icon: '👤' },
                { icon: '💼' },
                { icon: '🎨' },
                { icon: '🕹️' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  <div style={{ width: 16, height: 16, backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                    {item.icon}
                  </div>
                  <div style={{ width: 10, height: 2, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 1 }} />
                </div>
              ))}
            </div>

            {/* Window 1: About Sarvasva (Zoomed out, soft lines, matching original) */}
            <div
              style={{
                position: 'absolute',
                left: '7%',
                top: '7%',
                width: '30%',
                height: '44%',
                backgroundColor: '#ffffff',
                borderRadius: '5px',
                border: '1px solid rgba(0,0,0,0.25)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex: 4
              }}
            >
              {/* Titlebar */}
              <div
                style={{
                  height: '14px',
                  background: 'linear-gradient(#fafafa, #e0e0e0)',
                  borderBottom: '1px solid #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 5px',
                  gap: '3px'
                }}
              >
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#28c840' }} />
                <span style={{ flex: 1, textAlign: 'center', fontSize: 'min(0.9vw, 6.5px)', fontWeight: 600, color: '#555' }}>
                  About Sarvasva
                </span>
              </div>
              {/* Body */}
              <div style={{ padding: '6% 8%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
                <img
                  src="/images/user_profile.webp"
                  alt="Sarvasva"
                  style={{
                    width: '30%',
                    aspectRatio: '1/1',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid #3b82f6',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                    marginBottom: '4%'
                  }}
                />
                <span style={{ fontSize: 'min(1.2vw, 8.5px)', fontWeight: 700, color: '#111', lineHeight: 1.1 }}>
                  Sarvasva
                </span>
                <span style={{ fontSize: 'min(0.85vw, 6px)', fontWeight: 600, color: '#2563eb', marginBottom: '8%' }}>
                  Full-Stack & Security
                </span>
                {/* Soft zoomed-out structural lines — no distracting micro-text */}
                <div style={{ width: '85%', height: 2.5, backgroundColor: '#cbd5e1', borderRadius: 2, marginBottom: 3 }} />
                <div style={{ width: '92%', height: 2.5, backgroundColor: '#cbd5e1', borderRadius: 2, marginBottom: 3 }} />
                <div style={{ width: '70%', height: 2.5, backgroundColor: '#cbd5e1', borderRadius: 2 }} />
              </div>
            </div>

            {/* Window 2: Engineering Project Window (Layered, like original) */}
            <div
              style={{
                position: 'absolute',
                left: '14%',
                top: '28%',
                width: '35%',
                height: '56%',
                backgroundColor: '#ffffff',
                borderRadius: '5px',
                border: '1px solid rgba(0,0,0,0.25)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex: 5
              }}
            >
              {/* Titlebar */}
              <div
                style={{
                  height: '14px',
                  background: 'linear-gradient(#fafafa, #e0e0e0)',
                  borderBottom: '1px solid #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 5px',
                  gap: '3px'
                }}
              >
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#28c840' }} />
                <span style={{ flex: 1, textAlign: 'center', fontSize: 'min(0.9vw, 6.5px)', fontWeight: 600, color: '#555' }}>
                  Engineering Projects
                </span>
              </div>
              {/* Body */}
              <div style={{ padding: '6%', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Header Banner Card */}
                <div style={{ backgroundColor: '#0284c7', borderRadius: 3, padding: '4px 6px', marginBottom: '8%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 'min(1vw, 7px)', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
                    SARVASVA // LABS
                  </span>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#38bdf8' }} />
                </div>
                {/* 2-column soft structural layout */}
                <div style={{ display: 'flex', gap: '8%', flex: 1 }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                    <div style={{ width: '90%', height: 2.5, backgroundColor: '#94a3b8', borderRadius: 2 }} />
                    <div style={{ width: '100%', height: 2.5, backgroundColor: '#cbd5e1', borderRadius: 2 }} />
                    <div style={{ width: '85%', height: 2.5, backgroundColor: '#cbd5e1', borderRadius: 2 }} />
                    <div style={{ width: '70%', height: 2.5, backgroundColor: '#cbd5e1', borderRadius: 2 }} />
                    <div style={{ width: '95%', height: 2.5, backgroundColor: '#e2e8f0', borderRadius: 2, marginTop: 2 }} />
                    <div style={{ width: '80%', height: 2.5, backgroundColor: '#e2e8f0', borderRadius: 2 }} />
                  </div>
                  <div style={{ width: '32%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ width: '100%', height: '24px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 9 }}>🛡️</span>
                    </div>
                    <div style={{ width: '80%', height: 2, backgroundColor: '#cbd5e1', borderRadius: 2 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Window 3: Compact Games Folder (Matching initial right window) */}
            <div
              style={{
                position: 'absolute',
                left: '48%',
                top: '40%',
                width: '38%',
                height: '24%',
                backgroundColor: '#ffffff',
                borderRadius: '5px',
                border: '1px solid rgba(0,0,0,0.25)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex: 6
              }}
            >
              <div style={{ height: '14px', background: 'linear-gradient(#fafafa, #e0e0e0)', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '0 5px', gap: '3px' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#28c840' }} />
                <span style={{ flex: 1, textAlign: 'center', fontSize: 'min(0.9vw, 6.5px)', fontWeight: 600, color: '#555' }}>
                  Games
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flex: 1, padding: '0 4%' }}>
                {[
                  { icon: '🟡', label: 'Pac-Man' },
                  { icon: '🐍', label: 'Snake' },
                  { icon: '🧱', label: 'Brick' },
                  { icon: '🟦', label: 'Tetris' }
                ].map(g => (
                  <div key={g.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <span style={{ fontSize: 'min(1.4vw, 11px)' }}>{g.icon}</span>
                    <div style={{ width: 12, height: 2, backgroundColor: '#cbd5e1', borderRadius: 1 }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Glass Shelf Dock */}
            <div
              style={{
                position: 'absolute',
                bottom: '2%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '46%',
                height: '7.5%',
                backgroundColor: 'rgba(255,255,255,0.45)',
                borderRadius: '6px 6px 0 0',
                border: '1px solid rgba(255,255,255,0.7)',
                borderBottom: 'none',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '0 3%',
                zIndex: 8
              }}
            >
              {['/images/user_profile.webp', '/images/biglow-icon.webp', '/images/firstlook-icon.webp', '/images/overexposed-icon.webp', '/images/lacrimosa-icon.webp', '/images/mail-icon.webp'].map((src, idx) => (
                <div key={src} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    src={src}
                    alt="Dock Icon"
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: idx === 0 ? '50%' : '2px',
                      objectFit: 'cover'
                    }}
                  />
                  {idx === 0 && (
                    <div style={{ width: 2.5, height: 2.5, borderRadius: '50%', backgroundColor: '#fff', marginTop: 1 }} />
                  )}
                </div>
              ))}
            </div>

            {/* Subtle Diagonal CRT Glass Glare */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)',
                pointerEvents: 'none',
                zIndex: 10
              }}
            />
          </div>
        </div>
      </div>

      {/* Pulsing "CLICK TO ENTER" Action Hint */}
      <p
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: 24,
          color: 'rgba(255, 255, 255, 0.92)',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.6), 0 0 18px rgba(168, 85, 247, 0.45)',
          animation: 'pulseHint 2.2s infinite ease-in-out'
        }}
      >
        click to enter
      </p>

      {/* CSS Pulse Animation */}
      <style>{`
        @keyframes pulseHint {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
      `}</style>
    </div>
  );
}
