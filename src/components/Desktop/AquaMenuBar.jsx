import React, { useState, useEffect, useRef } from 'react';

export default function AquaMenuBar({
  onOpenWindow,
  onToggleDock,
  dockHidden,
  timeZone = 'local',
  desktopZoom = '1.25',
  onChangeDesktopZoom,
  onCleanUp,
  onOpenDashboard,
  folderView = 'icon',
  onSetFolderView,
  onTriggerMatrix,
  soundEnabled,
  onToggleSound,
  theme = 'light',
  onToggleTheme,
  onSleep,
  onRestart
}) {
  const [dayString, setDayString] = useState('');
  const [timeString, setTimeString] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const menuBarRef = useRef(null);

  useEffect(() => {
    const tz = timeZone && timeZone !== 'local' ? timeZone : undefined;
    const updateTime = () => {
      const now = new Date();
      try {
        setDayString(now.toLocaleString('en-US', { weekday: 'short', timeZone: tz }));
        setTimeString(now.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz }));
      } catch {
        setDayString(now.toLocaleString('en-US', { weekday: 'short' }));
        setTimeString(now.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (name) => {
    setActiveMenu(prev => (prev === name ? null : name));
  };

  const handleAction = (callback) => {
    callback?.();
    setActiveMenu(null);
  };

  return (
    <header ref={menuBarRef} className="aqua-menubar" role="banner">
      {/* Left Menu Items */}
      <div className="aqua-menu-left">
        {/* Apple Logo Menu */}
        <div className="aqua-menu-item">
          <button
            type="button"
            aria-label="Apple menu"
            className={`aqua-menu-btn ${activeMenu === 'apple' ? 'active' : ''}`}
            onClick={() => toggleMenu('apple')}
          >
            <img
              src="/images/apple-logo.png"
              alt="Apple"
              className="aqua-apple-icon"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </button>

          {activeMenu === 'apple' && (
            <div className="aqua-dropdown">
              <button
                type="button"
                className="aqua-dropdown-item bold"
                onClick={() => handleAction(() => onOpenWindow('about'))}
              >
                About Sarvasva
              </button>
              <div className="aqua-dropdown-divider" />
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onRestart?.())}
              >
                🖥️ Return to iMac G3 Computer...
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onToggleTheme?.())}
              >
                {theme === 'light' ? '🌙 Switch to Dark Theme' : '☀️ Switch to Light Theme (Default)'}
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('prefs'))}
              >
                System Preferences...
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenDashboard?.())}
              >
                Dashboard
              </button>
              <div className="aqua-dropdown-divider" />
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onSleep?.())}
              >
                Sleep
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onRestart?.())}
              >
                Restart Computer...
              </button>
            </div>
          )}
        </div>

        {/* Finder Menu */}
        <div className="aqua-menu-item">
          <button
            type="button"
            className={`aqua-menu-btn bold ${activeMenu === 'finder' ? 'active' : ''}`}
            onClick={() => toggleMenu('finder')}
          >
            Finder
          </button>
          {activeMenu === 'finder' && (
            <div className="aqua-dropdown">
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('contact'))}
              >
                Contact Operator
              </button>
              <div className="aqua-dropdown-divider" />
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onCleanUp?.())}
              >
                Clean Up Desktop
              </button>
            </div>
          )}
        </div>

        {/* Projects Menu */}
        <div className="aqua-menu-item">
          <button
            type="button"
            className={`aqua-menu-btn ${activeMenu === 'projects' ? 'active' : ''}`}
            onClick={() => toggleMenu('projects')}
          >
            Projects
          </button>
          {activeMenu === 'projects' && (
            <div className="aqua-dropdown">
              <button
                type="button"
                className="aqua-dropdown-item bold"
                onClick={() => handleAction(() => onOpenWindow('llm-security'))}
              >
                LLM Security Framework
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('rat-research'))}
              >
                RAT Research Lab
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('focus-extension'))}
              >
                ADHD Focus Extension
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('stuck-in-space'))}
              >
                Stuck In Space (Godot Game)
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('sales-agent'))}
              >
                Autonomous AI Sales Agent
              </button>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div className="aqua-menu-item">
          <button
            type="button"
            className={`aqua-menu-btn ${activeMenu === 'view' ? 'active' : ''}`}
            onClick={() => toggleMenu('view')}
          >
            View
          </button>
          {activeMenu === 'view' && (
            <div className="aqua-dropdown">
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onSetFolderView?.('icon'))}
              >
                <span style={{ width: 16, display: 'inline-block' }}>{folderView === 'icon' ? '✓' : ''}</span>
                as Icons
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onSetFolderView?.('list'))}
              >
                <span style={{ width: 16, display: 'inline-block' }}>{folderView === 'list' ? '✓' : ''}</span>
                as List
              </button>
              <div className="aqua-dropdown-divider" />
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onToggleDock?.())}
              >
                <span style={{ width: 16, display: 'inline-block' }} />
                {dockHidden ? 'Show Dock' : 'Hide Dock'}
              </button>
              <div className="aqua-dropdown-divider" />
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => {
                  const curr = parseFloat(desktopZoom) || 1.25;
                  const next = Math.min(1.5, Math.round((curr + 0.1) * 100) / 100);
                  onChangeDesktopZoom?.(next);
                })}
              >
                <span style={{ width: 16, display: 'inline-block' }}>🔍</span>
                Zoom In (Ctrl +)
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => {
                  const curr = parseFloat(desktopZoom) || 1.25;
                  const next = Math.max(0.9, Math.round((curr - 0.1) * 100) / 100);
                  onChangeDesktopZoom?.(next);
                })}
              >
                <span style={{ width: 16, display: 'inline-block' }}>🔎</span>
                Zoom Out (Ctrl -)
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onChangeDesktopZoom?.('1'))}
              >
                <span style={{ width: 16, display: 'inline-block' }}>{desktopZoom === '1' ? '✓' : ''}</span>
                Actual Size (100%)
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onChangeDesktopZoom?.('1.15'))}
              >
                <span style={{ width: 16, display: 'inline-block' }}>{desktopZoom === '1.15' ? '✓' : ''}</span>
                Comfortable (115%)
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onChangeDesktopZoom?.('1.25'))}
              >
                <span style={{ width: 16, display: 'inline-block' }}>{desktopZoom === '1.25' ? '✓' : ''}</span>
                Scaled In (125% - Default)
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onChangeDesktopZoom?.('1.35'))}
              >
                <span style={{ width: 16, display: 'inline-block' }}>{desktopZoom === '1.35' ? '✓' : ''}</span>
                Large Display (135%)
              </button>
            </div>
          )}
        </div>

        {/* Go Menu */}
        <div className="aqua-menu-item">
          <button
            type="button"
            className={`aqua-menu-btn ${activeMenu === 'go' ? 'active' : ''}`}
            onClick={() => toggleMenu('go')}
          >
            Go
          </button>
          {activeMenu === 'go' && (
            <div className="aqua-dropdown">
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('projects'))}
              >
                Engineering Projects
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('designs'))}
              >
                Posters & Graphic Design
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('speaking'))}
              >
                Speaking & MUN Events
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('certs'))}
              >
                Certifications
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('games'))}
              >
                Retro Arcade Games
              </button>
              <div className="aqua-dropdown-divider" />
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenDashboard?.())}
              >
                Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Arcade Games Menu */}
        <div className="aqua-menu-item">
          <button
            type="button"
            className={`aqua-menu-btn ${activeMenu === 'arcade' ? 'active' : ''}`}
            onClick={() => toggleMenu('arcade')}
          >
            Arcade
          </button>
          {activeMenu === 'arcade' && (
            <div className="aqua-dropdown">
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('pacman'))}
              >
                🟡 Pac-Man
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('snake'))}
              >
                🐍 Snake
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('brick-breaker'))}
              >
                🧱 Brick Breaker (5 Levels)
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('tetris'))}
              >
                🟦 Tetris
              </button>
              <button
                type="button"
                className="aqua-dropdown-item"
                onClick={() => handleAction(() => onOpenWindow('geometry-dash'))}
              >
                ⚡ Geometry Dash
              </button>
            </div>
          )}
        </div>

        {/* Socials Menu */}
        <div className="aqua-menu-item">
          <button
            type="button"
            className={`aqua-menu-btn ${activeMenu === 'socials' ? 'active' : ''}`}
            onClick={() => toggleMenu('socials')}
          >
            Connect
          </button>
          {activeMenu === 'socials' && (
            <div className="aqua-dropdown">
              <a
                href="https://github.com/scrxtch12418"
                target="_blank"
                rel="noopener noreferrer"
                className="aqua-dropdown-item"
                onClick={() => setActiveMenu(null)}
              >
                GitHub (scrxtch12418) ↗
              </a>
              <a
                href="https://linkedin.com/in/sarvasva-s-4470562b4"
                target="_blank"
                rel="noopener noreferrer"
                className="aqua-dropdown-item"
                onClick={() => setActiveMenu(null)}
              >
                LinkedIn ↗
              </a>
              <a
                href="mailto:sarvasva5758@gmail.com"
                className="aqua-dropdown-item"
                onClick={() => setActiveMenu(null)}
              >
                Email (sarvasva5758@gmail.com) ↗
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Right Menu Items */}
      <div className="aqua-menu-right" style={{ gap: 8 }}>
        <button
          type="button"
          onClick={onToggleTheme}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          className="aqua-sound-btn"
          style={{ fontSize: 13 }}
        >
          {theme === 'light' ? '☀️' : '🌙'}
        </button>

        <button
          type="button"
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          className="aqua-sound-btn"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>

        <button
          type="button"
          className="aqua-clock-btn"
          onClick={onTriggerMatrix}
          title="Click to enter the Matrix!"
        >
          <span>{dayString} </span>
          <span>{timeString}</span>
        </button>
      </div>
    </header>
  );
}
