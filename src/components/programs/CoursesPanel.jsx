import { Link, useNavigate } from 'react-router-dom';
import { COURSES, TIER_PLANS } from '../../data';
import CertificateVerify from '../CertificateVerify';
import ProgramBanner from '../ProgramBanner';
import { starsHtml } from './programUtils';

export default function CoursesPanel() {
  const navigate = useNavigate();

  return (
    <>
      <div className="prog-hero fade-up">
        <div>
          <div className="prog-tag">📚 Courses</div>
          <h3>Choose Your <em>Learning Plan</em></h3>
          <p>
            Seven official programs from our brochures — Java, Python, Cloud, AI & ML, Cyber Security, SAP FICO & HANA, and Salesforce.{' '}
            <strong>Pro</strong> includes 1-on-1 mentorship; <strong>Premium</strong> adds a guaranteed internship plus full placement support.
          </p>
          <Link
            to="/pricing"
            style={{
              display: 'inline-block',
              marginTop: 12,
              background: 'var(--navy)',
              color: '#fff',
              padding: '10px 24px',
              borderRadius: 50,
              fontSize: 13,
              fontWeight: 800
            }}
          >
            View Full Pricing →
          </Link>
        </div>
        <div className="cert-types">
          <div className="cert-type-box"><div className="ico">🌱</div><div className="lbl">Basic — ₹40,000</div></div>
          <div className="cert-type-box"><div className="ico">⚡</div><div className="lbl">Pro — ₹70K · 1-on-1 Mentorship</div></div>
          <div className="cert-type-box"><div className="ico">👑</div><div className="lbl">Premium — ₹1.2L · Guaranteed Internship</div></div>
        </div>
      </div>
      <div className="courses-grid">
        {Object.values(COURSES).map(c => (
          <div
            key={c.id}
            className="course-card"
            onClick={() => navigate(`/course/${c.id}`)}
            role="link"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate(`/course/${c.id}`)}
          >
            <ProgramBanner image={c.image} imageFallback={c.imageFallback} emoji={c.emoji} />
            <div className="cc-body">
              <div className="cc-cat">{c.cat}</div>
              <div className="cc-name">{c.name}</div>
              <div className="cc-meta">
                <span>⏱ {c.duration}</span>
                <span className="stars">{starsHtml(c.rating)}</span>
                <span>{c.rating}</span>
              </div>
              {c.brochure && (
                <a className="cc-brochure" href={c.brochure} target="_blank" rel="noopener" onClick={e => e.stopPropagation()}>
                  📄 Download Brochure
                </a>
              )}
              <div className="cc-foot">
                <div className="cc-tiers">
                  {['basic', 'pro', 'premium'].map(t => (
                    <span
                      key={t}
                      className={`cc-tier t-${t}`}
                      onClick={e => {
                        e.stopPropagation();
                        navigate(`/course/${c.id}?tier=${t}`);
                      }}
                    >
                      {TIER_PLANS[t].name}
                    </span>
                  ))}
                </div>
                <button type="button" className="cc-btn" onClick={e => { e.stopPropagation(); navigate(`/course/${c.id}`); }}>
                  View Plans
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CertificateVerify />
    </>
  );
}
