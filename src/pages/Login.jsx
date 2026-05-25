import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { LOGIN_ROUTES } from '../utils/auth';
import { api } from '../api/client';
import { saveAuthSession } from '../utils/authSession';
import { refreshEnrollmentsFromApi } from '../utils/enrollment';

const ROLES = [
  { id: 'student', label: 'Student' },
  { id: 'trainer', label: 'Trainer' },
  { id: 'admin', label: 'Admin' }
];

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMsg('Signing you in…');

    const em = email.trim();

    if (role === 'student' && em && password) {
      try {
        const data = await api.login({ email: em, password });
        saveAuthSession({
          token: data.token,
          email: data.email,
          fullName: data.fullName,
          role: data.role
        });
        await refreshEnrollmentsFromApi();
        if (remember) localStorage.setItem('st_remember_email', em);
        navigate(`${LOGIN_ROUTES.student}?email=${encodeURIComponent(data.email)}`);
        return;
      } catch (err) {
        setError(err.message || 'Invalid email or password. Create an account if you are new.');
        setMsg('');
        setLoading(false);
        return;
      }
    }

    const fallbackEmail = em || 'student@shivtatva.com';
    sessionStorage.setItem('st_email', fallbackEmail);
    if (remember) localStorage.setItem('st_remember_email', fallbackEmail);
    window.setTimeout(() => {
      navigate(`${LOGIN_ROUTES[role]}?email=${encodeURIComponent(fallbackEmail)}`);
    }, 400);
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-branded">
        <div className="auth-brand-strip" aria-hidden />
        <div className="auth-brand-head">
          <img src="/logo.png" alt="Shiv Tatva" className="auth-logo" />
          <div>
            <h1>Welcome Back</h1>
            <p className="auth-sub">Sign in to access your courses, assignments, and placement portal.</p>
          </div>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Sign in as">
          {ROLES.map(r => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={role === r.id}
              className={`auth-tab${role === r.id ? ' active' : ''}`}
              onClick={() => setRole(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="auth-msg" style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#dc2626' }}>
            {error}
          </div>
        )}
        {msg && !error && <div className="auth-msg">{msg}</div>}

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
            />
          </div>
          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required={role === 'student'}
            />
          </div>
          {role === 'student' && (
            <p className="auth-sub" style={{ marginTop: -8, marginBottom: 12, fontSize: 13 }}>
              Student sign-in uses your registered account (Spring Boot API).
            </p>
          )}
          <div className="auth-row">
            <label className="auth-check">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
              Remember me
            </label>
            <Link to="/contact" className="auth-link">Forgot password?</Link>
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            Sign In
          </button>
        </form>

        <div className="auth-divider">— or —</div>
        <p className="auth-footer">
          New student? <Link to="/signup">Create an account →</Link>
          <br />
          <Link to="/apply">Apply for a program</Link>
          {' · '}
          <Link to="/live-session">Free live demo</Link>
          {' · '}
          <Link to="/pricing">View pricing</Link>
        </p>
      </div>
    </div>
  );
}
