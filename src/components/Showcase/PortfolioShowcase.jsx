import React, { useState, useRef } from 'react';
import { PERSONAL_INFO, PROJECTS, SKILLS, CERTIFICATIONS, DESIGNS, SPEAKING_EVENTS } from '../../data/portfolioData';

export default function PortfolioShowcase({
  onOpenDesktopApp,
  onScrollToDesktop,
  theme: propTheme,
  onToggleTheme
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePreview, setActivePreview] = useState(null);
  const [pokeIndex, setPokeIndex] = useState(0);
  const [isPoked, setIsPoked] = useState(false);
  const pokeTimerRef = useRef(null);

  const handlePoke = () => {
    setPokeIndex(prev => (prev + 1) % PERSONAL_INFO.pokeQuotes.length);
    setIsPoked(true);
    if (pokeTimerRef.current) clearTimeout(pokeTimerRef.current);
    pokeTimerRef.current = setTimeout(() => {
      setIsPoked(false);
    }, 1800);
  };

  const [internalTheme, setInternalTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aqua_ui_theme') || 'light';
    }
    return 'light';
  });

  const activeTheme = propTheme || internalTheme;
  const isLight = activeTheme === 'light';

  const handleToggleTheme = () => {
    if (onToggleTheme) {
      onToggleTheme();
    } else {
      const next = isLight ? 'dark' : 'light';
      setInternalTheme(next);
      if (typeof window !== 'undefined') {
        localStorage.setItem('aqua_ui_theme', next);
      }
    }
  };

  const t = {
    rootBg: isLight ? '#f4f6fa' : '#070a14',
    rootText: isLight ? '#1e293b' : '#f3f4f6',
    borderTop: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(59, 130, 246, 0.3)',
    navBg: isLight ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.82)',
    navBorder: isLight ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.14)',
    navShadow: isLight ? '0 8px 30px rgba(0, 0, 0, 0.08)' : '0 8px 32px rgba(0, 0, 0, 0.5)',
    heading: isLight ? '#0f172a' : '#ffffff',
    subheading: isLight ? '#2563eb' : '#38bdf8',
    cardBg: isLight ? '#ffffff' : 'rgba(15, 23, 42, 0.75)',
    cardBorder: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.1)',
    cardShadow: isLight ? '0 4px 18px rgba(0, 0, 0, 0.06)' : '0 6px 20px rgba(0, 0, 0, 0.4)',
    textPrimary: isLight ? '#0f172a' : '#ffffff',
    textSecondary: isLight ? '#64748b' : '#9ca3af',
    textBody: isLight ? '#334155' : '#d1d5db',
    chipBg: isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.08)',
    chipText: isLight ? '#475569' : '#d1d5db',
    chipBorder: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.12)',
    badgeBg: isLight ? 'rgba(37, 99, 235, 0.08)' : 'rgba(56, 189, 248, 0.15)',
    badgeText: isLight ? '#2563eb' : '#38bdf8',
    badgeBorder: isLight ? '1px solid rgba(37, 99, 235, 0.2)' : '1px solid rgba(56, 189, 248, 0.3)',
    pillActiveBg: '#2563eb',
    pillActiveText: '#ffffff',
    pillInactiveBg: isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)',
    pillInactiveText: isLight ? '#334155' : '#ffffff',
    pillInactiveBorder: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.12)',
    boxBg: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
    boxBorder: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: isLight ? '0 4px 16px rgba(0, 0, 0, 0.05)' : 'none'
  };

  const sections = [
    { id: 'about', label: '👤 About Me' },
    { id: 'projects', label: '💼 Projects' },
    { id: 'skills', label: '⚡ Skills Matrix' },
    { id: 'designs', label: '🎨 Posters & Art' },
    { id: 'speaking', label: '🎤 Speaking & MUN' },
    { id: 'certs', label: '📜 Certifications' },
    { id: 'arcade', label: '🕹️ Retro Arcade' }
  ];

  const scrollToId = (id) => {
    setActiveCategory(id);
    const el = document.getElementById(`showcase-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLaunchInOS = (appId) => {
    onScrollToDesktop?.();
    setTimeout(() => {
      onOpenDesktopApp?.(appId);
    }, 450);
  };

  return (
    <div
      id="portfolio-showcase-root"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: t.rootBg,
        color: t.rootText,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Lucida Grande", "Segoe UI", Roboto, sans-serif',
        padding: '30px 24px 80px 24px',
        borderTop: t.borderTop,
        boxShadow: isLight ? '0 -10px 30px rgba(0, 0, 0, 0.04)' : '0 -20px 40px rgba(0, 0, 0, 0.8)',
        zIndex: 50,
        transition: 'background-color 0.25s ease, color 0.25s ease'
      }}
    >
      {/* Sticky Top Filter & Navigation Bar */}
      <div
        style={{
          position: 'sticky',
          top: 12,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          backgroundColor: t.navBg,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: t.navBorder,
          borderRadius: 16,
          padding: '10px 18px',
          boxShadow: t.navShadow,
          marginBottom: 36
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src="/images/user_profile.png"
            alt="Sarvasva"
            style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '2px solid #38bdf8' }}
          />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.heading, letterSpacing: '0.02em' }}>Sarvasva's Showcase</div>
            <div style={{ fontSize: 11, color: t.subheading, fontWeight: 600 }}>Portfolio & Works Carousel</div>
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {sections.map(sec => (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToId(sec.id)}
              className="aqua-btn"
              style={{
                fontSize: 12,
                padding: '5px 12px',
                borderRadius: 20,
                backgroundColor: activeCategory === sec.id ? t.pillActiveBg : t.pillInactiveBg,
                color: activeCategory === sec.id ? t.pillActiveText : t.pillInactiveText,
                borderColor: activeCategory === sec.id ? '#60a5fa' : t.pillInactiveBorder
              }}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Actions (Theme Switch & Return to Desktop) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            onClick={handleToggleTheme}
            className="aqua-btn"
            style={{
              fontSize: 12,
              padding: '6px 14px',
              borderRadius: 20,
              fontWeight: 700,
              backgroundColor: isLight ? '#ffffff' : 'rgba(255,255,255,0.12)',
              color: isLight ? '#0f172a' : '#ffffff',
              boxShadow: isLight ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
            }}
            title="Switch between Light and Dark mode"
          >
            {isLight ? '☀️ Light (Default)' : '🌙 Dark'}
          </button>

          <button
            type="button"
            onClick={onScrollToDesktop}
            className="aqua-btn primary"
            style={{ fontSize: 12, padding: '6px 16px', borderRadius: 20, fontWeight: 700 }}
          >
            ↑ Return to Desktop
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: ABOUT ME SHOWCASE
          ========================================================================= */}
      <section id="showcase-about" style={{ marginBottom: 54 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: t.heading, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>👤</span> About Sarvasva
          </h2>
          <button
            type="button"
            onClick={() => handleLaunchInOS('about')}
            className="aqua-btn"
            style={{ fontSize: 12, padding: '4px 12px' }}
          >
            Open in OS Window ↗
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 28,
            backgroundColor: t.boxBg,
            border: t.boxBorder,
            borderRadius: 16,
            padding: '28px 24px 34px',
            boxShadow: t.boxShadow,
            alignItems: 'center'
          }}
        >
          {/* The Big Bubble & Orbiting Rings Centerpiece */}
          <div className="photo-zone">
            {/* Corner Brackets */}
            <div className="photo-bracket bracket-tl" />
            <div className="photo-bracket bracket-tr" />
            <div className="photo-bracket bracket-bl" />
            <div className="photo-bracket bracket-br" />

            {/* Orbiting cyber rings */}
            <div className="photo-decor-ring ring-outer" />
            <div className="photo-decor-ring ring-mid" />
            <div className="photo-decor-ring ring-inner" />

            {/* Cyber Telemetry overlays */}
            <div className="photo-telemetry tel-top-left">SYS_STATUS: ENGAGED<br />GRID_COORD: 42.88.99</div>
            <div className="photo-telemetry tel-top-right">TRAJECTORY: STABLE<br />OPERATOR_ID: SRX_12</div>
            <div className="photo-telemetry tel-bottom-left">CORE_TEMP: NOMINAL<br />RECEPTOR: ACTIVE</div>
            <div className="photo-telemetry tel-bottom-right">HZ_FREQ: 2.45 GHz<br />ENCRYPTION: SHIELDED</div>

            {/* Clickable Photo Container (The Big Bubble) */}
            <div
              id="profilePhotoContainer"
              className={`photo-container ${isPoked ? 'poked' : ''}`}
              onClick={handlePoke}
              title="Click the big bubble to poke Sarvasva!"
            >
              <img
                src={PERSONAL_INFO.profilePhoto}
                alt="Sarvasva Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* The Big Speech Dialogue Bubble */}
            <div id="pokeDialog" className={`poke-bubble ${isPoked ? 'active' : ''}`}>
              {PERSONAL_INFO.pokeQuotes[pokeIndex]}
            </div>
          </div>

          {/* Bio & Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: t.heading, margin: '0 0 4px 0' }}>{PERSONAL_INFO.name}</h3>
              <div style={{ fontSize: 13, color: t.subheading, fontWeight: 600, marginBottom: 8 }}>{PERSONAL_INFO.title}</div>
              <p style={{ fontSize: 13, color: t.textSecondary, margin: 0, lineHeight: 1.45 }}>{PERSONAL_INFO.tagline}</p>
            </div>

            <p style={{ fontSize: 13, color: t.textBody, lineHeight: 1.6, margin: 0 }}>{PERSONAL_INFO.bio}</p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
              <span style={{ fontSize: 11, backgroundColor: t.badgeBg, color: t.badgeText, padding: '4px 10px', borderRadius: 12, border: t.badgeBorder, fontWeight: 600 }}>📍 {PERSONAL_INFO.contact.location}</span>
              <span style={{ fontSize: 11, backgroundColor: isLight ? 'rgba(147, 51, 234, 0.08)' : 'rgba(168, 85, 247, 0.15)', color: isLight ? '#7e22ce' : '#c084fc', padding: '4px 10px', borderRadius: 12, border: isLight ? '1px solid rgba(147, 51, 234, 0.2)' : '1px solid rgba(168, 85, 247, 0.3)', fontWeight: 600 }}>🎓 NMAMIT Computer Science</span>
              <span style={{ fontSize: 11, backgroundColor: isLight ? 'rgba(22, 163, 74, 0.08)' : 'rgba(34, 197, 94, 0.15)', color: isLight ? '#15803d' : '#4ade80', padding: '4px 10px', borderRadius: 12, border: isLight ? '1px solid rgba(22, 163, 74, 0.2)' : '1px solid rgba(34, 197, 94, 0.3)', fontWeight: 600 }}>🛡️ Pentester & DevSecOps</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PROJECTS CAROUSEL
          ========================================================================= */}
      <section id="showcase-projects" style={{ marginBottom: 54 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: t.heading, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>💼</span> Featured Engineering Projects
          </h2>
          <button
            type="button"
            onClick={() => handleLaunchInOS('projects')}
            className="aqua-btn"
            style={{ fontSize: 12, padding: '4px 12px' }}
          >
            Open Projects Folder ↗
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div
          style={{
            display: 'flex',
            gap: 18,
            overflowX: 'auto',
            paddingBottom: 14,
            scrollSnapType: 'x mandatory'
          }}
        >
          {PROJECTS.map(proj => (
            <div
              key={proj.id}
              style={{
                flex: '0 0 320px',
                scrollSnapAlign: 'start',
                backgroundColor: t.cardBg,
                border: t.cardBorder,
                borderRadius: 14,
                padding: 18,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: t.cardShadow,
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{proj.iconEmoji || '🛡️'}</span>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary, margin: 0 }}>{proj.title}</h3>
                  <span style={{ fontSize: 11, color: t.subheading }}>{proj.category}</span>
                </div>
              </div>

              <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.45, flex: 1, margin: '0 0 12px 0' }}>
                {proj.summary}
              </p>

              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
                {proj.tags?.slice(0, 4).map(tag => (
                  <span key={tag} style={{ fontSize: 10, backgroundColor: t.chipBg, color: t.chipText, border: t.chipBorder, padding: '2px 7px', borderRadius: 8 }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                <button
                  type="button"
                  onClick={() => handleLaunchInOS(proj.id)}
                  className="aqua-btn primary"
                  style={{ flex: 1, fontSize: 11, padding: '5px 10px' }}
                >
                  View Details
                </button>
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aqua-btn"
                    style={{ fontSize: 11, padding: '5px 10px' }}
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SKILLS MATRIX CAROUSEL
          ========================================================================= */}
      <section id="showcase-skills" style={{ marginBottom: 54 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: t.heading, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>⚡</span> Skills & Proficiency Matrix
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {Object.values(SKILLS).map(group => (
            <div
              key={group.category}
              style={{
                backgroundColor: t.cardBg,
                border: t.cardBorder,
                borderRadius: 14,
                padding: 16,
                boxShadow: t.cardShadow
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 700, color: t.subheading, marginBottom: 12 }}>{group.category}</h3>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(group.skills || []).map(skill => (
                  <span
                    key={skill.name || skill}
                    style={{
                      fontSize: 11,
                      backgroundColor: t.chipBg,
                      border: t.chipBorder,
                      color: t.chipText,
                      padding: '4px 10px',
                      borderRadius: 12
                    }}
                  >
                    {skill.name || skill}
                  </span>
                ))}
                {(group.tools || []).map(tool => (
                  <span
                    key={tool}
                    style={{
                      fontSize: 11,
                      backgroundColor: isLight ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.15)',
                      border: isLight ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid rgba(59, 130, 246, 0.3)',
                      color: isLight ? '#2563eb' : '#60a5fa',
                      padding: '4px 10px',
                      borderRadius: 12
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: POSTERS & GRAPHIC DESIGNS CAROUSEL
          ========================================================================= */}
      <section id="showcase-designs" style={{ marginBottom: 54 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: t.heading, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>🎨</span> Posters & Graphic Designs
          </h2>
          <button
            type="button"
            onClick={() => handleLaunchInOS('designs')}
            className="aqua-btn"
            style={{ fontSize: 12, padding: '4px 12px' }}
          >
            Open Designs Folder ↗
          </button>
        </div>

        {/* Horizontal Posters Carousel */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            overflowX: 'auto',
            paddingBottom: 16,
            scrollSnapType: 'x mandatory'
          }}
        >
          {DESIGNS.map(d => (
            <div
              key={d.id}
              onClick={() => setActivePreview(d)}
              style={{
                flex: '0 0 210px',
                scrollSnapAlign: 'start',
                backgroundColor: t.cardBg,
                borderRadius: 12,
                overflow: 'hidden',
                border: t.cardBorder,
                cursor: 'pointer',
                boxShadow: t.cardShadow,
                transition: 'transform 0.15s ease'
              }}
            >
              <div style={{ height: 260, overflow: 'hidden', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={d.src}
                  alt={d.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: 10 }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: t.textPrimary, margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.title}</h4>
                <span style={{ fontSize: 10, color: t.textSecondary }}>{d.category} • {d.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SPEAKING & MUN EVENTS CAROUSEL
          ========================================================================= */}
      <section id="showcase-speaking" style={{ marginBottom: 54 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: t.heading, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>🎤</span> Speaking, MUN & Anchoring Events
          </h2>
          <button
            type="button"
            onClick={() => handleLaunchInOS('speaking')}
            className="aqua-btn"
            style={{ fontSize: 12, padding: '4px 12px' }}
          >
            Open Speaking Folder ↗
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
          {SPEAKING_EVENTS.map(ev => (
            <div
              key={ev.id}
              style={{
                backgroundColor: t.cardBg,
                border: t.cardBorder,
                borderRadius: 14,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: t.cardShadow
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary, margin: '0 0 4px 0' }}>{ev.title}</h3>
              <div style={{ fontSize: 12, color: t.subheading, fontWeight: 600, marginBottom: 8 }}>{ev.type}</div>
              <p style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.45, marginBottom: 12 }}>{ev.desc}</p>

              {/* Photos row */}
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginTop: 'auto' }}>
                {ev.photos?.map(p => (
                  <div key={p.src} style={{ width: 100, height: 75, borderRadius: 8, overflow: 'hidden', flexShrink: 0, backgroundColor: '#000' }}>
                    <img src={p.src} alt={p.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CERTIFICATIONS SHOWCASE
          ========================================================================= */}
      <section id="showcase-certs" style={{ marginBottom: 54 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: t.heading, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>📜</span> Verified Certifications
          </h2>
          <button
            type="button"
            onClick={() => handleLaunchInOS('certs')}
            className="aqua-btn"
            style={{ fontSize: 12, padding: '4px 12px' }}
          >
            Open Certs Folder ↗
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {CERTIFICATIONS.map(c => (
            <div
              key={c.id}
              style={{
                backgroundColor: t.cardBg,
                border: t.cardBorder,
                borderRadius: 12,
                padding: 16,
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                boxShadow: t.cardShadow
              }}
            >
              <div style={{ fontSize: 24, padding: 8, borderRadius: 8, backgroundColor: t.badgeBg }}>🛡️</div>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: t.textPrimary, margin: '0 0 2px 0' }}>{c.name}</h4>
                <div style={{ fontSize: 11, color: t.subheading, marginBottom: 4 }}>{c.issuer}</div>
                <p style={{ fontSize: 11, color: t.textSecondary, margin: 0, lineHeight: 1.4 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: RETRO ARCADE GAMES
          ========================================================================= */}
      <section id="showcase-arcade" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: t.heading, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>🕹️</span> Retro Arcade Games Hub
          </h2>
          <button
            type="button"
            onClick={() => handleLaunchInOS('games')}
            className="aqua-btn"
            style={{ fontSize: 12, padding: '4px 12px' }}
          >
            Open Arcade Folder ↗
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { id: 'pacman', name: 'Pac-Man', icon: '🟡', desc: 'Smooth retro Pac-Man with responsive turns' },
            { id: 'snake', name: 'Snake', icon: '🐍', desc: 'Relaxed speed classic snake arcade' },
            { id: 'brick-breaker', name: 'Brick Breaker', icon: '🧱', desc: '5 distinct levels with silver multi-hit bricks' },
            { id: 'tetris', name: 'Tetris', icon: '🟦', desc: 'Full rotation, hold, lines cleared' },
            { id: 'geometry-dash', name: 'Geometry Dash', icon: '⚡', desc: 'Rhythm cyber runner jump arcade' }
          ].map(g => (
            <div
              key={g.id}
              style={{
                backgroundColor: t.cardBg,
                border: t.cardBorder,
                borderRadius: 12,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: t.cardShadow
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 8 }}>{g.icon}</div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: t.textPrimary, margin: '0 0 4px 0' }}>{g.name}</h4>
              <p style={{ fontSize: 11, color: t.textSecondary, margin: '0 0 12px 0', lineHeight: 1.35 }}>{g.desc}</p>
              <button
                type="button"
                onClick={() => handleLaunchInOS(g.id)}
                className="aqua-btn primary"
                style={{ width: '100%', fontSize: 11, padding: '5px' }}
              >
                Play in Aqua OS 🎮
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox / Preview Modal for Posters */}
      {activePreview && (
        <div
          onClick={() => setActivePreview(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            backdropFilter: 'blur(8px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight: '90vh',
              maxWidth: '90vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: isLight ? '#ffffff' : '#111827',
              borderRadius: 14,
              overflow: 'hidden',
              border: isLight ? '1px solid rgba(0,0,0,0.15)' : '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ width: '100%', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid #374151', backgroundColor: isLight ? '#f8fafc' : '#1f2937' }}>
              <span style={{ fontWeight: 700, color: t.textPrimary, fontSize: 14 }}>{activePreview.title}</span>
              <button
                type="button"
                onClick={() => setActivePreview(null)}
                className="aqua-btn"
                style={{ fontSize: 11, padding: '2px 8px' }}
              >
                ✕ Close
              </button>
            </div>
            <img
              src={activePreview.src}
              alt={activePreview.title}
              style={{ maxHeight: '75vh', maxWidth: '85vw', objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
