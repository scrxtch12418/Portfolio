import React, { useState, useEffect } from 'react';
import ComputerLanding from './components/ComputerLanding';
import AquaDesktop from './components/Desktop/AquaDesktop';

export default function App() {
  const [inComputer, setInComputer] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('aqua_ui_theme') || 'light';
      }
    } catch {}
    return 'light';
  });

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('aqua_ui_theme', nextTheme);
      }
    } catch {}
  };

  // Synchronize initial desktop zoom on root element (~30% smaller compact OS UI)
  useEffect(() => {
    let savedZoom = '1';
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        savedZoom = localStorage.getItem('aqua_desktop_zoom') || '1';
        if (savedZoom === '1.25') savedZoom = '1';
        localStorage.setItem('aqua_desktop_zoom', savedZoom);
      }
    } catch {}
    document.documentElement.style.setProperty('--desktop-zoom', savedZoom);
  }, []);

  const handleEnterDesktop = () => {
    setInComputer(true);
  };

  const handleRebootToLanding = () => {
    setInComputer(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', backgroundColor: '#000' }}>
      {/* Scaled Mac OS X Aqua Desktop */}
      <div className="aqua-os-root">
        <AquaDesktop
          onReboot={handleRebootToLanding}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      </div>

      {/* Bondi Blue Apple iMac G3 Landing (Cleanly on top with full viewport bounds) */}
      {!inComputer && (
        <ComputerLanding
          onEnter={handleEnterDesktop}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      )}
    </div>
  );
}

