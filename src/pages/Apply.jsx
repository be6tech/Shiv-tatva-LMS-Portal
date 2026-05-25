import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { COURSES, CERT_CURRICULA, INTERNSHIPS, TIER_PLANS, TIER_CAREER_BENEFITS, CERT_PROGRAM_FEE } from '../data';
import { setEnrollment, verifyPaymentForCourse } from '../utils/enrollment';
import { api } from '../api/client';
import { PLACEMENT_DRIVES } from '../data/homeContent';
import '../styles/page.css';

const PLACEMENT_APPLY_OPTIONS = PLACEMENT_DRIVES.map((d, i) => ({
  id: String(i),
  label: `${d.role} — ${d.company}`
}));

function ApplyField({ label, children, className = '' }) {
  return (
    <div className={`apply-field ${className}`.trim()}>
      {label && <label>{label}</label>}
      {children}
    </div>
  );
}

export default function Apply() {
  const [params] = useSearchParams();
  const [type, setType] = useState(params.get('type') || 'course');
  const [course, setCourse] = useState(params.get('course') || 'java');
  const [tier, setTier] = useState(params.get('tier') || 'pro');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.get('type')) setType(params.get('type'));
    if (params.get('course') && COURSES[params.get('course')]) setCourse(params.get('course'));
    if (params.get('cert') && CERT_CURRICULA[params.get('cert')]) setCourse(params.get('cert'));
    if (params.get('tier') && TIER_PLANS[params.get('tier')]) setTier(params.get('tier'));
    if (params.get('role')) {
      const role = params.get('role');
      if (INTERNSHIPS[role]) setCourse(role);
      else if (COURSES[role]) setCourse(role);
    }
  }, [params]);

  useEffect(() => {
    if (type === 'course' && !COURSES[course]) setCourse('java');
    if (type === 'certification' && !CERT_CURRICULA[course]) setCourse('java');
    if (type === 'internship' && !INTERNSHIPS[course]) setCourse('java');
    if (type === 'placement' && !PLACEMENT_APPLY_OPTIONS.some(o => o.id === course)) setCourse('0');
  }, [type, course]);

  const programLabel = useMemo(() => {
    if (type === 'internship') return 'Internship Role';
    if (type === 'placement') return 'Placement Drive';
    if (type === 'certification') return 'Training Program';
    return 'Program / Course';
  }, [type]);

  const tierHint =
    type === 'course' && COURSES[course]
      ? (() => {
          const c = COURSES[course];
          const plan = TIER_PLANS[tier];
          const career = (TIER_CAREER_BENEFITS[tier] || []).join(' · ');
          return `${plan.name} — ${c.duration}. Career support: ${career}.`;
        })()
      : '';

  const onSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const fd = new FormData(e.target);

    const body = {
      programType: type,
      programId: course,
      tier: type === 'course' ? tier : null,
      fullName: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').trim()
    };

    try {
      await api.apply(body);
      if (type === 'course' && COURSES[course] && TIER_PLANS[tier]) {
        await verifyPaymentForCourse(course, tier);
      }
      setSuccess(true);
    } catch (err) {
      if (type === 'course' && COURSES[course] && TIER_PLANS[tier]) {
        setEnrollment(course, tier, true);
      }
      setSuccess(true);
      if (import.meta.env.DEV) {
        console.warn('Apply API unavailable, saved locally:', err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="apply-page">
        <div className="apply-success">
          <div className="ico">✅</div>
          <h2 style={{ fontFamily: 'Nunito', fontSize: 24, fontWeight: 900, color: 'var(--navy)' }}>Application Received!</h2>
          <p style={{ color: 'var(--muted)', margin: '10px 0 24px' }}>Our counselors will contact you within 24 hours with batch details and next steps.</p>
          {type === 'course' && (
            <Link
              to={`/course/${course}?tier=${tier}`}
              style={{ color: 'var(--orange)', fontWeight: 800, display: 'block', marginBottom: 12 }}
            >
              → Go to course
            </Link>
          )}
          <Link to="/" style={{ color: 'var(--orange)', fontWeight: 800 }}>← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="apply-page">
        <h1>Apply Now</h1>
        <p className="sub">Fill in your details and our team will contact you within 24 hours with batch details and next steps.</p>
        {error && (
          <p style={{ color: '#dc2626', fontWeight: 600, marginBottom: 16 }}>{error}</p>
        )}
        <form className="apply-form" onSubmit={onSubmit}>
          <div className="apply-grid2">
            <ApplyField label="Full Name *">
              <input name="name" required placeholder="Your name" disabled={submitting} />
            </ApplyField>
            <ApplyField label="Phone *">
              <input name="phone" type="tel" required placeholder="+91 98765 43210" disabled={submitting} />
            </ApplyField>
          </div>

          <ApplyField label="Email *">
            <input name="email" type="email" required placeholder="you@email.com" disabled={submitting} />
          </ApplyField>

          <div className="apply-grid2">
            <ApplyField label="Program Type *">
              <select value={type} onChange={e => setType(e.target.value)} disabled={submitting}>
                <option value="course">Course</option>
                <option value="internship">Internship</option>
                <option value="placement">Placement Drive</option>
                <option value="certification">Training</option>
              </select>
            </ApplyField>
            <ApplyField label={programLabel}>
              {type === 'course' && (
                <select value={course} onChange={e => setCourse(e.target.value)} disabled={submitting}>
                  {Object.values(COURSES).map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              )}
              {type === 'certification' && (
                <select value={course} onChange={e => setCourse(e.target.value)} disabled={submitting}>
                  {Object.values(CERT_CURRICULA).map(c => (
                    <option key={c.id} value={c.id}>{c.title} — {CERT_PROGRAM_FEE}</option>
                  ))}
                </select>
              )}
              {type === 'internship' && (
                <select value={course} onChange={e => setCourse(e.target.value)} disabled={submitting}>
                  {Object.values(INTERNSHIPS).map(i => (
                    <option key={i.id} value={i.id}>{i.role} — {i.company}</option>
                  ))}
                </select>
              )}
              {type === 'placement' && (
                <select value={course} onChange={e => setCourse(e.target.value)} disabled={submitting}>
                  {PLACEMENT_APPLY_OPTIONS.map(o => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              )}
            </ApplyField>
          </div>

          {type === 'course' && (
            <ApplyField label="Course Plan *">
              <select value={tier} onChange={e => setTier(e.target.value)} disabled={submitting}>
                <option value="basic">Basic — ₹40,000</option>
                <option value="pro">Pro — ₹70,000</option>
                <option value="premium">Premium — ₹1,20,000</option>
              </select>
            </ApplyField>
          )}
          {tierHint && <p className="apply-hint">{tierHint}</p>}

          <ApplyField label="Message (optional)">
            <textarea name="message" placeholder="Tell us about your background and goals..." disabled={submitting} />
          </ApplyField>

          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Application →'}
          </button>
        </form>
      </div>
    </>
  );
}
