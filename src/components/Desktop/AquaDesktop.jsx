import React, { useState, useRef, useEffect, useCallback, Suspense, lazy } from 'react';
import AquaMenuBar from './AquaMenuBar';
import AquaDock from './AquaDock';
import AquaWindow from './AquaWindow';
import { soundManager } from '../../utils/soundManager';

// Data
import { PROJECTS } from '../../data/portfolioData';

// Core Applications
import AquaAboutApp from '../Apps/AquaAboutApp';
import AquaProjectWindow from '../Apps/AquaProjectWindow';
import AquaContactApp from '../Apps/AquaContactApp';
import AquaPrefsApp from '../Apps/AquaPrefsApp';
import AquaFolderWindow from '../Apps/AquaFolderWindow';
import AquaPreviewApp from '../Apps/AquaPreviewApp';
import AquaPlayerApp from '../Apps/AquaPlayerApp';

// Lazy Loaded Overlays & Arcade Games (Code Splitting for Optimal Performance)
const AquaMatrixMode = lazy(() => import('../Apps/AquaMatrixMode'));
const AquaDashboard = lazy(() => import('../Apps/AquaDashboard'));
const TomChompGame = lazy(() => import('../Games/TomChompGame'));
const LongDogGame = lazy(() => import('../Games/LongDogGame'));
const BricklowGame = lazy(() => import('../Games/BricklowGame'));
const TetrisGame = lazy(() => import('../Games/TetrisGame'));
const HackerRunnerGame = lazy(() => import('../Games/HackerRunnerGame'));

// Portfolio Showcase & Works Carousel
import PortfolioShowcase from '../Showcase/PortfolioShowcase';

const WALLPAPERS = {
  aqua: '/images/aqua-wallpaper.webp',
  'baja-coast': '/images/baja-coast.webp',
  'baja-sunset': '/images/baja-sunset.webp',
  autumn: '/images/autumn.webp'
};

const GameSuspenseFallback = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#0f172a',
    color: '#94a3b8',
    fontFamily: 'monospace',
    gap: 12
  }}>
    <div style={{
      width: 24,
      height: 24,
      border: '2px solid rgba(56, 189, 248, 0.25)',
      borderTopColor: '#38bdf8',
      borderRadius: '50%',
      animation: 'spinOrbit 0.8s linear infinite'
    }} />
    <span style={{ fontSize: 12, letterSpacing: 1 }}>LOADING ARCADE MODULE...</span>
  </div>
);

