import React, { useState, useRef } from 'react';

export default function AquaPlayerApp({
  title = 'Showreel - Speaking & Technical Showcase',
  videoSrc,
  poster = '/images/speaking_sac_2.webp'
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState('00:24');
  const [duration] = useState('01:20');
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(prev => !prev);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const curr = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 80;
      setProgress((curr / dur) * 100);

      const m = Math.floor(curr / 60);
      const s = Math.floor(curr % 60);
      setCurrentTime(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#111827', color: '#ffffff', fontFamily: 'inherit', userSelect: 'none', borderRadius: 4, overflow: 'hidden' }}>
      {/* Video Viewport */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
          />
        ) : (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              textAlign: 'center'
            }}
          >
            <img
              src={poster}
              alt={title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.55
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.3))' }} />

            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                type="button"
                onClick={togglePlay}
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: '50%',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  border: '2px solid rgba(255,255,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                  marginBottom: 10
                }}
              >
                {isPlaying ? '❚❚' : '▶'}
              </button>
              <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px 0', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                {title}
              </h4>
              <p style={{ fontSize: 11, color: '#d1d5db', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                QuickTime Cinema Stream • High Quality
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controller Strip */}
      <div
        style={{
          padding: '8px 14px',
          background: 'linear-gradient(to bottom, #374151, #1f2937)',
          borderTop: '1px solid #111827',
          display: 'flex',
          flexDirection: 'column',
          gap: 6
        }}
      >
        {/* Progress Scrub */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#9ca3af', width: 36, textAlign: 'right' }}>
            {currentTime}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            style={{ flex: 1, accentColor: '#3b82f6', height: 4, cursor: 'pointer' }}
          />
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#9ca3af', width: 36 }}>
            {duration}
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              type="button"
              onClick={togglePlay}
              className="aqua-btn primary"
              style={{ width: 28, height: 28, borderRadius: '50%', padding: 0, fontSize: 11 }}
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <span style={{ fontSize: 11, color: '#e5e7eb', marginLeft: 6 }}>
              {title}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12 }}>🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={{ width: 60, accentColor: '#3b82f6', height: 4, cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
