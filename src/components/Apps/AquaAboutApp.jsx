import React, { useState } from 'react';
import { PERSONAL_INFO, SKILLS, EXPERIENCE, EDUCATION, CERTIFICATIONS } from '../../data/portfolioData';

export default function AquaAboutApp({ onOpenContact }) {
  const [activeTab, setActiveTab] = useState('bio');
  const [pokeIndex, setPokeIndex] = useState(0);
  const [showPokeBubble, setShowPokeBubble] = useState(false);

  const handlePoke = () => {
    setPokeIndex(prev => (prev + 1) % PERSONAL_INFO.pokeQuotes.length);
    setShowPokeBubble(true);
    setTimeout(() => setShowPokeBubble(false), 2200);
  };

  const tabs = [
    { id: 'bio', label: 'Operator Bio' },
    { id: 'skills', label: 'Skill Matrix' },
    { id: 'experience', label: 'Experience' },
    { id: 'certs', label: 'Certifications' },
    { id: 'education', label: 'Education' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'inherit', color: '#1f2937' }}>
      {/* Aqua Style Tab Strip */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          borderBottom: '1px solid #d1d5db',
          paddingBottom: 8,
          marginBottom: 16,
          overflowX: 'auto'
        }}
      >
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`aqua-btn ${isActive ? 'primary' : ''}`}
              style={{
                padding: '6px 16px',
                fontSize: 13.5,
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: 4 }}>
        {/* BIO TAB */}
        {activeTab === 'bio' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Header with Avatar & Title */}
            <div
              style={{
                display: 'flex',
                gap: 18,
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: 9,
                padding: 16,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img
                  src={PERSONAL_INFO.profilePhoto}
                  alt={PERSONAL_INFO.name}
                  onClick={handlePoke}
                  title="Click portrait to poke operator!"
                  className={showPokeBubble ? 'poked' : ''}
                  style={{
                    width: 82,
                    height: 82,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    aspectRatio: '1 / 1',
                    border: '3px solid #ff0040',
                    cursor: 'pointer',
                    boxShadow: '4px 4px 0 #000, 0 3px 10px rgba(255, 0, 64, 0.35)',
                    transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                />
                {showPokeBubble && (
                  <div
                    className="poke-bubble active"
                    style={{
                      top: -46,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 11,
                      padding: '6px 12px',
                      whiteSpace: 'nowrap',
                      maxWidth: 'none'
                    }}
                  >
                    {PERSONAL_INFO.pokeQuotes[pokeIndex]}
                  </div>
                )}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>
                    {PERSONAL_INFO.name}
                  </h2>
                  <span
                    style={{
                      backgroundColor: '#dbeafe',
                      color: '#1d4ed8',
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 12
                    }}
                  >
                    {PERSONAL_INFO.operatorId}
                  </span>
                </div>
                <p style={{ fontSize: 14.5, fontWeight: 600, color: '#2563eb', margin: '3px 0 5px 0' }}>
                  {PERSONAL_INFO.title}
                </p>
                <p style={{ fontSize: 13, color: '#4b5563', margin: 0 }}>
                  {PERSONAL_INFO.tagline}
                </p>
              </div>
            </div>

            {/* Biography */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: 9,
                padding: 16,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
                About Me
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#374151', margin: 0 }}>
                {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 700, textTransform: 'uppercase' }}>Focus</span>
                <p style={{ fontSize: 14.5, fontWeight: 700, color: '#111827', margin: '3px 0 0 0' }}>Cybersecurity</p>
              </div>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 700, textTransform: 'uppercase' }}>Role</span>
                <p style={{ fontSize: 14.5, fontWeight: 700, color: '#111827', margin: '3px 0 0 0' }}>Full-Stack Eng</p>
              </div>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 700, textTransform: 'uppercase' }}>Location</span>
                <p style={{ fontSize: 14.5, fontWeight: 700, color: '#111827', margin: '3px 0 0 0' }}>Karnataka, India</p>
              </div>
            </div>

            {/* CTA Button */}
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              <button
                type="button"
                onClick={onOpenContact}
                className="aqua-btn primary"
                style={{ flex: 1, padding: '8px 20px', fontSize: 14 }}
              >
                ✉ Send Message to Sarvasva
              </button>
              <a
                href="https://github.com/scrxtch12418"
                target="_blank"
                rel="noopener noreferrer"
                className="aqua-btn"
                style={{ padding: '8px 20px', fontSize: 14 }}
              >
                GitHub Profile ↗
              </a>
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {Object.entries(SKILLS).map(([key, group]) => (
              <div
                key={key}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 9,
                  padding: 16,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderBottom: '1px solid #f3f4f6', paddingBottom: 8 }}>
                  <h4 style={{ fontSize: 14.5, fontWeight: 700, color: '#1f2937', margin: 0 }}>
                    {group.category}
                  </h4>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>
                    {group.skills.length} skills
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                  {group.skills.map((s, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: 7,
                        padding: '8px 12px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13.5, fontWeight: 600, color: '#111827' }}>{s.name}</span>
                        <span style={{ fontSize: 11.5, color: '#2563eb', fontWeight: 700 }}>{s.level}</span>
                      </div>
                      <p style={{ fontSize: 12, color: '#6b7280', margin: '3px 0 0 0' }}>{s.desc}</p>
                    </div>
                  ))}
                </div>

                {group.tools && (
                  <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {group.tools.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: '#f3f4f6',
                          color: '#4b5563',
                          fontSize: 11.5,
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: 5
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {EXPERIENCE.map(exp => (
              <div
                key={exp.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 9,
                  padding: 16,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 6 }}>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>
                      {exp.role}
                    </h4>
                    <p style={{ fontSize: 13.5, fontWeight: 600, color: '#2563eb', margin: '3px 0' }}>
                      {exp.company}
                    </p>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', backgroundColor: '#f3f4f6', padding: '3px 10px', borderRadius: 12 }}>
                    {exp.period}
                  </span>
                </div>
                <p style={{ fontSize: 13.5, color: '#374151', margin: '10px 0 8px 0', lineHeight: 1.6 }}>
                  {exp.description}
                </p>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#4b5563', lineHeight: 1.55 }}>
                  {exp.highlights.map((h, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* CERTIFICATIONS TAB */}
        {activeTab === 'certs' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {CERTIFICATIONS.map(c => (
              <div
                key={c.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 9,
                  padding: 14,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 24 }}>🛡️</span>
                  <div>
                    <h5 style={{ fontSize: 13.5, fontWeight: 700, color: '#111827', margin: 0 }}>
                      {c.name}
                    </h5>
                    <span style={{ fontSize: 11.5, color: '#2563eb', fontWeight: 600 }}>{c.issuer}</span>
                  </div>
                </div>
                <p style={{ fontSize: 12.5, color: '#4b5563', lineHeight: 1.5, margin: '4px 0 0 0', flex: 1 }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'education' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 9,
                  padding: 16,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                }}
              >
                <h4 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>
                  {edu.institution}
                </h4>
                <p style={{ fontSize: 13.5, fontWeight: 600, color: '#2563eb', margin: '4px 0' }}>
                  {edu.degree}
                </p>
                <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#6b7280', margin: '4px 0 10px 0' }}>
                  <span>Status: <strong>{edu.status}</strong></span>
                  <span>•</span>
                  <span>{edu.location}</span>
                </div>
                <p style={{ fontSize: 13.5, color: '#374151', margin: 0, lineHeight: 1.6 }}>
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
