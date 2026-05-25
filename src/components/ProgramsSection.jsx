import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { COURSES, CERT_CURRICULA, INTERNSHIPS, TIER_PLANS, imagesFromThumb } from '../data';
import {
  PLACEMENT_PARTNERS,
  PLACEMENT_CARDS,
  PLACEMENT_DRIVES,
  HOW_INTERNSHIP,
  HOW_PLACEMENT,
  HOW_CERT,
  BADGE_LABEL
} from '../data/homeContent';
import CertificateVerify from './CertificateVerify';
import ProgramBanner from './ProgramBanner';

const TABS = [
  { id: 'courses', label: 'Courses', short: '📚', count: 7 },
  { id: 'internships', label: 'Internships', short: '💼', count: 6 },
  { id: 'placement', label: 'Placement', short: '🚀', count: 6 },
  { id: 'certifications', label: 'Training', short: '🏅', count: 7 }
];

function starsHtml(rating) {
  const n = Math.round(parseFloat(rating) || 4.8);
  return '★'.repeat(n) + (n < 5 ? '☆' : '');
}

function HowSteps({ title, steps }) {
  return (
    <div className="how-wrap fade-up" style={title.includes('Placement') ? { marginTop: 48 } : undefined}>
      <div className="how-title">{title}</div>
      <div className="how-steps">
        {steps.map(([t, d], i) => (
          <div key={t} className="how-step">
            <div className="hs-num">{i + 1}</div>
            <div className="hs-title">{t}</div>
            <div className="hs-desc">{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProgramsSection() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const tab = params.get('program') || 'courses';
  const [activeTab, setActiveTab] = useState(tab);

  useEffect(() => {
    if (params.get('program')) setActiveTab(params.get('program'));
  }, [params]);

  const switchTab = (id) => {
    setActiveTab(id);
    setParams({ program: id });
  };

  return (
    <div className="section-tabs-wrap fade-up" id="programs">
      <div style={{ marginBottom: 28 }}>
        <div className="sec-pill">Our Programs</div>
        <h2 className="sec-title">Programs & Career Paths</h2>
        <p className="sec-sub" style={{ marginBottom: 28, maxWidth: 640 }}>
          Seven brochure-backed courses, plus internships, placement support, and training — from learning to landing your dream job.
        </p>
      </div>
      <div className="section-tab-bar">
        {TABS.map(t => (
          <button key={t.id} type="button" className={`stab${activeTab === t.id ? ' active' : ''}`} onClick={() => switchTab(t.id)}>
            <span className="stab-short">{t.short}</span>
            <span className="stab-label">{t.label}</span>
            <span className="stab-count">{t.count}</span>
          </button>
        ))}
      </div>

      {activeTab === 'courses' && (
        <div className="tab-section active" id="tab-courses">
          <div className="prog-hero fade-up">
            <div>
              <div className="prog-tag">📚 Courses</div>
              <h3>Choose Your <em>Learning Plan</em></h3>
              <p>Seven official programs from our brochures — Java, Python, Cloud, AI & ML, Cyber Security, SAP FICO & HANA, and Salesforce. <strong>Pro</strong> includes 1-on-1 mentorship; <strong>Premium</strong> adds a guaranteed internship plus full placement support.</p>
              <Link to="/pricing" style={{ display: 'inline-block', marginTop: 12, background: 'var(--navy)', color: '#fff', padding: '10px 24px', borderRadius: 50, fontSize: 13, fontWeight: 800 }}>View Full Pricing →</Link>
            </div>
            <div className="cert-types">
              <div className="cert-type-box"><div className="ico">🌱</div><div className="lbl">Basic — ₹40,000</div></div>
              <div className="cert-type-box"><div className="ico">⚡</div><div className="lbl">Pro — ₹70K · 1-on-1 Mentorship</div></div>
              <div className="cert-type-box"><div className="ico">👑</div><div className="lbl">Premium — ₹1.2L · Guaranteed Internship</div></div>
            </div>
          </div>
          <div className="courses-grid">
            {Object.values(COURSES).map(c => (
              <div key={c.id} className="course-card" onClick={() => navigate(`/course/${c.id}`)} role="link" tabIndex={0} onKeyDown={e => e.key === 'Enter' && navigate(`/course/${c.id}`)}>
                <ProgramBanner image={c.image} imageFallback={c.imageFallback} emoji={c.emoji} />
                <div className="cc-body">
                  <div className="cc-cat">{c.cat}</div>
                  <div className="cc-name">{c.name}</div>
                  <div className="cc-meta"><span>⏱ {c.duration}</span><span className="stars">{starsHtml(c.rating)}</span><span>{c.rating}</span></div>
                  {c.brochure && <a className="cc-brochure" href={c.brochure} target="_blank" rel="noopener" onClick={e => e.stopPropagation()}>📄 Download Brochure</a>}
                  <div className="cc-foot">
                    <div className="cc-tiers">
                      {['basic', 'pro', 'premium'].map(t => (
                        <span key={t} className={`cc-tier t-${t}`} onClick={e => { e.stopPropagation(); navigate(`/course/${c.id}?tier=${t}`); }}>{TIER_PLANS[t].name}</span>
                      ))}
                    </div>
                    <button type="button" className="cc-btn" onClick={e => { e.stopPropagation(); navigate(`/course/${c.id}`); }}>View Plans</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <CertificateVerify />
        </div>
      )}

      {activeTab === 'certifications' && (
        <div className="tab-section active">
          <div className="cert-hero prog-hero fade-up">
            <div>
              <div className="ch-tag prog-tag">🏅 Industry Training</div>
              <h3>Earn <em>Industry Credentials</em> That Employers Trust</h3>
              <p>Same seven programs as our courses — training with live classes, mocks, and study material. <strong>₹1,500 per program</strong> (flat fee).</p>
              <button type="button" className="btn-cert" onClick={() => navigate('/certification/java')}>View Training Programs →</button>
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
                  <div className="crt-name">{c.title}{c.titleEm ? ` ${c.titleEm}` : ''}</div>
                  <div className="crt-meta"><span>⏱ {c.duration}</span><span>💰 {c.price}</span></div>
                  <div className="crt-foot"><span className="crt-price">{c.price}</span><button type="button" className="btn-crt">View Program</button></div>
                </div>
              </div>
            ))}
          </div>
          <HowSteps title="🗺️ How Training Works" steps={HOW_CERT} />
          <p className="fade-up" style={{ marginTop: 28, fontSize: 13, color: 'var(--muted)', fontWeight: 500, textAlign: 'center' }}>
            Course completion certificates are issued separately when you finish a{' '}
            <Link to="/?program=courses" style={{ color: 'var(--orange)', fontWeight: 700 }}>Course</Link>
            {' '}— not listed here.
          </p>
        </div>
      )}

      {activeTab === 'internships' && (
        <div className="tab-section active">
          <div className="intern-hero prog-hero fade-up">
            <div>
              <div className="ih-tag prog-tag"><span />Internship Programs</div>
              <h3>Get Real-World <em>Work Experience</em> While You Learn</h3>
              <p>Work on live industry projects, earn a stipend, and build your portfolio. Internship certificates recognized by 500+ companies.</p>
              <button type="button" className="btn-intern-apply" onClick={() => navigate('/apply?type=internship')}>Browse All Internships →</button>
            </div>
            <div className="ih-right">
              <div className="ih-stat"><div className="n">200+</div><div className="l">Partner Companies</div></div>
              <div className="ih-stat"><div className="n">₹8K</div><div className="l">Avg Monthly Stipend</div></div>
              <div className="ih-stat"><div className="n">1–6</div><div className="l">Months Duration</div></div>
              <div className="ih-stat"><div className="n">98%</div><div className="l">Completion Rate</div></div>
            </div>
          </div>
          <div className="intern-grid">
            {Object.values(INTERNSHIPS).map(i => (
              <div key={i.id} className="intern-card" onClick={() => navigate(`/internship/${i.id}`)}>
                <ProgramBanner
                  className="ic-head"
                  imgClass="ic-head-img"
                  image={i.image}
                  imageFallback={i.imageFallback}
                  emoji={i.emoji}
                  badge={<span className={`ic-badge badge-${i.badge || 'open'}`}>{BADGE_LABEL[i.badge] || i.badge}</span>}
                />
                <div className="ic-body">
                  <div className="ic-company">{i.company}</div>
                  <div className="ic-role">{i.role}</div>
                  <div className="ic-tags">{i.tags?.slice(0, 3).map(tag => <span key={tag} className="ic-tag">{tag}</span>)}</div>
                  <div className="ic-info">
                    <div className="ic-info-item"><div className="ic-info-label">Stipend</div><div className="ic-info-val">{i.stipend}</div></div>
                    <div className="ic-info-item"><div className="ic-info-label">Duration</div><div className="ic-info-val">{i.duration}</div></div>
                  </div>
                  <div className="ic-foot">
                    <span className="ic-deadline">Deadline: {i.deadline}</span>
                    <button type="button" className="btn-apply-intern" onClick={e => { e.stopPropagation(); navigate(`/apply?type=internship&role=${i.id}`); }}>Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <HowSteps title="🗺️ How the Internship Works" steps={HOW_INTERNSHIP} />
        </div>
      )}

      {activeTab === 'placement' && (
        <div className="tab-section active">
          <div className="place-hero prog-hero fade-up">
            <div>
              <div className="ph-tag prog-tag"><span />Placement Assistance</div>
              <h3>Land Your Dream Job with <em>End-to-End Placement</em> Support</h3>
              <p>Resume building, LinkedIn optimization, live doubt sessions, placement material kits, mock interviews, and company drives — our placement cell supports you end-to-end.</p>
              <button type="button" className="btn-place" onClick={() => navigate('/apply?type=placement')}>Register for Placement Drive →</button>
            </div>
            <div className="ph-stats">
              <div className="ph-stat"><div className="n">95%</div><div className="l">Placement Rate</div></div>
              <div className="ph-stat"><div className="n">₹6.5L</div><div className="l">Avg Package (LPA)</div></div>
              <div className="ph-stat"><div className="n">200+</div><div className="l">Hiring Partners</div></div>
              <div className="ph-stat"><div className="n">48hr</div><div className="l">Avg Offer Turnaround</div></div>
            </div>
          </div>
          <div className="partner-band fade-up">
            <div className="partner-title">Our Students Are Placed At</div>
            <div className="partner-grid">
              {PLACEMENT_PARTNERS.map(p => <span key={p} className="partner-chip">{p}</span>)}
            </div>
          </div>
          <div className="place-grid fade-up">
            {PLACEMENT_CARDS.map((p, i) => {
              const imgs = imagesFromThumb(p.thumb);
              return (
                <div key={p.name} className="place-card" style={{ transitionDelay: `${i * 0.05}s` }}>
                  <ProgramBanner className="pc-head" imgClass="pc-head-img" image={imgs.image} imageFallback={imgs.imageFallback} emoji={p.icon} />
                  <div className="pc-body">
                    <div className="pc-cat">{p.cat}</div>
                    <div className="pc-name">{p.name}</div>
                    <div className="pc-desc">{p.desc}</div>
                    <ul className="pc-list">{p.list.map(li => <li key={li}>{li}</li>)}</ul>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="how-wrap fade-up" style={{ marginBottom: 28 }}>
            <div className="how-title">💼 Active Placement Drives</div>
          </div>
          <div className="drive-grid">
            {PLACEMENT_DRIVES.map((d, i) => {
              const imgs = imagesFromThumb(d.thumb);
              return (
                <div key={d.role} className="drive-card fade-up" style={{ transitionDelay: `${i * 0.06}s` }}>
                  <ProgramBanner className="dc-thumb" imgClass="dc-thumb-img" image={imgs.image} imageFallback={imgs.imageFallback} emoji={d.icon} />
                  <div className="dc-body">
                    <div className="dc-cat">Hiring Drive</div>
                    <div className="dc-role">{d.role}</div>
                    <div className="dc-co">{d.company}</div>
                    <div className="dc-pkg">{d.pkg} <span>LPA</span></div>
                    <div className="dc-tags">{d.tags.map(t => <span key={t} className="dc-tag">{t}</span>)}</div>
                    <button type="button" className="btn-drive" onClick={() => navigate('/apply?type=placement')}>Apply for Drive</button>
                  </div>
                </div>
              );
            })}
          </div>
          <HowSteps title="🗺️ How Placement Works" steps={HOW_PLACEMENT} />
        </div>
      )}
    </div>
  );
}
