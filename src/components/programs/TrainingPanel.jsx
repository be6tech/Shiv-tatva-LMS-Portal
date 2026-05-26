import { Link, useNavigate } from 'react-router-dom';
import { CERT_CURRICULA } from '../../data';
import { HOW_CERT } from '../../data/homeContent';
import ProgramBanner from '../ProgramBanner';
import { HowSteps } from './programUtils';

export default function TrainingPanel() {
  const navigate = useNavigate();

  return (
    <>
      <div className="cert-hero prog-hero fade-up">
        <div>
          <div className="ch-tag prog-tag">🏅 Industry Training</div>
          <h3>
            Earn <em>Industry Credentials</em> That Employers Trust
          </h3>
          <p>
            Same seven programs as our courses — training with live classes, mocks, and study material.{' '}
            <strong>₹1,500 per program</strong> (flat fee).
          </p>
          <button type="button" className="btn-cert" onClick={() => navigate('/certification/java')}>
            View Training Programs →
          </button>
        </div>
        <div className="cert-types">
          <div className="cert-type-box"><div className="ico">🏅</div><div className="lbl">₹1,500 / program</div></div>
          <div className="cert-type-box"><div className="ico">📄</div><div className="lbl">7 Brochure Tracks</div></div>
          <div className="cert-type-box"><div className="ico">✓</div><div className="lbl">Mock Tests Included</div></div>
        </div>
      </div>
      <div className="certs-grid">
        {Object.values(CERT_CURRICULA).map(c => (
          <div key={c.id} className="cert-card" onClick={() => navigate(`/certification/${c.id}`)}>
            <ProgramBanner image={c.image} imageFallback={c.imageFallback} emoji={c.emoji} className="crt-thumb" imgClass="crt-thumb-img" />
            <div className="crt-body">
              <div className="crt-issuer">{c.cat}</div>
              <div className="crt-name">
                {c.title}
                {c.titleEm ? ` ${c.titleEm}` : ''}
              </div>
              <div className="crt-meta">
                <span>⏱ {c.duration}</span>
                <span>💰 {c.price}</span>
              </div>
              <div className="crt-foot">
                <span className="crt-price">{c.price}</span>
                <button type="button" className="btn-crt">
                  View Program
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <HowSteps title="🗺️ How Training Works" steps={HOW_CERT} />
      <p className="fade-up" style={{ marginTop: 28, fontSize: 13, color: 'var(--muted)', fontWeight: 500, textAlign: 'center' }}>
        Course completion certificates are issued separately when you finish a{' '}
        <Link to="/courses" style={{ color: 'var(--orange)', fontWeight: 700 }}>
          Course
        </Link>{' '}
        — not listed here.
      </p>
    </>
  );
}
