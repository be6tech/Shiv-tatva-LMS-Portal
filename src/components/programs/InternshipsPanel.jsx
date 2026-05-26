import { useNavigate } from 'react-router-dom';
import { INTERNSHIPS } from '../../data';
import { HOW_INTERNSHIP, BADGE_LABEL } from '../../data/homeContent';
import ProgramBanner from '../ProgramBanner';
import { HowSteps } from './programUtils';

export default function InternshipsPanel() {
  const navigate = useNavigate();

  return (
    <>
      <div className="intern-hero prog-hero fade-up">
        <div>
          <div className="ih-tag prog-tag">
            <span />
            Internship Programs
          </div>
          <h3>
            Get Real-World <em>Work Experience</em> While You Learn
          </h3>
          <p>Work on live industry projects, earn a stipend, and build your portfolio. Internship certificates recognized by 500+ companies.</p>
          <button type="button" className="btn-intern-apply" onClick={() => navigate('/apply?type=internship')}>
            Browse All Internships →
          </button>
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
                <div className="ic-info-item">
                  <div className="ic-info-label">Stipend</div>
                  <div className="ic-info-val">{i.stipend}</div>
                </div>
                <div className="ic-info-item">
                  <div className="ic-info-label">Duration</div>
                  <div className="ic-info-val">{i.duration}</div>
                </div>
              </div>
              <div className="ic-foot">
                <span className="ic-deadline">Deadline: {i.deadline}</span>
                <button
                  type="button"
                  className="btn-apply-intern"
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/apply?type=internship&role=${i.id}`);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <HowSteps title="🗺️ How the Internship Works" steps={HOW_INTERNSHIP} />
    </>
  );
}