export default function AquaDesktop({ onReboot, theme: propTheme, onToggleTheme }) {
  const [internalTheme, setInternalTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aqua_ui_theme') || 'light';
    }
    return 'light';
  });

  const theme = propTheme || internalTheme;

  const handleToggleTheme = () => {
    if (onToggleTheme) {
      onToggleTheme();
    } else {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      setInternalTheme(nextTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('aqua_ui_theme', nextTheme);
      }
    }
  };

  const handleChangeTheme = (newTheme) => {
    if (newTheme === theme) return;
    if (onToggleTheme) {
      onToggleTheme();
    } else {
      setInternalTheme(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('aqua_ui_theme', newTheme);
      }
    }
  };

  const [wallpaper, setWallpaper] = useState('aqua');
  const [timeZone, setTimeZone] = useState('local');
  const [fontScale, setFontScale] = useState(112);
  const [nightTint, setNightTint] = useState(false);
  const [dockHidden, setDockHidden] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => !soundManager.isMuted);
  const [folderView, setFolderView] = useState('icon');
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null);

  // Overlays
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isDashboardActive, setIsDashboardActive] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);

  // Desktop Display Zoom State (Persisted in localStorage, default 1 for compact OS UI)
  const [desktopZoom, setDesktopZoom] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aqua_desktop_zoom');
      if (!saved || saved === '1.25') {
        localStorage.setItem('aqua_desktop_zoom', '1');
        return '1';
      }
      return saved;
    }
    return '1';
  });

  const handleSetDesktopZoom = (newZoom) => {
    const val = String(newZoom);
    setDesktopZoom(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aqua_desktop_zoom', val);
      document.documentElement.style.setProperty('--desktop-zoom', val);
    }
  };

  // Keyboard zoom controls: Cmd/Ctrl + and Cmd/Ctrl -
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        setDesktopZoom(prev => {
          const next = Math.min(1.5, Math.round((parseFloat(prev) + 0.1) * 100) / 100);
          handleSetDesktopZoom(next);
          return String(next);
        });
      } else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        setDesktopZoom(prev => {
          const next = Math.max(0.8, Math.round((parseFloat(prev) - 0.1) * 100) / 100);
          handleSetDesktopZoom(next);
          return String(next);
        });
      } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        handleSetDesktopZoom('1');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Windows State - Sleek, compact desktop windows (Responsive on mobile viewports)
  const [windows, setWindows] = useState(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
    const zoomVal = 1;
    const defaultW = typeof window !== 'undefined'
      ? (isMobile ? window.innerWidth - 16 : Math.min(680, (window.innerWidth / zoomVal) - 24))
      : 680;
    const defaultH = typeof window !== 'undefined'
      ? (isMobile ? window.innerHeight - 92 : Math.min(500, (window.innerHeight / zoomVal) - 68))
      : 500;
    const startX = isMobile ? 8 : (typeof window !== 'undefined' ? Math.max(24, Math.round(((window.innerWidth / zoomVal) - defaultW) / 2) - 30) : 56);
    const startY = isMobile ? 32 : 46;
    return [
      {
        id: 'about',
        type: 'about',
        title: 'About Sarvasva',
        width: defaultW,
        height: defaultH,
        initialX: startX,
        initialY: startY,
        zIndex: 10,
        isMinimized: false
      }
    ];
  });
  const [activeWindowId, setActiveWindowId] = useState('about');
  const highestZ = useRef(20);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      soundManager.setMuted(!next);
      return next;
    });
  }, []);

  const playSfx = useCallback((type = 'click') => {
    if (!soundEnabled) return;
    if (type === 'click') soundManager.playClick();
    else if (type === 'pop') soundManager.playPop();
    else if (type === 'open') soundManager.playWindowOpen();
    else if (type === 'close') soundManager.playWindowClose();
    else if (type === 'minimize') soundManager.playWindowMinimize();
    else if (type === 'restore') soundManager.playWindowRestore();
    else soundManager.playClick();
  }, [soundEnabled]);

  const playSfxRef = useRef(playSfx);
  playSfxRef.current = playSfx;

  const focusWindow = (id) => {
    highestZ.current += 1;
    setActiveWindowId(id);
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, zIndex: highestZ.current, isMinimized: false } : w))
    );
  };

  const closeWindow = (id) => {
    playSfx('close');
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      const remaining = windows.filter(w => w.id !== id);
      if (remaining.length > 0) {
        const nextActive = remaining.reduce((max, w) => (w.zIndex > max.zIndex ? w : max), remaining[0]);
        setActiveWindowId(nextActive.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const minimizeWindow = (id) => {
    playSfx('minimize');
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  };

  const restoreWindow = (id) => {
    playSfx('restore');
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMinimized: false } : w))
    );
    focusWindow(id);
  };

  // Open or focus an app/window
  const openWindow = (type, customProps = {}) => {
    playSfx('open');
    const existing = windows.find(w => w.type === type || (customProps.id && w.id === customProps.id));
    if (existing) {
      if (existing.isMinimized) {
        setWindows(prev => prev.map(w => w.id === existing.id ? { ...w, isMinimized: false } : w));
      }
      focusWindow(existing.id);
      return;
    }

    highestZ.current += 1;
    const newZ = highestZ.current;

    const isMobileScreen = typeof window !== 'undefined' && window.innerWidth <= 640;
    const zoomVal = parseFloat(desktopZoom) || 1;
    const maxW = typeof window !== 'undefined' ? (window.innerWidth / zoomVal) - 24 : 1000;
    const maxH = typeof window !== 'undefined' ? (window.innerHeight / zoomVal) - 68 : 700;
    const winW = isMobileScreen ? Math.min(window.innerWidth - 16, 680) : Math.min(680, maxW);
    const winH = isMobileScreen ? Math.min(window.innerHeight - 92, 500) : Math.min(500, maxH);
    const centerX = isMobileScreen ? 8 : Math.max(24, Math.round((maxW - winW) / 2) - 30);

    const configs = {
      about: {
        title: 'About Sarvasva',
        width: winW,
        height: winH,
        initialX: centerX,
        initialY: 46
      },
      'llm-security': {
        title: 'LLM Security Framework',
        width: Math.min(720, maxW),
        height: Math.min(520, maxH),
        initialX: centerX + 20,
        initialY: 52
      },
      'rat-research': {
        title: 'RAT Research Lab',
        width: Math.min(720, maxW),
        height: Math.min(520, maxH),
        initialX: 90,
        initialY: 55
      },
      'focus-extension': {
        title: 'ADHD Focus Extension',
        width: Math.min(720, maxW),
        height: Math.min(520, maxH),
        initialX: 100,
        initialY: 60
      },
      'stuck-in-space': {
        title: 'Stuck in Space (Godot Game)',
        width: Math.min(720, maxW),
        height: Math.min(520, maxH),
        initialX: 110,
        initialY: 65
      },
      'sales-agent': {
        title: 'Autonomous AI Sales Agent',
        width: Math.min(720, maxW),
        height: Math.min(520, maxH),
        initialX: 120,
        initialY: 70
      },
      contact: {
        title: 'New Message — Mail',
        width: Math.min(540, maxW),
        height: Math.min(480, maxH),
        initialX: 130,
        initialY: 55
      },
      prefs: {
        title: 'System Preferences',
        width: Math.min(540, maxW),
        height: Math.min(480, maxH),
        initialX: 140,
        initialY: 60
      },
      projects: {
        title: 'Projects',
        width: Math.min(700, maxW),
        height: Math.min(480, maxH),
        initialX: 85,
        initialY: 50
      },
      designs: {
        title: 'Designs',
        width: Math.min(720, maxW),
        height: Math.min(520, maxH),
        initialX: 95,
        initialY: 55
      },
      speaking: {
        title: 'Speaking & MUN Events',
        width: Math.min(720, maxW),
        height: Math.min(520, maxH),
        initialX: 105,
        initialY: 60
      },
      certs: {
        title: 'Certifications',
        width: Math.min(680, maxW),
        height: Math.min(480, maxH),
        initialX: 115,
        initialY: 65
      },
      games: {
        title: 'Retro Arcade Games',
        width: Math.min(680, maxW),
        height: Math.min(480, maxH),
        initialX: 100,
        initialY: 50
      },
      pacman: {
        title: 'Pac-Man Arcade',
        width: Math.min(480, maxW),
        height: Math.min(540, maxH),
        initialX: 140,
        initialY: 42
      },
      'tom-chomp': {
        title: 'Pac-Man Arcade',
        width: Math.min(480, maxW),
        height: Math.min(540, maxH),
        initialX: 140,
        initialY: 42
      },
      snake: {
        title: 'Snake Arcade',
        width: Math.min(480, maxW),
        height: Math.min(540, maxH),
        initialX: 150,
        initialY: 46
      },
      'long-dog': {
        title: 'Snake Arcade',
        width: Math.min(480, maxW),
        height: Math.min(540, maxH),
        initialX: 150,
        initialY: 46
      },
      'brick-breaker': {
        title: 'Brick Breaker Arcade (5 Levels)',
        width: Math.min(500, maxW),
        height: Math.min(540, maxH),
        initialX: 140,
        initialY: 42
      },
      bricklow: {
        title: 'Brick Breaker Arcade (5 Levels)',
        width: Math.min(500, maxW),
        height: Math.min(540, maxH),
        initialX: 140,
        initialY: 42
      },
      tetris: {
        title: 'Tetris Arcade',
        width: Math.min(440, maxW),
        height: Math.min(540, maxH),
        initialX: 150,
        initialY: 44
      },
      'geometry-dash': {
        title: 'Geometry Dash Arcade',
        width: Math.min(640, maxW),
        height: Math.min(400, maxH),
        initialX: 130,
        initialY: 50
      },
      preview: {
        title: customProps.title || 'Preview',
        width: Math.min(740, maxW),
        height: Math.min(540, maxH),
        initialX: 105,
        initialY: 50
      },
      player: {
        title: customProps.title || 'QuickTime Player',
        width: Math.min(720, maxW),
        height: Math.min(500, maxH),
        initialX: 105,
        initialY: 50
      }
    };

    const id = customProps.id || type;
    const cfg = configs[type] || {
      title: customProps.title || type,
      width: Math.min(600, maxW),
      height: Math.min(460, maxH),
      initialX: 100,
      initialY: 60
    };

    const finalInitialX = isMobileScreen ? 8 : (cfg.initialX ?? centerX);
    const finalInitialY = isMobileScreen ? 32 : (cfg.initialY ?? 46);
    const finalW = isMobileScreen ? Math.min(window.innerWidth - 16, cfg.width || winW) : (cfg.width || winW);
    const finalH = isMobileScreen ? Math.min(window.innerHeight - 92, cfg.height || winH) : (cfg.height || winH);

    const newWin = {
      id,
      type,
      ...cfg,
      width: finalW,
      height: finalH,
      initialX: finalInitialX,
      initialY: finalInitialY,
      ...customProps,
      zIndex: newZ,
      isMinimized: false
    };

    setWindows(prev => [...prev, newWin]);
    setActiveWindowId(id);
  };

  const openPreviewItem = (item, itemsList = []) => {
    openWindow('preview', {
      id: `preview-${item.id}`,
      title: item.name || 'Preview',
      imageSrc: item.thumbnail || item.src,
      items: itemsList.length > 0 ? itemsList : [item],
      currentIndex: itemsList.findIndex(i => i.id === item.id) >= 0 ? itemsList.findIndex(i => i.id === item.id) : 0
    });
  };

  const openPlayerItem = (item) => {
    openWindow('player', {
      id: `player-${item.id}`,
      title: item.name || 'QuickTime Player',
      videoSrc: item.videoSrc,
      poster: item.thumbnail || '/images/speaking_sac_2.webp'
    });
  };

  // Folder Data
  const folderContents = {
    projects: [
      { id: 'llm-security', name: 'LLM Security Framework', icon: '🛡️', kind: 'Python / CLI Security', size: '4.2 MB', date: '2026' },
      { id: 'rat-research', name: 'RAT Research Lab', icon: '💻', kind: 'Python / Socket Tool', size: '2.8 MB', date: '2026' },
      { id: 'focus-extension', name: 'ADHD Focus Extension', icon: '⏱️', kind: 'Chrome Extension', size: '1.5 MB', date: '2025' },
      { id: 'stuck-in-space', name: 'Stuck in Space Game', icon: '🚀', kind: 'Godot GDScript Game', size: '18.4 MB', date: '2025' },
      { id: 'sales-agent', name: 'Autonomous AI Sales Agent', icon: '🤖', kind: 'FastAPI / Ollama', size: '3.1 MB', date: '2026' }
    ],
    designs: [
      { id: 'des-1', name: 'Dia de Muertos Quiz.png', thumbnail: '/images/dia_de_muertos_quiz.webp', src: '/images/dia_de_muertos_quiz.webp', kind: 'PNG Image', size: '306 KB', date: 'Oct 2024' },
      { id: 'des-2', name: 'The Starter Quiz.png', thumbnail: '/images/starter_quiz.webp', src: '/images/starter_quiz.webp', kind: 'PNG Image', size: '342 KB', date: 'Jul 2024' },
      { id: 'des-3', name: 'Kaun Banega Khiladi Quiz.png', thumbnail: '/images/kbk_quiz.webp', src: '/images/kbk_quiz.webp', kind: 'PNG Image', size: '855 KB', date: '2024' },
      { id: 'des-4', name: 'Rewind Quiz.png', thumbnail: '/images/rewind_quiz.webp', src: '/images/rewind_quiz.webp', kind: 'PNG Image', size: '259 KB', date: 'Aug 2024' },
      { id: 'des-5', name: 'Studio 99 Identity.png', thumbnail: '/images/studio99.webp', src: '/images/studio99.webp', kind: 'PNG Image', size: '247 KB', date: 'Feb 2025' },
      { id: 'des-6', name: 'Videogames Quiz.png', thumbnail: '/images/videogames_quiz.webp', src: '/images/videogames_quiz.webp', kind: 'PNG Image', size: '388 KB', date: 'Dec 2024' },
      { id: 'des-7', name: 'The Office Quiz.png', thumbnail: '/images/theoffice_quiz.webp', src: '/images/theoffice_quiz.webp', kind: 'PNG Image', size: '399 KB', date: 'Jan 2025' },
      { id: 'des-8', name: 'Grey Matter — Liquid.png', thumbnail: '/images/join_us_liquid.webp', src: '/images/join_us_liquid.webp', kind: 'PNG Image', size: '473 KB', date: '2025' },
      { id: 'des-9', name: 'Grey Matter — Waves.png', thumbnail: '/images/join_us_waves.webp', src: '/images/join_us_waves.webp', kind: 'PNG Image', size: '606 KB', date: '2025' },
      { id: 'des-10', name: 'Motley Crew Quiz.png', thumbnail: '/images/motley_crew_quiz.webp', src: '/images/motley_crew_quiz.webp', kind: 'PNG Image', size: '494 KB', date: 'Nov 2024' },
      { id: 'des-11', name: 'Nutella Quiz.png', thumbnail: '/images/nutella_quiz.webp', src: '/images/nutella_quiz.webp', kind: 'PNG Image', size: '249 KB', date: 'Sep 2024' }
    ],
    speaking: [
      { id: 'spk-1', name: 'NMAMIT Model United Nations (MUN).jpeg', thumbnail: '/images/speaking_mun_1.webp', kind: 'JPEG Photo', size: '67 KB', date: '2024' },
      { id: 'spk-2', name: 'MUN Committee Debate.jpeg', thumbnail: '/images/speaking_mun_2.webp', kind: 'JPEG Photo', size: '140 KB', date: '2024' },
      { id: 'spk-3', name: 'Student Activity Council Keynote.jpeg', thumbnail: '/images/speaking_sac_2.webp', kind: 'JPEG Photo', size: '878 KB', date: '2024' },
      { id: 'spk-4', name: 'Technical Presentation Stage.jpeg', thumbnail: '/images/speaking_stage_laptop.webp', kind: 'JPEG Photo', size: '120 KB', date: '2024' },
      { id: 'spk-5', name: 'Aikya Youth Leadership.jpeg', thumbnail: '/images/speaking_aikya.webp', kind: 'JPEG Photo', size: '65 KB', date: '2024' }
    ],
    certs: [
      { id: 'c-1', name: 'Google Cybersecurity Certificate', icon: '🛡️', kind: 'Credential', size: '120 KB', date: '2025' },
      { id: 'c-2', name: 'TryHackMe Cybersecurity 101', icon: '🎯', kind: 'Credential', size: '95 KB', date: '2025' },
      { id: 'c-3', name: 'ZSecurity Ethical Hacking From Scratch', icon: '💻', kind: 'Credential', size: '110 KB', date: '2024' },
      { id: 'c-4', name: 'Unreal Engine Blueprint Developer', icon: '🎮', kind: 'Credential', size: '140 KB', date: '2024' }
    ],
    games: [
      { id: 'pacman', name: 'Pac-Man', type: 'game', gameId: 'pacman', icon: '🟡', kind: 'Arcade Classic', size: '2.4 MB' },
      { id: 'snake', name: 'Snake', type: 'game', gameId: 'snake', icon: '🐍', kind: 'Arcade Classic', size: '1.8 MB' },
      { id: 'brick-breaker', name: 'Brick Breaker', type: 'game', gameId: 'brick-breaker', icon: '🧱', kind: '5-Level Arcade', size: '2.1 MB' },
      { id: 'tetris', name: 'Tetris', type: 'game', gameId: 'tetris', icon: '🟦', kind: 'Block Puzzle', size: '2.0 MB' },
      { id: 'geometry-dash', name: 'Geometry Dash', type: 'game', gameId: 'geometry-dash', icon: '⚡', kind: 'Rhythm Platformer', size: '2.6 MB' }
    ]
  };

  // Desktop Icons Configuration: Folders & System Items
  // All photos are housed inside the 'Designs' folder, and all projects inside the 'Projects' folder
  const desktopIcons = [
    { id: 'profile', label: 'Sarvasva', iconSrc: '/images/user_profile.webp', action: () => openWindow('about') },
    { id: 'projects', label: 'Projects', iconEmoji: '💼', action: () => openWindow('projects') },
    { id: 'designs', label: 'Designs', iconEmoji: '🎨', action: () => openWindow('designs') },
    { id: 'speaking', label: 'Speaking', iconEmoji: '🎤', action: () => openWindow('speaking') },
    { id: 'certs', label: 'Certifications', iconEmoji: '📜', action: () => openWindow('certs') },
    { id: 'games', label: 'Arcade Games', iconEmoji: '🕹️', action: () => openWindow('games') },
    { id: 'mail', label: 'Mail', iconSrc: '/images/mail-icon.webp', action: () => openWindow('contact') }
  ];

  const getProjectData = (id) => {
    return PROJECTS.find(p => p.id === id) || PROJECTS[0];
  };

  const desktopScrollContainerRef = useRef(null);

  // Elastic scroll resistance state & physics
  const [pullOffset, setPullOffset] = useState(0);
  const [pullProgress, setPullProgress] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  const accumulatedDeltaRef = useRef(0);
  const decayTimeoutRef = useRef(null);
  const isUnlockingRef = useRef(false);
  const touchStartYRef = useRef(0);
  const touchStartXRef = useRef(0);
  const isTouchActiveRef = useRef(false);

  const scrollToShowcase = () => {
    if (desktopScrollContainerRef.current) {
      const el = document.getElementById('portfolio-showcase-root');
      if (el) {
        desktopScrollContainerRef.current.scrollTo({
          top: el.offsetTop,
          behavior: 'smooth'
        });
        return;
      }
    }
    const el = document.getElementById('portfolio-showcase-root');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDesktop = () => {
    if (desktopScrollContainerRef.current) {
      desktopScrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenFromShowcase = (appId) => {
    scrollToDesktop();
    setTimeout(() => {
      openWindow(appId);
    }, 380);
  };

  // Scroll resistance: intercept downward scrolling from the desktop surface
  // Require intentional scroll force before allowing scroll into portfolio showcase
  useEffect(() => {
    const container = desktopScrollContainerRef.current;
    if (!container) return;

    // Resistance threshold in scroll delta units (~2-3 deliberate wheel clicks or intentional trackpad swipe)
    const RESISTANCE_THRESHOLD = 260;

    const isInsideScrollableChild = (target, deltaY) => {
      let curr = target;
      while (curr && curr !== container && curr !== document.body) {
        if (curr.classList && (curr.classList.contains('aqua-game-container') || curr.tagName === 'CANVAS')) {
          return true;
        }
        try {
          const style = window.getComputedStyle(curr);
          const overflowY = style.overflowY;
          if (overflowY === 'auto' || overflowY === 'scroll') {
            const maxScrollTop = curr.scrollHeight - curr.clientHeight;
            if (maxScrollTop > 2) {
              if (deltaY > 0 && curr.scrollTop < maxScrollTop - 2) {
                return true;
              }
              if (deltaY < 0 && curr.scrollTop > 2) {
                return true;
              }
            }
          }
        } catch {}
        curr = curr.parentElement;
      }
      return false;
    };

    const handleWheel = (e) => {
      // If already scrolled into showcase, allow full natural scrolling
      if (container.scrollTop > 8) {
        return;
      }

      // If scrolling upward while on desktop, decay any tension
      if (e.deltaY <= 0) {
        if (accumulatedDeltaRef.current > 0) {
          accumulatedDeltaRef.current = Math.max(0, accumulatedDeltaRef.current + e.deltaY);
          const progress = Math.min(1, accumulatedDeltaRef.current / RESISTANCE_THRESHOLD);
          const offset = -Math.min(46, Math.pow(accumulatedDeltaRef.current, 0.58) * 1.5);
          setPullProgress(progress);
          setPullOffset(offset);
          if (accumulatedDeltaRef.current === 0) {
            setIsPulling(false);
          }
        }
        return;
      }

      // If cursor is over a scrollable inner element (e.g. folder contents, preview, terminal), don't intercept
      if (isInsideScrollableChild(e.target, e.deltaY)) {
        return;
      }

      // If currently animating transition to showcase, ignore subsequent wheel events
      if (isUnlockingRef.current) {
        return;
      }

      // Intercept downward wheel event and accumulate resistance tension
      e.preventDefault();

      accumulatedDeltaRef.current += e.deltaY;
      const progress = Math.min(1, accumulatedDeltaRef.current / RESISTANCE_THRESHOLD);
      const offset = -Math.min(46, Math.pow(accumulatedDeltaRef.current, 0.58) * 1.5);

      setIsPulling(true);
      setPullOffset(offset);
      setPullProgress(progress);

      if (decayTimeoutRef.current) {
        clearTimeout(decayTimeoutRef.current);
      }

      if (accumulatedDeltaRef.current >= RESISTANCE_THRESHOLD) {
        // Resistance broken! Smoothly unlock transition into showcase
        isUnlockingRef.current = true;
        setIsPulling(false);
        setPullOffset(0);
        setPullProgress(0);
        accumulatedDeltaRef.current = 0;
        playSfxRef.current('pop');
        scrollToShowcase();
        setTimeout(() => {
          isUnlockingRef.current = false;
        }, 900);
      } else {
        // If user pauses or stops scrolling before breaking resistance, bounce back
        decayTimeoutRef.current = setTimeout(() => {
          accumulatedDeltaRef.current = 0;
          setIsPulling(false);
          setPullOffset(0);
          setPullProgress(0);
        }, 340);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
        touchStartXRef.current = e.touches[0].clientX;
        isTouchActiveRef.current = true;
      }
    };

    const handleTouchMove = (e) => {
      if (!isTouchActiveRef.current || container.scrollTop > 8 || isUnlockingRef.current) {
        return;
      }

      const touchY = e.touches[0].clientY;
      const touchX = e.touches[0].clientX;
      const deltaY = touchStartYRef.current - touchY;
      const deltaX = Math.abs(touchStartXRef.current - touchX);

      // Swiping up to scroll down
      if (deltaY > 0 && deltaY > deltaX) {
        if (isInsideScrollableChild(e.target, deltaY)) {
          return;
        }

        e.preventDefault();
        const TOUCH_THRESHOLD = 140;
        const progress = Math.min(1, deltaY / TOUCH_THRESHOLD);
        const offset = -Math.min(46, Math.pow(deltaY, 0.65) * 1.4);

        setIsPulling(true);
        setPullOffset(offset);
        setPullProgress(progress);

        if (deltaY >= TOUCH_THRESHOLD) {
          isUnlockingRef.current = true;
          isTouchActiveRef.current = false;
          setIsPulling(false);
          setPullOffset(0);
          setPullProgress(0);
          playSfxRef.current('pop');
          scrollToShowcase();
          setTimeout(() => {
            isUnlockingRef.current = false;
          }, 900);
        }
      }
    };

    const handleTouchEnd = () => {
      if (isTouchActiveRef.current) {
        isTouchActiveRef.current = false;
        if (!isUnlockingRef.current) {
          setIsPulling(false);
          setPullOffset(0);
          setPullProgress(0);
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
      if (decayTimeoutRef.current) {
        clearTimeout(decayTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={desktopScrollContainerRef}
      className="aqua-desktop-scroll-container"
    >
      <div
        className={`aqua-desktop-surface ${nightTint || theme === 'dark' ? 'night-mode' : ''}`}
        style={{
          backgroundImage: `url('${WALLPAPERS[wallpaper] || WALLPAPERS.aqua}')`,
          fontSize: `${fontScale}%`,
          filter: (nightTint || theme === 'dark') ? 'brightness(0.88) contrast(1.05)' : 'none',
          transform: pullOffset ? `translateY(${pullOffset}px)` : 'none',
          transition: isPulling ? 'none' : 'transform 0.42s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onClick={() => setSelectedDesktopIcon(null)}
      >
        {/* Top Menu Bar */}
        <AquaMenuBar
          onOpenWindow={openWindow}
          onToggleDock={() => setDockHidden(!dockHidden)}
          dockHidden={dockHidden}
          timeZone={timeZone}
          desktopZoom={desktopZoom}
          onChangeDesktopZoom={handleSetDesktopZoom}
          onCleanUp={() => {
            playSfx('pop');
            setWindows([]);
          }}
          onOpenDashboard={() => setIsDashboardActive(true)}
          folderView={folderView}
          onSetFolderView={setFolderView}
          onTriggerMatrix={() => setIsMatrixActive(true)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onSleep={() => setIsSleeping(true)}
          onRestart={onReboot || (() => window.location.reload())}
        />

      {/* Desktop Icons (Neat, Single Vertical Column on the Right Edge) */}
      <div
        className="aqua-desktop-icons"
        onClick={(e) => e.stopPropagation()}
      >
        {desktopIcons.map(item => {
          const isSelected = selectedDesktopIcon === item.id;
          return (
            <div
              key={item.id}
              onClick={() => {
                playSfx('click');
                const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 640);
                if (isTouch || selectedDesktopIcon === item.id) {
                  item.action();
                } else {
                  setSelectedDesktopIcon(item.id);
                }
              }}
              onDoubleClick={item.action}
              className={`aqua-desktop-icon ${isSelected ? 'selected' : ''}`}
              title={`Click to select, double-click or click again to open ${item.label}`}
            >
              <div className="aqua-icon-img-wrap">
                {item.iconSrc ? (
                  <img
                    src={item.iconSrc}
                    alt={item.label}
                    className={`aqua-icon-img ${item.id === 'profile' ? 'aqua-desktop-avatar' : ''} ${item.isPhoto ? 'aqua-desktop-photo' : ''}`}
                  />
                ) : (
                  <span className="aqua-icon-emoji">
                    {item.iconEmoji || '📁'}
                  </span>
                )}
              </div>
              <span className="aqua-icon-label">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Open Aqua Windows */}
      {windows.map(win => {
        const isActive = win.id === activeWindowId;

        return (
          <div key={win.id} style={{ zIndex: win.zIndex, position: 'relative' }}>
            <AquaWindow
              title={win.title}
              width={win.width}
              height={win.height}
              initialX={win.initialX}
              initialY={win.initialY}
              isActive={isActive}
              isMinimized={win.isMinimized}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
            >
              {/* Operator Bio Application */}
              {win.type === 'about' && (
                <AquaAboutApp onOpenContact={() => openWindow('contact')} />
              )}

              {/* Project Windows */}
              {['llm-security', 'rat-research', 'focus-extension', 'stuck-in-space', 'sales-agent'].includes(win.type) && (
                <AquaProjectWindow {...getProjectData(win.type)} />
              )}

              {/* Mail Application */}
              {win.type === 'contact' && (
                <AquaContactApp onClose={() => closeWindow(win.id)} />
              )}

              {/* System Preferences */}
              {win.type === 'prefs' && (
                <AquaPrefsApp
                  currentWallpaper={wallpaper}
                  onSelectWallpaper={setWallpaper}
                  timeZone={timeZone}
                  onChangeTimeZone={setTimeZone}
                  fontScale={fontScale}
                  onChangeFontScale={setFontScale}
                  desktopZoom={desktopZoom}
                  onChangeDesktopZoom={handleSetDesktopZoom}
                  nightTint={nightTint}
                  onToggleNightTint={setNightTint}
                  theme={theme}
                  onChangeTheme={handleChangeTheme}
                />
              )}

              {/* Finder Folder Windows */}
              {['projects', 'designs', 'speaking', 'certs', 'games'].includes(win.type) && (
                <AquaFolderWindow
                  folderId={win.type}
                  title={win.title}
                  items={folderContents[win.type] || []}
                  viewMode={folderView}
                  onOpenGame={(gameId) => openWindow(gameId)}
                  onOpenItem={(item) => {
                    if (item.kind?.includes('Photo') || item.kind?.includes('Image')) {
                      openPreviewItem(item, folderContents[win.type]);
                    } else if (item.kind?.includes('Movie') || item.kind?.includes('Video')) {
                      openPlayerItem(item);
                    } else if (['llm-security', 'rat-research', 'focus-extension', 'stuck-in-space', 'sales-agent'].includes(item.id)) {
                      openWindow(item.id);
                    } else if (item.type === 'game' || item.gameId) {
                      openWindow(item.gameId || item.id);
                    } else {
                      openPreviewItem(item);
                    }
                  }}
                />
              )}

              {/* Preview Application */}
              {win.type === 'preview' && (
                <AquaPreviewApp
                  imageSrc={win.imageSrc}
                  title={win.title}
                  items={win.items || []}
                  currentIndex={win.currentIndex || 0}
                  onNavigate={(newIdx) => {
                    const item = win.items[newIdx];
                    if (item) {
                      setWindows(prev =>
                        prev.map(w =>
                          w.id === win.id
                            ? { ...w, currentIndex: newIdx, title: item.name || item.title }
                            : w
                        )
                      );
                    }
                  }}
                />
              )}

              {/* QuickTime Player Application */}
              {win.type === 'player' && (
                <AquaPlayerApp
                  title={win.title}
                  videoSrc={win.videoSrc}
                  poster={win.poster}
                />
              )}

              {/* Arcade Games (Suspense Loaded) */}
              <Suspense fallback={<GameSuspenseFallback />}>
                {['pacman', 'tom-chomp'].includes(win.type) && <TomChompGame />}
                {['snake', 'long-dog'].includes(win.type) && <LongDogGame />}
                {['brick-breaker', 'bricklow'].includes(win.type) && <BricklowGame />}
                {win.type === 'tetris' && <TetrisGame />}
                {win.type === 'geometry-dash' && <HackerRunnerGame />}
              </Suspense>
            </AquaWindow>
          </div>
        );
      })}

      {/* Glass Shelf Dock */}
      {!dockHidden && (
        <AquaDock
          onOpenWindow={openWindow}
          openWindows={windows.filter(w => !w.isMinimized).map(w => w.type)}
          minimizedWindows={windows.filter(w => w.isMinimized)}
          onRestoreWindow={restoreWindow}
        />
      )}

      {/* Floating Scroll Indicator Pill */}
      <div
        className={`aqua-scroll-hint-pill ${pullProgress > 0 ? 'pulling' : ''}`}
        onClick={scrollToShowcase}
        title="Scroll down for Portfolio Showcase"
      >
        <span className="aqua-hint-bounce">↓</span>
        <span>Showcase & Works</span>
      </div>

      {/* Resistance Tension Feedback Indicator */}
      {pullProgress > 0 && (
        <div className={`aqua-scroll-resistance-hud ${pullProgress >= 1 ? 'ready' : ''}`}>
          <div className="aqua-resistance-header">
            <span className="aqua-resistance-arrow">⇣</span>
            <span className="aqua-resistance-text">
              {pullProgress >= 1 ? 'Release or push to enter Portfolio' : 'Scroll down to enter Portfolio'}
            </span>
            <span className="aqua-resistance-badge">{Math.round(pullProgress * 100)}%</span>
          </div>
          <div className="aqua-resistance-track">
            <div
              className="aqua-resistance-bar"
              style={{ width: `${Math.min(100, Math.round(pullProgress * 100))}%` }}
            />
          </div>
        </div>
      )}

      {/* Dashboard Overlay */}
      {isDashboardActive && (
        <Suspense fallback={null}>
          <AquaDashboard
            isOpen={isDashboardActive}
            onClose={() => setIsDashboardActive(false)}
          />
        </Suspense>
      )}

      {/* Matrix Mode Easter Egg */}
      {isMatrixActive && (
        <Suspense fallback={null}>
          <AquaMatrixMode onClose={() => setIsMatrixActive(false)} />
        </Suspense>
      )}

      {/* Sleep Mode Overlay */}
      {isSleeping && (
        <div
          onClick={() => setIsSleeping(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999999,
            backgroundColor: '#000000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.4)', marginBottom: 20 }} />
          <span style={{ color: '#6b7280', fontFamily: 'monospace', fontSize: 12, letterSpacing: 2 }}>
            COMPUTER IS SLEEPING • CLICK ANYWHERE TO WAKE
          </span>
        </div>
      )}
      </div>

      {/* Portfolio Showcase Section (Full section below desktop surface) */}
      <PortfolioShowcase
        onOpenDesktopApp={handleOpenFromShowcase}
        onScrollToDesktop={scrollToDesktop}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    </div>
  );
}
