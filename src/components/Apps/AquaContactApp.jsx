import React, { useState } from 'react';

export default function AquaContactApp({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => {
        onClose?.();
      }, 1800);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'inherit', color: '#1f2937' }}>
      {isSent ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            padding: 24,
            gap: 12
          }}
        >
          <div style={{ fontSize: 44 }}>📬</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>
            Message Dispatched!
          </h3>
          <p style={{ fontSize: 13, color: '#4b5563', maxWidth: 300, margin: 0 }}>
            Thank you for reaching out to Sarvasva. Your email has been delivered to <strong>sarvasva5758@gmail.com</strong>.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10 }}
        >
          {/* Header Strip */}
          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>
              New Message — Mail
            </h3>
            <p style={{ fontSize: 12.5, color: '#6b7280', margin: '3px 0 0 0' }}>
              Direct line to Sarvasva (scrxtch12418)
            </p>
          </div>

          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* To */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5 }}>
              <span style={{ width: 75, fontWeight: 600, color: '#4b5563', textAlign: 'right' }}>To:</span>
              <div
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: 6,
                  border: '1px solid #d1d5db',
                  color: '#1f2937',
                  fontWeight: 600,
                  fontSize: 13.5
                }}
              >
                Sarvasva &lt;sarvasva5758@gmail.com&gt;
              </div>
            </div>

            {/* From Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5 }}>
              <span style={{ width: 75, fontWeight: 600, color: '#4b5563', textAlign: 'right' }}>Your Name:</span>
              <input
                type="text"
                required
                placeholder="Ada Lovelace"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: '1px solid #d1d5db',
                  outline: 'none',
                  fontSize: 13.5,
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* From Email */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5 }}>
              <span style={{ width: 75, fontWeight: 600, color: '#4b5563', textAlign: 'right' }}>Your Email:</span>
              <input
                type="email"
                required
                placeholder="ada@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: '1px solid #d1d5db',
                  outline: 'none',
                  fontSize: 13.5,
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Subject */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5 }}>
              <span style={{ width: 75, fontWeight: 600, color: '#4b5563', textAlign: 'right' }}>Subject:</span>
              <input
                type="text"
                required
                placeholder="Project Collaboration / Security Audit"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: '1px solid #d1d5db',
                  outline: 'none',
                  fontSize: 13.5,
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* Message Area */}
          <div style={{ flex: 1, minHeight: 140, display: 'flex', flexDirection: 'column', marginTop: 6 }}>
            <textarea
              required
              rows={6}
              placeholder="Write your transmission or project inquiry here..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{
                width: '100%',
                flex: 1,
                padding: '10px 12px',
                borderRadius: 6,
                border: '1px solid #d1d5db',
                outline: 'none',
                fontSize: 13.5,
                fontFamily: 'inherit',
                resize: 'none',
                lineHeight: 1.55
              }}
            />
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: 12, color: '#6b7280' }}>
              Direct: +91 861 897 1296
            </span>
            <button
              type="submit"
              disabled={isSending}
              className="aqua-btn primary"
              style={{ padding: '8px 24px', fontSize: 14 }}
            >
              {isSending ? 'Sending Transmission...' : '✉ Send Message'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
