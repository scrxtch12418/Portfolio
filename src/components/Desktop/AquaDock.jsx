import React, { useState, useRef } from 'react';

function DockItem({
  title,
  iconSrc,
  fallbackEmoji,
  onClick,
  mouseX,
  isOpen = false
}) {
  const itemRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  // Compute magnified size based on distance to mouseX (compact dock sizing)
  let itemSize = 46;
  if (itemRef.current && mouseX !== Infinity && mouseX !== null) {
    const rect = itemRef.current.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - itemCenter);
    if (dist < 110) {
      const factor = 1 - dist / 110;
      itemSize = 46 + factor * 22; // up to 68px magnified
    }
  }

  const handleClick = (e) => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 700);
    onClick?.(e);
  };

  return (
    <div
      ref={itemRef}
      className="aqua-dock-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip on hover */}
      {isHovered && (
        <div className="aqua-dock-tooltip">
          {title}
        </div>
      )}

      {/* Dock Icon Button */}
      <button
        type="button"
        aria-label={title}
        className="aqua-dock-btn"
        style={{
          width: `${itemSize}px`,
          height: `${itemSize}px`,
          transform: isBouncing ? 'translateY(-10px)' : 'translateY(0)',
          transition: isBouncing
            ? 'transform 0.35s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
            : 'width 0.08s ease-out, height 0.08s ease-out, transform 0.15s ease'
        }}
        onClick={handleClick}
      >
        {iconSrc ? (
          <img
            src={iconSrc}
            alt={title}
            draggable={false}
            className={`aqua-dock-img ${title.includes('Sarvasva') ? 'aqua-dock-avatar' : ''}`}
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          style={{
            fontSize: `${Math.round(itemSize * 0.65)}px`,
            display: iconSrc ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
          }}
        >
          {fallbackEmoji || '📁'}
        </div>
      </button>

      {/* Running indicator dot */}
      <div
        className="aqua-dock-dot"
        style={{
          backgroundColor: isOpen ? '#ffffff' : 'transparent',
          boxShadow: isOpen ? '0 0 6px #ffffff' : 'none'
        }}
      />
    </div>
  );
}

export default function AquaDock({
  onOpenWindow,
  openWindows = [],
  minimizedWindows = [],
  onRestoreWindow
}) {
  const [mouseX, setMouseX] = useState(Infinity);

  const isOpen = (type) => openWindows.includes(type);

  const getWindowVisual = (type) => {
    switch (type) {
      case 'about': return { emoji: '👨‍💻', icon: '/images/user_profile.webp' };
      case 'llm-security': return { emoji: '🛡️', icon: '/images/biglow-icon.webp' };
      case 'rat-research': return { emoji: '💻', icon: '/images/firstlook-icon.webp' };
      case 'focus-extension': return { emoji: '⏱️', icon: '/images/overexposed-icon.webp' };
      case 'stuck-in-space': return { emoji: '🚀', icon: '/images/lacrimosa-icon.webp' };
      case 'sales-agent': return { emoji: '🤖', icon: null };
      case 'contact': return { emoji: '✉️', icon: '/images/mail-icon.webp' };
      case 'prefs': return { emoji: '⚙️', icon: null };
      case 'projects': return { emoji: '💼', icon: null };
      case 'designs': return { emoji: '🎨', icon: null };
      case 'speaking': return { emoji: '🎤', icon: null };
      case 'certs': return { emoji: '📜', icon: null };
      case 'games': return { emoji: '🕹️', icon: null };
      case 'pacman':
      case 'tom-chomp': return { emoji: '🟡', icon: null };
      case 'snake':
      case 'long-dog': return { emoji: '🐍', icon: null };
      case 'brick-breaker':
      case 'bricklow': return { emoji: '🧱', icon: null };
      case 'tetris': return { emoji: '🟦', icon: null };
      case 'geometry-dash': return { emoji: '🔺', icon: null };
      default: return { emoji: '📄', icon: null };
    }
  };

  return (
    <div className="aqua-dock-wrapper">
      <div
        className="aqua-dock-container"
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(Infinity)}
      >
        <DockItem
          title="Sarvasva (About Me)"
          iconSrc="/images/user_profile.webp"
          fallbackEmoji="👨‍💻"
          onClick={() => onOpenWindow('about')}
          mouseX={mouseX}
          isOpen={isOpen('about')}
        />
        <DockItem
          title="LLM Security Framework"
          iconSrc="/images/biglow-icon.webp"
          fallbackEmoji="🛡️"
          onClick={() => onOpenWindow('llm-security')}
          mouseX={mouseX}
          isOpen={isOpen('llm-security')}
        />
        <DockItem
          title="RAT Research Lab"
          iconSrc="/images/firstlook-icon.webp"
          fallbackEmoji="💻"
          onClick={() => onOpenWindow('rat-research')}
          mouseX={mouseX}
          isOpen={isOpen('rat-research')}
        />
        <DockItem
          title="ADHD Focus Extension"
          iconSrc="/images/overexposed-icon.webp"
          fallbackEmoji="⏱️"
          onClick={() => onOpenWindow('focus-extension')}
          mouseX={mouseX}
          isOpen={isOpen('focus-extension')}
        />
        <DockItem
          title="Stuck in Space (Godot Game)"
          iconSrc="/images/lacrimosa-icon.webp"
          fallbackEmoji="🚀"
          onClick={() => onOpenWindow('stuck-in-space')}
          mouseX={mouseX}
          isOpen={isOpen('stuck-in-space')}
        />
        <DockItem
          title="AI Sales Agent"
          fallbackEmoji="🤖"
          onClick={() => onOpenWindow('sales-agent')}
          mouseX={mouseX}
          isOpen={isOpen('sales-agent')}
        />

        {/* Divider */}
        <div className="aqua-dock-divider" />

        <DockItem
          title="Contact Operator"
          iconSrc="/images/mail-icon.webp"
          fallbackEmoji="✉️"
          onClick={() => onOpenWindow('contact')}
          mouseX={mouseX}
          isOpen={isOpen('contact')}
        />

        {/* Minimized Windows in Dock */}
        {minimizedWindows.length > 0 && (
          <>
            <div className="aqua-dock-divider" style={{ opacity: 0.5 }} />
            {minimizedWindows.map(win => {
              const vis = getWindowVisual(win.type);
              return (
                <DockItem
                  key={`min-${win.id}`}
                  title={`${win.title} (Click to Restore)`}
                  iconSrc={vis.icon}
                  fallbackEmoji={vis.emoji}
                  onClick={() => onRestoreWindow?.(win.id)}
                  mouseX={mouseX}
                  isOpen={true}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
