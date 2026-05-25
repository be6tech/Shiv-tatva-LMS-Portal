import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COURSES, CERT_CURRICULA } from '../data';
import { LIVE_SESSIONS } from '../data/aboutContent';
import '../styles/page.css';

const PERKS = [
  { icon: '🎓', text: 'Live mentor Q&A' },
  { icon: '💬', text: 'Ask about all 3 plans' },
  { icon: '📹', text: 'Zoom link by email' },
  { icon: '✨', text: '100% free — no card' }
];

function LiveRegisterForm({ onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('');
  const [focus, setFocus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const markTouched = field => setTouched(t => ({ ...t, [field]: true }));

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      onSuccess({ name, email, phone, program });
    }, 900);
  };

  const fieldClass = id =>
    `live-field${focus === id ? ' focused' : ''}${touched[id] && !({ name, email, phone, program }[id] && id !== 'program') ? '' : touched[id] ? ' touched' : ''}`;

  return (
    <form className="live-register-form" onSubmit={onSubmit} noValidate>
      <div className="live-register-perks">
        {PERKS.map(p => (
          <span key={p.text} className="live-perk">
            <span className="live-perk-ico">{p.icon}</span>
            <span className="live-perk-text">{p.text}</span>
          </span>
        ))}
      </div>

      <div className="live-register-fields">
      <div className={fieldClass('name')}>
        <label htmlFor="live-name">Full name *</label>
        <div className="live-input-wrap">
          <span className="live-input-icon" aria-hidden>👤</span>
          <input
            id="live-name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            onFocus={() => setFocus('name')}
            onBlur={() => { setFocus(null); markTouched('name'); }}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
      </div>

      <div className={fieldClass('email')}>
        <label htmlFor="live-email">Email *</label>
        <div className="live-input-wrap">
          <span className="live-input-icon" aria-hidden>✉️</span>
          <input
            id="live-email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocus('email')}
            onBlur={() => { setFocus(null); markTouched('email'); }}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div className={fieldClass('phone')}>
        <label htmlFor="live-phone">Phone (WhatsApp updates)</label>
        <div className="live-input-wrap">
          <span className="live-input-icon" aria-hidden>📱</span>
          <input
            id="live-phone"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            onFocus={() => setFocus('phone')}
            onBlur={() => { setFocus(null); markTouched('phone'); }}
            placeholder="+91 98765 43210"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className={fieldClass('program')}>
        <label htmlFor="live-program">Interested program</label>
        <div className="live-input-wrap live-select-wrap">
          <span className="live-input-icon" aria-hidden>📚</span>
          <select
            id="live-program"
            value={program}
            onChange={e => setProgram(e.target.value)}
            onFocus={() => setFocus('program')}
            onBlur={() => { setFocus(null); markTouched('program'); }}
          >
            <option value="">Select a program</option>
            <optgroup label="Courses (6 months)">
              {Object.values(COURSES).map(c => (
                <option key={c.id} value={`course:${c.id}`}>{c.emoji} {c.name}</option>
              ))}
            </optgroup>
            <optgroup label="Training (₹1,500 · 4 weeks)">
              {Object.values(CERT_CURRICULA).map(c => (
                <option key={c.id} value={`cert:${c.id}`}>{c.emoji} {c.title}</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>
      </div>

      <button type="submit" className="live-register-btn" disabled={loading}>
        <span className="live-register-btn-inner">
          {loading ? (
            <>
              <span className="live-btn-spinner" aria-hidden />
              Reserving your seat…
            </>
          ) : (
            <>
              Reserve My Free Seat
              <span className="live-btn-arrow" aria-hidden>→</span>
            </>
          )}
        </span>
      </button>

      <p className="live-register-foot">
        Already have an account? <Link to="/login">Sign in</Link>
        {' · '}
        <Link to="/apply">Full application</Link>
      </p>
    </form>
  );
}

function RegisterSuccess({ email }) {
  return (
    <div className="live-register-success" role="status">
      <div className="live-success-ring">
        <span className="live-success-check">✓</span>
      </div>
      <h3>You&apos;re registered!</h3>
      <p>
        We&apos;ll send the Zoom link to <strong>{email || 'your email'}</strong> within a few minutes.
        Check spam if you don&apos;t see it.
      </p>
      <div className="live-success-actions">
        <Link to="/login" className="live-success-btn primary">Go to Login</Link>
        <Link to="/" className="live-success-btn ghost">Back to Home</Link>
      </div>
    </div>
  );
}

export default function LiveSession() {
  const [registration, setRegistration] = useState(null);

  return (
    <>
      <div className="live-page-wrap">
        <div className="live-hero">
          <div className="live-pill">
            <span className="live-pill-dot" />
            FREE LIVE SESSION
          </div>
          <h1>
            Experience a <span>Real Shiv Tatva</span> Class
          </h1>
          <p className="live-hero-desc">
            Join our next free demo — live Q&A with industry mentors. No payment required. Ask about Basic, Pro, or Premium course plans.
          </p>
          <p className="live-hero-pricing">
            Courses:{' '}
            <Link to="/pricing">Basic ₹40K · Pro ₹70K · Premium ₹1.2L</Link>
          </p>
          <div className="live-hero-meta">
            <span>📅 Saturday, 7:00 PM IST</span>
            <span className="live-meta-divider" />
            <span>🎥 Zoom · Link after signup</span>
          </div>
        </div>
      </div>

      <div className="live-grid">
        <div className="live-card live-card-sessions">
          <div className="live-card-head">
            <span className="live-card-ico">📅</span>
            <h2>Upcoming Sessions</h2>
          </div>
          <div className="live-card-body">
            <div className="live-sessions-list">
              {LIVE_SESSIONS.map((s, i) => (
                <div key={s.title} className={`session-item${i === 0 ? ' featured' : ''}`}>
                  {i === 0 && <span className="session-badge">Next up</span>}
                  <div className="s-time">{s.time}</div>
                  <div className="s-title">{s.title}</div>
                  <div className="s-meta">{s.meta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="live-card live-card-register">
          <div className="live-register-accent" aria-hidden />
          <div className="live-card-head">
            <img src="/logo.png" alt="" className="live-register-logo" />
            <div>
              <h2>Register for Free</h2>
              <p className="live-register-sub">Reserve your seat in under a minute</p>
            </div>
          </div>
          <div className="live-card-body">
            {registration ? (
              <RegisterSuccess email={registration.email} />
            ) : (
              <LiveRegisterForm onSuccess={setRegistration} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
