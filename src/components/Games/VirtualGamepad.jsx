import React, { useRef, useEffect } from 'react';
import { soundManager } from '../../utils/soundManager';

/**
 * VirtualGamepad — Retro Arcade Controller for Touch & Desktop
 * Provides an authentic retro arcade D-Pad, directional hold,
 * and tactile action buttons with haptic sound feedback.
 */
export default function VirtualGamepad({
  onUp,
  onDown,
  onLeft,
  onRight,
  actions = [], // Array of { id, label, sublabel, color: 'red'|'blue'|'green'|'amber', onClick }
  showDpad = true,
  horizontalOnly = false,
  onReset,
  resetLabel = 'Reset'
}) {
  const holdIntervalRef = useRef(null);

  // Clear any active button hold on unmount
  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const startHold = (callback) => {
    if (!callback) return;
    soundManager.playClick();
    callback();

    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    // Initial delay before continuous repeat
    holdIntervalRef.current = setTimeout(() => {
      holdIntervalRef.current = setInterval(() => {
        callback();
      }, 70);
    }, 180);
  };

  const endHold = () => {
    if (holdIntervalRef.current) {
      clearTimeout(holdIntervalRef.current);
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  const handleActionClick = (callback) => {
    soundManager.playClick();
    callback?.();
  };

  return (
    <div className="virtual-gamepad-root" role="region" aria-label="Game Controller">
      {/* Directional Pad / Controls */}
      {showDpad && (
        <div className={`virtual-dpad-container ${horizontalOnly ? 'horizontal-only' : ''}`}>
          {horizontalOnly ? (
            <div className="dpad-horizontal-row">
              <button
                type="button"
                className="dpad-btn dpad-left-large"
                onPointerDown={() => startHold(onLeft)}
                onPointerUp={endHold}
                onPointerLeave={endHold}
                onPointerCancel={endHold}
                aria-label="Move Left"
              >
                ◀ LEFT
              </button>
              <button
                type="button"
                className="dpad-btn dpad-right-large"
                onPointerDown={() => startHold(onRight)}
                onPointerUp={endHold}
                onPointerLeave={endHold}
                onPointerCancel={endHold}
                aria-label="Move Right"
              >
                RIGHT ▶
              </button>
            </div>
          ) : (
            <div className="dpad-cross-grid">
              <div />
              <button
                type="button"
                className="dpad-btn dpad-up"
                onPointerDown={() => startHold(onUp)}
                onPointerUp={endHold}
                onPointerLeave={endHold}
                onPointerCancel={endHold}
                aria-label="Move Up"
              >
                ▲
              </button>
              <div />

              <button
                type="button"
                className="dpad-btn dpad-left"
                onPointerDown={() => startHold(onLeft)}
                onPointerUp={endHold}
                onPointerLeave={endHold}
                onPointerCancel={endHold}
                aria-label="Move Left"
              >
                ◀
              </button>
              <div className="dpad-center" />
              <button
                type="button"
                className="dpad-btn dpad-right"
                onPointerDown={() => startHold(onRight)}
                onPointerUp={endHold}
                onPointerLeave={endHold}
                onPointerCancel={endHold}
                aria-label="Move Right"
              >
                ▶
              </button>

              <div />
              <button
                type="button"
                className="dpad-btn dpad-down"
                onPointerDown={() => startHold(onDown)}
                onPointerUp={endHold}
                onPointerLeave={endHold}
                onPointerCancel={endHold}
                aria-label="Move Down"
              >
                ▼
              </button>
              <div />
            </div>
          )}
        </div>
      )}

      {/* Action Buttons (A, B, Jump, Rotate, etc.) */}
      {(actions.length > 0 || onReset) && (
        <div className="virtual-actions-container">
          {actions.map((act) => (
            <button
              key={act.id || act.label}
              type="button"
              className={`arcade-round-btn btn-${act.color || 'red'}`}
              onPointerDown={() => handleActionClick(act.onClick)}
              aria-label={act.sublabel || act.label}
            >
              <span className="arcade-btn-label">{act.label}</span>
              {act.sublabel && <span className="arcade-btn-sublabel">{act.sublabel}</span>}
            </button>
          ))}

          {onReset && (
            <button
              type="button"
              className="arcade-pill-btn"
              onClick={() => {
                soundManager.playClick();
                onReset();
              }}
              title="Restart / Reset Game"
            >
              ↺ {resetLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
