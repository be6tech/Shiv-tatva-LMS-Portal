import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CERT_CURRICULA, trainingImage, trainingImageFallback } from '../data';
import { MonthCurriculumPanel } from '../components/WeekCurriculum';
import { normalizeMonth } from '../utils/curriculum';
import '../styles/cert-detail.css';

export default function CertificationDetail() {
  const { certId } = useParams();
  const c = CERT_CURRICULA[certId] || CERT_CURRICULA.java;
  const [activePhase, setActivePhase] = useState(1);
  const applyUrl = `/apply?type=certification&cert=${c.id}`;

  return (
    <>
      <div className="course-hero">
        <div className="hero-inner">
          <Link to="/?program=certifications" className="course-back-link">← Back to Training</Link>
          <div className="course-tag"><span className="course-tag-dot" /><span className="course-tag-label">{c.cat} · ₹1,500</span></div>
          <h1>{c.title}{c.titleEm ? <> <em>{c.titleEm}</em></> : null}</h1>
          <p>{c.heroDesc}</p>
          <div className="hero-meta">
            <div className="hm-item"><span>⏱</span>{c.duration}</div>
            <div className="hm-item"><span>💰</span>{c.price} program fee</div>
          </div>
          <button type="button" className="btn-hero-enroll" onClick={() => window.location.href = applyUrl}>Enroll for Prep — {c.price}</button>
        </div>
      </div>
      <div className="main-wrap">
        <div className="left-col">
          <div className="tab-bar">
            {c.months.map(m => (
              <button key={m.num} type="button" className={`tab-btn${activePhase === m.num ? ' active' : ''}`} onClick={() => setActivePhase(m.num)}>Phase {m.num}</button>
            ))}
          </div>
          {c.months.map(normalizeMonth).map(month => (
            <MonthCurriculumPanel
              key={month.num}
              month={month}
              active={activePhase === month.num}
              weekLabel="Week"
              periodLabel="Phase"
            />
          ))}
        </div>
        <aside className="sidebar">
          <div className="sidebar-card">
            <div className="sc-thumb sc-thumb-img-wrap">
              <picture>
                <source srcSet={c.image || trainingImage(c.id)} type="image/webp" />
                <img src={c.imageFallback || trainingImageFallback(c.id)} alt="" className="sc-thumb-img" />
              </picture>
              <span className="sc-thumb-badge" aria-hidden>{c.emoji}</span>
            </div>
            <div className="sc-body">
              <div className="sc-issuer">{c.issuer}</div>
              <div className="sc-price">{c.price}</div>
              <p className="sc-fee-note">Flat program fee · all prep included</p>
              {c.brochure && <a className="btn-brochure" href={c.brochure} target="_blank" rel="noopener">📄 Download Brochure</a>}
              <button type="button" className="btn-enroll-big" onClick={() => window.location.href = applyUrl}>Enroll — ₹1,500</button>
              <ul className="sc-includes">{c.includes.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
