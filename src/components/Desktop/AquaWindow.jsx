import React, { useState, useRef, useEffect } from 'react';

export default function AquaWindow({
  title,
  children,
  initialX = 120,
  initialY = 70,
  width = 540,
  height,
  isActive = true,
  onClose,
  onFocus,
  onMinimize,
  minimizeTarget: _minimizeTarget,
  isMinimized = false,
  sendOff: _sendOff = false
}) {
  const [pos, setPos] = useState(() => {
    if (typeof window !== 'undefined') {
      const z = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--desktop-zoom')) || 1.25;
      const containerW = window.innerWidth / z;
      const maxX = Math.max(16, containerW - Math.min(width, containerW - 24) - 24);
      return { x: Math.min(Math.max(16, initialX), maxX), y: Math.max(34, initialY) };
    }
    return { x: initialX, y: initialY };
  });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 640;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [customSize, setCustomSize] = useState(height ? { w: width, h: height } : null);
  const [resizeMode, setResizeMode] = useState(null);

  const dragOffset = useRef({ x: 0, y: 0, pointerId: -1 });
  const resizeStart = useRef({ mx: 0, my: 0, w: 0, h: 0, x: 0, pointerId: -1 });
  const windowRef = useRef(null);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 200);
  };

  const toggleZoom = () => {
    setIsZoomed(prev => !prev);
  };

  const getZoom = () => {
    if (typeof window === 'undefined') return 1.25;
    const z = getComputedStyle(document.documentElement).getPropertyValue('--desktop-zoom');
    return parseFloat(z) || 1.25;
  };

  const handleTitlePointerDown = (e) => {
    if (e.target.closest('.no-drag') || isZoomed || isMobile) return;
    onFocus?.();
    if (!isDragging) {
      setIsDragging(true);
      dragOffset.current = {
        mx: e.clientX,
        my: e.clientY,
        posX: pos.x,
        posY: pos.y,
        pointerId: e.pointerId
      };
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (e) => {
      if (e.pointerId !== dragOffset.current.pointerId) return;
      const zoom = getZoom();
      const dx = (e.clientX - dragOffset.current.mx) / zoom;
      const dy = (e.clientY - dragOffset.current.my) / zoom;

      const el = windowRef.current;
      const winW = el?.offsetWidth ?? width;
      const winH = el?.offsetHeight ?? 300;

      const containerW = el?.closest('.aqua-os-root')?.clientWidth || (window.innerWidth / zoom);
      const containerH = el?.closest('.aqua-os-root')?.clientHeight || (window.innerHeight / zoom);

      const maxX = Math.max(8, containerW - winW - 12);
      const maxY = Math.max(34, containerH - winH - 64);

      setPos({
        x: Math.min(Math.max(8, dragOffset.current.posX + dx), maxX),
        y: Math.min(Math.max(34, dragOffset.current.posY + dy), maxY)
      });
    };

    const onPointerUp = (e) => {
      if (e.pointerId === dragOffset.current.pointerId) {
        setIsDragging(false);
      }
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerUp);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointercancel', onPointerUp);
    };
  }, [isDragging, width]);

  // Corner resize handling
  const startResize = (mode) => (e) => {
    if (isMobile) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus?.();
    const el = windowRef.current;
    resizeStart.current = {
      mx: e.clientX,
      my: e.clientY,
      w: el?.offsetWidth ?? (customSize?.w || width),
      h: el?.offsetHeight ?? (customSize?.h || 320),
      x: pos.x,
      pointerId: e.pointerId
    };
    setResizeMode(mode);
  };

  useEffect(() => {
    if (!resizeMode) return;

    const onPointerMove = (e) => {
      const s = resizeStart.current;
      if (e.pointerId !== s.pointerId) return;
      const zoom = getZoom();
      const dx = (e.clientX - s.mx) / zoom;
      const dy = (e.clientY - s.my) / zoom;

      const el = windowRef.current;
      const containerW = el?.closest('.aqua-os-root')?.clientWidth || (window.innerWidth / zoom);
      const containerH = el?.closest('.aqua-os-root')?.clientHeight || (window.innerHeight / zoom);

      const maxH = containerH - 34 - 70;
      const newH = Math.min(Math.max(s.h + dy, 200), maxH);

      if (resizeMode === 'br') {
        const maxW = Math.max(300, containerW - s.x - 16);
        const newW = Math.min(Math.max(s.w + dx, 300), maxW);
        setCustomSize({ w: newW, h: newH });
      } else {
        const maxW = Math.max(300, s.x + s.w - 16);
        const newW = Math.min(Math.max(s.w - dx, 300), maxW);
        setCustomSize({ w: newW, h: newH });
        setPos(prev => ({ ...prev, x: s.x + (s.w - newW) }));
      }
    };

    const onPointerUp = (e) => {
      if (e.pointerId === resizeStart.current.pointerId) {
        setResizeMode(null);
      }
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerUp);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointercancel', onPointerUp);
    };
  }, [resizeMode]);

  const mobileNormalStyle = {
    position: 'absolute',
    left: '8px',
    top: '32px',
    width: 'calc(100% - 16px)',
    maxWidth: 'calc(100vw - 16px)',
    height: 'calc(100% - 92px)',
    maxHeight: 'calc(100vh - 92px)',
    borderRadius: '8px'
  };

  const mobileZoomedStyle = {
    position: 'absolute',
    left: '4px',
    top: '28px',
    width: 'calc(100% - 8px)',
    maxWidth: 'calc(100vw - 8px)',
    height: 'calc(100% - 32px)',
    maxHeight: 'calc(100vh - 32px)',
    borderRadius: '6px'
  };

  const desktopZoomedStyle = {
    position: 'absolute',
    left: '10px',
    top: '32px',
    width: 'calc(100vw - 20px)',
    maxWidth: 'calc(100vw - 20px)',
    height: 'calc(100vh - 100px)',
    maxHeight: 'calc(100vh - 100px)'
  };

  const desktopNormalStyle = {
    position: 'absolute',
    left: `${pos.x}px`,
    top: `${pos.y}px`,
    width: `${customSize ? customSize.w : width}px`,
    height: customSize ? `${customSize.h}px` : (height ? `${height}px` : undefined),
    maxWidth: 'calc(100vw - 24px)',
    maxHeight: 'calc(100vh - 100px)'
  };

  const windowStyle = isMobile
    ? (isZoomed ? mobileZoomedStyle : mobileNormalStyle)
    : (isZoomed ? desktopZoomedStyle : desktopNormalStyle);

  return (
    <div
      ref={windowRef}
      className={`aqua-window ${isActive ? 'active' : ''} ${isClosing ? 'window-closing' : 'window-opening'}`}
      style={{
        ...windowStyle,
        display: isMinimized ? 'none' : 'flex'
      }}
      onMouseDown={() => onFocus?.()}
    >
      {/* Titlebar */}
      <div
        className={`aqua-titlebar ${isActive ? 'active' : ''}`}
        onPointerDown={handleTitlePointerDown}
        onDoubleClick={toggleZoom}
      >
        {/* Traffic Lights */}
        <div className="traffic-light-container no-drag">
          <button
            type="button"
            className={`traffic-light ${isActive ? 'traffic-red' : 'traffic-inactive'}`}
            onClick={handleClose}
            aria-label="Close"
          >
            <span className="traffic-icon">✕</span>
          </button>
          <button
            type="button"
            className={`traffic-light ${isActive ? 'traffic-yellow' : 'traffic-inactive'}`}
            onClick={onMinimize || handleClose}
            aria-label="Minimize"
          >
            <span className="traffic-icon">—</span>
          </button>
          <button
            type="button"
            className={`traffic-light ${isActive ? 'traffic-green' : 'traffic-inactive'}`}
            onClick={toggleZoom}
            aria-label={isZoomed ? 'Restore' : 'Zoom'}
          >
            <span className="traffic-icon">+</span>
          </button>
        </div>

        {/* Window Title */}
        <div className="aqua-title">{title}</div>
      </div>

      {/* Window Body with Pinstripe Background */}
      <div
        className="aqua-pinstripes aqua-window-body"
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff'
        }}
      >
        {children}
      </div>

      {/* Resize handles */}
      {!isZoomed && !isMobile && (
        <>
          <div
            className="aqua-resize-handle-br no-drag"
            onPointerDown={startResize('br')}
            aria-hidden="true"
          />
          <div
            className="aqua-resize-handle-bl no-drag"
            onPointerDown={startResize('bl')}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
