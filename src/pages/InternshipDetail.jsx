import { useNavigate, useParams } from 'react-router-dom';
import { INTERNSHIPS } from '../data';
import '../styles/page.css';

function badgeLabel(badge) {
  if (badge === 'hot') return '🔥 Hot';
  if (badge === 'new') return '🆕 New';
  return '✅ Open';
}

export default function InternshipDetail() {
  const navigate = useNavigate();
  const { internId } = useParams();
  const i = INTERNSHIPS[internId] || INTERNSHIPS.java;

  return (
    <>
      <main className="intern-detail">
        <div>
          <div className="intern-card-block">
            <span className={`intern-badge badge-${i.badge || 'open'}`}>{badgeLabel(i.badge)}</span>
            <div className="intern-detail-banner">
              <picture>
                <source srcSet={i.image} type="image/webp" />
                <img src={i.imageFallback} alt="" className="intern-detail-img" />
              </picture>
              <span className="intern-detail-emoji" aria-hidden>{i.emoji}</span>
            </div>
            <div className="intern-company">{i.company}</div>
            <h1>{i.role}</h1>
            <div className="intern-tags">{i.tags?.map(t => <span key={t} className="intern-tag">{t}</span>)}</div>
            <p className="intern-desc">{i.desc}</p>
          </div>
          <div className="intern-card-block">
            <h2>What you&apos;ll do</h2>
            <ul className="intern-resp">
              {i.responsibilities?.map(r => <li key={r}>{r}</li>)}
            </ul>
          </div>
        </div>
        <aside className="intern-side">
          <div className="intern-card-block">
            {[['Stipend', i.stipend], ['Duration', i.duration], ['Mode', i.mode], ['Seats', i.seats], ['Deadline', i.deadline]].map(([l, v]) => (
              <div key={l} className="intern-info-row"><span>{l}</span><span>{v}</span></div>
            ))}
            <button type="button" className="intern-btn-apply" onClick={() => navigate(`/apply?type=internship&role=${i.id}`)}>
              Apply Now →
            </button>
          </div>
        </aside>
      </main>
    </>
  );
}
