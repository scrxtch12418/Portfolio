import React from 'react';

const WALLPAPERS = [
  { id: 'aqua', label: 'Classic Aqua', src: '/images/aqua-wallpaper.webp' },
  { id: 'baja-coast', label: 'Baja Coast', src: '/images/baja-coast.webp' },
  { id: 'baja-sunset', label: 'Baja Sunset', src: '/images/baja-sunset.webp' },
  { id: 'autumn', label: 'Autumn', src: '/images/autumn.webp' }
];

const TIME_ZONES = [
  { label: 'Local Time (Automatic)', value: 'local' },
  { label: 'India Standard Time (IST)', value: 'Asia/Kolkata' },
  { label: 'US Pacific Time (PT)', value: 'America/Los_Angeles' },
  { label: 'US Eastern Time (ET)', value: 'America/New_York' },
  { label: 'London (GMT/BST)', value: 'Europe/London' },
  { label: 'Tokyo (JST)', value: 'Asia/Tokyo' }
];

export default function AquaPrefsApp({
  currentWallpaper = 'aqua',
  onSelectWallpaper,
  timeZone = 'local',
  onChangeTimeZone,
  fontScale = 100,
  onChangeFontScale,
  desktopZoom = '1.25',
  onChangeDesktopZoom,
  nightTint = false,
  onToggleNightTint,
  theme = 'light',
  onChangeTheme
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'inherit', color: '#1f2937' }}>
      {/* 1. Wallpaper Selection */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderBottom: '1px solid #f3f4f6', paddingBottom: 6 }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: '#111827' }}>
            Desktop Wallpaper
          </h4>
          <span style={{ fontSize: 10, color: '#6b7280' }}>Mac OS X Themes</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {WALLPAPERS.map(item => {
            const isSelected = currentWallpaper === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelectWallpaper?.(item.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 6,
                  borderRadius: 6,
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #3b82f6' : '1px solid #d1d5db',
                  backgroundColor: isSelected ? '#eff6ff' : '#f9fafb',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ width: '100%', height: 60, borderRadius: 4, overflow: 'hidden', position: 'relative', backgroundColor: '#e5e7eb' }}>
                  <img
                    src={item.src}
                    alt={item.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>
                <span style={{ fontSize: 11, fontWeight: isSelected ? 700 : 500, color: isSelected ? '#1d4ed8' : '#374151', marginTop: 4 }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Clock & Time Zone */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, borderBottom: '1px solid #f3f4f6', paddingBottom: 6 }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: '#111827' }}>
            Date & Time Zone
          </h4>
          <span style={{ fontSize: 10, color: '#6b7280' }}>Menubar Clock</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="tz-select" style={{ fontSize: 11, color: '#4b5563', fontWeight: 600 }}>
            Select Display Time Zone:
          </label>
          <select
            id="tz-select"
            value={timeZone}
            onChange={(e) => onChangeTimeZone?.(e.target.value)}
            style={{
              padding: '6px 8px',
              borderRadius: 6,
              border: '1px solid #d1d5db',
              fontSize: 12,
              backgroundColor: '#ffffff',
              color: '#1f2937',
              outline: 'none',
              fontFamily: 'inherit',
              cursor: 'pointer'
            }}
          >
            {TIME_ZONES.map(tz => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Appearance & Sizing */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: 6 }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: '#111827' }}>
            System Appearance
          </h4>
          <span style={{ fontSize: 10, color: '#6b7280' }}>Display Tweaks</span>
        </div>

        {/* UI Color Theme */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: 8 }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block' }}>Color Theme:</span>
            <span style={{ fontSize: 10, color: '#6b7280' }}>Light (Default) or Dark mode</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              type="button"
              onClick={() => onChangeTheme?.('light')}
              className={`aqua-btn ${theme === 'light' ? 'primary' : ''}`}
              style={{ padding: '3px 10px', fontSize: 11 }}
            >
              ☀️ Light (Default)
            </button>
            <button
              type="button"
              onClick={() => onChangeTheme?.('dark')}
              className={`aqua-btn ${theme === 'dark' ? 'primary' : ''}`}
              style={{ padding: '3px 10px', fontSize: 11 }}
            >
              🌙 Dark
            </button>
          </div>
        </div>

        {/* Display Zoom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: 8 }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block' }}>Display Zoom:</span>
            <span style={{ fontSize: 10, color: '#6b7280' }}>Scale UI closer / larger</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { label: '100%', val: '1' },
              { label: '115%', val: '1.15' },
              { label: '125% (Default)', val: '1.25' },
              { label: '135%', val: '1.35' }
            ].map(item => (
              <button
                key={item.val}
                type="button"
                onClick={() => onChangeDesktopZoom?.(item.val)}
                className={`aqua-btn ${desktopZoom === item.val ? 'primary' : ''}`}
                style={{ padding: '3px 10px', fontSize: 11 }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Scale */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Font Scaling:</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {[90, 100, 110].map(scale => (
              <button
                key={scale}
                type="button"
                onClick={() => onChangeFontScale?.(scale)}
                className={`aqua-btn ${fontScale === scale ? 'primary' : ''}`}
                style={{ padding: '3px 10px', fontSize: 11 }}
              >
                {scale}%
              </button>
            ))}
          </div>
        </div>

        {/* Night Tint */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Night Tint:</span>
          <button
            type="button"
            onClick={() => onToggleNightTint?.(!nightTint)}
            className={`aqua-btn ${nightTint ? 'primary' : ''}`}
            style={{ padding: '4px 12px', fontSize: 11 }}
          >
            {nightTint ? 'Active (Tinted)' : 'Disabled (Clear)'}
          </button>
        </div>
      </div>
    </div>
  );
}
