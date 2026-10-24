import React from 'react';

export default function AquaProjectWindow({
  title,
  shortTitle: _shortTitle,
  summary,
  description,
  githubUrl,
  role,
  tags = [],
  features = [],
  challenges,
  heroImage,
  rarity,
  rarityColor = '#3b82f6'
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'inherit', color: '#1f2937' }}>
      {/* Hero Visual Preview if provided */}
      {heroImage && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 180,
            borderRadius: 6,
            overflow: 'hidden',
            border: '1px solid #d1d5db',
            backgroundColor: '#111827',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
          }}
        >
          <img
            src={heroImage}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Header with Title and Tags */}
      <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <h2 style={{ fontSize: 21, fontWeight: 700, color: '#111827', margin: 0 }}>
            {title}
          </h2>
          {rarity && (
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 800,
                color: rarityColor,
                border: `1.5px solid ${rarityColor}`,
                padding: '3px 10px',
                borderRadius: 14,
                backgroundColor: 'rgba(0,0,0,0.03)',
                letterSpacing: 0.5
              }}
            >
              {rarity}
            </span>
          )}
        </div>

        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  padding: '3px 10px',
                  borderRadius: 5
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Summary Box */}
      {summary && (
        <div
          style={{
            backgroundColor: '#f8fafc',
            borderLeft: '4px solid #3b82f6',
            padding: '12px 16px',
            borderRadius: '0 8px 8px 0',
            fontSize: 14,
            lineHeight: 1.6,
            color: '#334155'
          }}
        >
          {summary}
        </div>
      )}

      {/* Detailed Description */}
      {description && (
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
            Overview
          </h4>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: '#374151', margin: 0 }}>
            {description}
          </p>
        </div>
      )}

      {/* Role */}
      {role && (
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 14px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>Role</span>
          <p style={{ fontSize: 13.5, fontWeight: 600, color: '#111827', margin: '3px 0 0 0' }}>{role}</p>
        </div>
      )}

      {/* Key Features */}
      {features.length > 0 && (
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
            Key Architecture & Features
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13.5, lineHeight: 1.65, color: '#374151' }}>
            {features.map((feat, idx) => (
              <li key={idx} style={{ marginBottom: 5 }}>{feat}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Engineering Challenges */}
      {challenges && (
        <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fde68a', borderRadius: 8, padding: '12px 14px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>Engineering Challenge</span>
          <p style={{ fontSize: 13, color: '#78350f', margin: '4px 0 0 0', lineHeight: 1.55 }}>{challenges}</p>
        </div>
      )}

      {/* External Action Button */}
      {githubUrl && (
        <div style={{ paddingTop: 8 }}>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="aqua-btn primary"
            style={{ padding: '9px 22px', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <span>View Source on GitHub</span>
            <span>↗</span>
          </a>
        </div>
      )}
    </div>
  );
}
