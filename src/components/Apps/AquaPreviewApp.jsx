import React, { useState } from 'react';

export default function AquaPreviewApp({
  imageSrc,
  title = 'Untitled Image',
  items = [],
  currentIndex = 0,
  onNavigate
}) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const currentItem = items.length > 0 ? items[currentIndex] : null;
  const activeSrc = currentItem?.src || currentItem?.thumbnail || imageSrc || '/images/user_profile.png';
  const activeTitle = currentItem?.name || currentItem?.title || title;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setRotation(0);
  };
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#262626', color: '#f3f4f6', fontFamily: 'inherit', userSelect: 'none' }}>
      {/* Top Controls Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 12px',
          backgroundColor: '#374151',
          borderBottom: '1px solid #1f2937',
          fontSize: 12
        }}
      >
        {/* Navigation if multiple items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {items.length > 1 && (
            <div style={{ display: 'flex', borderRadius: 4, overflow: 'hidden', border: '1px solid #6b7280' }}>
              <button
                type="button"
                onClick={() => onNavigate?.(Math.max(0, currentIndex - 1))}
                disabled={currentIndex <= 0}
                style={{
                  padding: '2px 8px',
                  backgroundColor: '#4b5563',
                  color: '#ffffff',
                  border: 'none',
                  cursor: currentIndex <= 0 ? 'not-allowed' : 'pointer',
                  opacity: currentIndex <= 0 ? 0.4 : 1
                }}
              >
                ◀
              </button>
              <div style={{ width: 1, backgroundColor: '#6b7280' }} />
              <button
                type="button"
                onClick={() => onNavigate?.(Math.min(items.length - 1, currentIndex + 1))}
                disabled={currentIndex >= items.length - 1}
                style={{
                  padding: '2px 8px',
                  backgroundColor: '#4b5563',
                  color: '#ffffff',
                  border: 'none',
                  cursor: currentIndex >= items.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: currentIndex >= items.length - 1 ? 0.4 : 1
                }}
              >
                ▶
              </button>
            </div>
          )}
          <span style={{ fontSize: 11, color: '#e5e7eb', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {activeTitle}
          </span>
        </div>

        {/* Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', borderRadius: 4, overflow: 'hidden', border: '1px solid #6b7280' }}>
            <button
              type="button"
              onClick={handleZoomOut}
              style={{ padding: '2px 8px', backgroundColor: '#4b5563', color: '#ffffff', border: 'none', cursor: 'pointer' }}
              title="Zoom Out"
            >
              -
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              style={{ padding: '2px 8px', backgroundColor: '#374151', color: '#ffffff', border: 'none', cursor: 'pointer', fontSize: 11 }}
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              style={{ padding: '2px 8px', backgroundColor: '#4b5563', color: '#ffffff', border: 'none', cursor: 'pointer' }}
              title="Zoom In"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleRotate}
            className="aqua-btn"
            style={{ padding: '2px 8px', fontSize: 11 }}
          >
            ↷ Rotate
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          backgroundColor: '#171717'
        }}
      >
        <div
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transition: 'transform 0.15s ease-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={activeSrc}
            alt={activeTitle}
            style={{
              maxHeight: '52vh',
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: 4,
              boxShadow: '0 8px 30px rgba(0,0,0,0.7)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div
        style={{
          padding: '4px 12px',
          backgroundColor: '#262626',
          borderTop: '1px solid #333333',
          fontSize: 10,
          color: '#9ca3af',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <span>{items.length > 0 ? `${currentIndex + 1} of ${items.length}` : '1 image'}</span>
        <span>{activeTitle}</span>
        <span>Ready</span>
      </div>
    </div>
  );
}
