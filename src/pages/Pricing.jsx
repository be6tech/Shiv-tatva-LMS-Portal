import { Link, useNavigate } from 'react-router-dom';
import { COURSES, TIER_PLANS, TIER_COMPARE_ROWS } from '../data';
import { enrollUrl } from '../utils/enrollUrl';
import '../styles/pricing.css';

const TIERS = ['basic', 'pro', 'premium'];

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <>
      <div className="pricing-hero">
        <h1>Simple, Transparent <em>Pricing</em></h1>
        <p><strong>Pro (₹70K)</strong> includes 1-on-1 mentorship. <strong>Premium (₹1.2L)</strong> adds guaranteed internship. Training: <strong>₹1,500 each</strong>.</p>
      </div>
      <div className="page">
        <div className="tier-grid">
          {TIERS.map(tid => {
            const p = TIER_PLANS[tid];
            const rows = TIER_COMPARE_ROWS.filter(r => r.label !== 'Program fee');
            let highlights = rows.slice(0, 6).map(r => <li key={r.label}>{r.label}: {r[tid]}</li>);
            if (tid === 'premium') highlights = [...highlights, <li key="int"><strong>Internship: Guaranteed</strong></li>];
            return (
              <div key={tid} className={`tier-col ${tid}${tid === 'pro' ? ' featured' : ''}`}>
                {tid === 'pro' && <span className="popular">Most Popular</span>}
                {tid === 'premium' && <span className="popular" style={{ background: 'var(--navy)' }}>Guaranteed Internship</span>}
                <h2>{p.name}</h2>
                <div className="price">{p.price}</div>
                <div className="note">{p.durationNote}</div>
                <ul>{highlights}</ul>
                <button type="button" className="tier-btn" onClick={() => navigate(enrollUrl({ course: 'java', tier: tid }))}>Enroll — {p.name}</button>
              </div>
            );
          })}
        </div>
        <h2 className="section-title">Browse courses by plan</h2>
        <div className="course-links">
          {Object.values(COURSES).map(c => (
            <Link key={c.id} className="course-link" to={`/course/${c.id}`}>
              <span>{c.emoji}</span>
              <div><div>{c.name}</div><div style={{ fontSize: 11, color: 'var(--muted)' }}>{c.cat}</div></div>
            </Link>
          ))}
        </div>
        <p className="compare-note">Training programs: <Link to="/training">₹1,500 each</Link></p>
      </div>
    </>
  );
}
