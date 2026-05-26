import { useNavigate } from 'react-router-dom';
import { imagesFromThumb } from '../../data';
import { PLACEMENT_PARTNERS, PLACEMENT_CARDS, PLACEMENT_DRIVES, HOW_PLACEMENT } from '../../data/homeContent';
import ProgramBanner from '../ProgramBanner';
import { HowSteps } from './programUtils';

export default function PlacementPanel() {
  const navigate = useNavigate();

  return (
    <>
      <div className="place-hero prog-hero fade-up">
        <div>
          <div className="ph-tag prog-tag">
            <span />
            Placement Assistance
          </div>
          <h3>
            Land Your Dream Job with <em>End-to-End Placement</em> Support
          </h3>
          <p>
            Resume building, LinkedIn optimization, live doubt sessions, placement material kits, mock interviews, and company drives — our placement cell supports you end-to-end.
          </p>
          <button type="button" className="btn-place" onClick={() => navigate('/apply?type=placement')}>
            Register for Placement Drive →
          </button>
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
          {PLACEMENT_PARTNERS.map(p => (
            <span key={p} className="partner-chip">
              {p}
            </span>
          ))}
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
                <div className="dc-pkg">
                  {d.pkg} <span>LPA</span>
                </div>
                <div className="dc-tags">
                  {d.tags.map(t => (
                    <span key={t} className="dc-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <button type="button" className="btn-drive" onClick={() => navigate('/apply?type=placement')}>
                  Apply for Drive
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <HowSteps title="🗺️ How Placement Works" steps={HOW_PLACEMENT} />
    </>
  );
}
