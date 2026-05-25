import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { COURSES, CERT_CURRICULA, TIER_PLANS } from '../data';
import { api } from '../api/client';
import { saveAuthSession } from '../utils/authSession';
import { refreshEnrollmentsFromApi } from '../utils/enrollment';
import '../styles/auth.css';

const STEPS = ['details', 'otp', 'done'];

function normalizePhoneInput(value) {
  return value.replace(/\D/g, '').slice(0, 10);
}

export default function EnrollRegister() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const courseId = params.get('course') || 'java';
  const tier = TIER_PLANS[params.get('tier')] ? params.get('tier') : 'pro';
  const programType = params.get('type') || 'course';

  const course = COURSES[courseId] || COURSES.java;
  const plan = TIER_PLANS[tier];

  const [step, setStep] = useState('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendSec, setResendSec] = useState(0);

  const title = useMemo(() => {
    if (programType === 'certification') {
      const c = CERT_CURRICULA[courseId];
      return c ? `Enroll — ${c.title}` : 'Enroll — Training';
    }
    return `Enroll — ${course.name}`;
  }, [programType, courseId, course.name]);

  useEffect(() => {
    if (resendSec <= 0) return undefined;
    const t = window.setInterval(() => setResendSec(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [resendSec]);

  const validateDetails = () => {
    if (!name.trim()) return 'Enter your full name';
    if (!email.trim() || !email.includes('@')) return 'Enter a valid email';
    if (phone.length !== 10) return 'Enter a valid 10-digit mobile number';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const sendOtp = async () => {
    const err = validateDetails();
    if (err) {
      setError(err);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await api.sendOtp(phone);
      setDevOtp(res.devOtp || '');
      setResendSec(60);
      setStep('otp');
      setOtp('');
    } catch (e) {
      setError(e.message || 'Could not send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setError('Enter the 6-digit OTP');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await api.verifyOtp(phone, otp);
      await completeEnrollment(res.verificationToken);
    } catch (e) {
      setError(e.message || 'Invalid OTP');
      setLoading(false);
    }
  };

  const completeEnrollment = async token => {
    try {
      const data = await api.completeEnrollment({
        verificationToken: token,
        phone,
        fullName: name.trim(),
        email: email.trim(),
        password,
        courseId: course.id,
        tier
      });
      saveAuthSession({
        token: data.token,
        email: data.email,
        fullName: data.fullName,
        role: data.role
      });
      await refreshEnrollmentsFromApi();
      setStep('done');
      window.setTimeout(() => navigate(`/course/${course.id}?tier=${tier}`), 2000);
    } catch (e) {
      setError(e.message || 'Enrollment failed. Is the API running?');
    } finally {
      setLoading(false);
    }
  };

  const onDetailsSubmit = e => {
    e.preventDefault();
    sendOtp();
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-branded wide">
        <div className="auth-brand-strip" aria-hidden />
        <div className="auth-brand-head">
          <img src="/logo.png" alt="Shiv Tatva" className="auth-logo" />
          <div>
            <h1>Complete Registration</h1>
            <p className="auth-sub">{title} · {plan.name} ({plan.price})</p>
          </div>
        </div>

        <div className="enroll-steps" aria-label="Progress">
          {STEPS.map((s, i) => (
            <span key={s} className={`enroll-step${step === s ? ' on' : ''}${STEPS.indexOf(step) > i ? ' done' : ''}`}>
              {i + 1}. {s === 'details' ? 'Your details' : s === 'otp' ? 'Verify phone' : 'Done'}
            </span>
          ))}
        </div>

        {error && (
          <div className="auth-msg" style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#dc2626' }}>
            {error}
          </div>
        )}

        {step === 'details' && (
          <form className="auth-form" onSubmit={onDetailsSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="enroll-name">Full Name *</label>
              <input
                id="enroll-name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                required
                disabled={loading}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="enroll-email">Email *</label>
              <input
                id="enroll-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                disabled={loading}
              />
            </div>
            <div className="auth-field">
              <label htmlFor="enroll-phone">Phone Number *</label>
              <div className="phone-input-wrap">
                <span className="phone-prefix">+91</span>
                <input
                  id="enroll-phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={e => setPhone(normalizePhoneInput(e.target.value))}
                  placeholder="98765 43210"
                  maxLength={10}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="auth-field">
              <label htmlFor="enroll-password">Create Password *</label>
              <input
                id="enroll-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                minLength={6}
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Sending OTP…' : 'Send OTP to Phone →'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <div className="auth-form">
            <p className="auth-sub" style={{ marginBottom: 16 }}>
              We sent a 6-digit code to <strong>+91 {phone}</strong>
            </p>
            {devOtp && import.meta.env.DEV && (
              <div className="auth-msg" style={{ marginBottom: 12 }}>
                Dev OTP: <strong>{devOtp}</strong> (also in API console)
              </div>
            )}
            <div className="auth-field">
              <label htmlFor="enroll-otp">Enter OTP *</label>
              <input
                id="enroll-otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="otp-input"
                disabled={loading}
              />
            </div>
            <button type="button" className="auth-btn" onClick={verifyOtp} disabled={loading || otp.length !== 6}>
              {loading ? 'Verifying…' : 'Verify & Complete Enrollment'}
            </button>
            <button
              type="button"
              className="auth-btn-outline"
              style={{ marginTop: 10 }}
              disabled={loading || resendSec > 0}
              onClick={sendOtp}
            >
              {resendSec > 0 ? `Resend OTP in ${resendSec}s` : 'Resend OTP'}
            </button>
            <button type="button" className="auth-link-btn" style={{ marginTop: 12 }} onClick={() => setStep('details')}>
              ← Edit details
            </button>
          </div>
        )}

        {step === 'done' && (
          <div className="auth-msg" style={{ textAlign: 'center' }}>
            ✅ Enrollment complete! Redirecting to your course…
          </div>
        )}

        <p className="auth-footer" style={{ marginTop: 24 }}>
          <Link to={`/course/${course.id}?tier=${tier}`}>← Back to course</Link>
          {' · '}
          <Link to="/login">Already registered? Sign in</Link>
        </p>
      </div>
    </div>
  );
}
