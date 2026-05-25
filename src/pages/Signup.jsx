import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { COURSES } from '../data';
import { api } from '../api/client';
import { saveAuthSession } from '../utils/authSession';
import { refreshEnrollmentsFromApi } from '../utils/enrollment';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
    program: 'java'
  });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key, value) => setForm(f => ({ ...f, [key]: value }));

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!agree) {
      setError('Please accept the terms to continue.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.register({
        email: form.email.trim(),
        password: form.password,
        fullName: form.name.trim(),
        phone: form.phone.trim()
      });
      saveAuthSession({
        token: data.token,
        email: data.email,
        fullName: data.fullName,
        role: data.role
      });
      await refreshEnrollmentsFromApi();
      setSuccess(true);
      window.setTimeout(
        () => navigate(`/dashboard?email=${encodeURIComponent(data.email)}`),
        1200
      );
    } catch (err) {
      setError(err.message || 'Could not create account. Is the API running?');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>Account Created!</h1>
          <p className="auth-sub">Welcome to Shiv Tatva. Redirecting you to your dashboard…</p>
          <div className="auth-msg">✓ Registration successful. Our team will share batch details shortly.</div>
          <Link to="/dashboard" className="auth-btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card wide">
        <h1>Create Account</h1>
        <p className="auth-sub">Join Shiv Tatva Solutions and start your journey toward an industry-ready career.</p>

        {error && <div className="auth-msg" style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#dc2626' }}>{error}</div>}

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="signup-name">Full Name *</label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              placeholder="Your full name"
              required
              disabled={loading}
            />
          </div>
          <div className="auth-grid2">
            <div className="auth-field">
              <label htmlFor="signup-email">Email *</label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder="you@email.com"
                required
                disabled={loading}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="signup-phone">Phone *</label>
              <input
                id="signup-phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={e => update('phone', e.target.value)}
                placeholder="+91 98765 43210"
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="auth-grid2">
            <div className="auth-field">
              <label htmlFor="signup-password">Password *</label>
              <input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={e => update('password', e.target.value)}
                placeholder="Min. 6 characters"
                required
                disabled={loading}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="signup-confirm">Confirm Password *</label>
              <input
                id="signup-confirm"
                type="password"
                autoComplete="new-password"
                value={form.confirm}
                onChange={e => update('confirm', e.target.value)}
                placeholder="Re-enter password"
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="auth-field">
            <label htmlFor="signup-program">Interested Program</label>
            <select
              id="signup-program"
              value={form.program}
              onChange={e => update('program', e.target.value)}
              disabled={loading}
            >
              {Object.values(COURSES).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <label className="auth-check" style={{ marginBottom: 20 }}>
            <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} disabled={loading} />
            I agree to receive course updates and accept Shiv Tatva&apos;s terms & privacy policy.
          </label>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <div className="auth-divider">— or —</div>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in →</Link>
          <br />
          <Link to="/apply">Apply for a specific program</Link>
          {' · '}
          <Link to="/pricing">View pricing</Link>
        </p>
      </div>
    </div>
  );
}
