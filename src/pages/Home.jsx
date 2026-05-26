import { Link, Navigate, useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import useScrollReveal from '../hooks/useScrollReveal';
import { FEATURES } from '../data/homeContent';

const PROGRAM_REDIRECTS = {
  courses: '/courses',
  internships: '/internships',
  placement: '/placement',
  certifications: '/training'
};

export default function Home() {
  const [params] = useSearchParams();
  useScrollReveal();

  const program = params.get('program');
  if (program && PROGRAM_REDIRECTS[program]) {
    return <Navigate to={PROGRAM_REDIRECTS[program]} replace />;
  }

  return (
    <>
      <Hero />
      <section className="stats-band">
        <div className="stats-grid">
          <div className="fade-up"><div className="stat-num">1000+</div><div className="stat-lbl">Students Trained</div></div>
          <div className="fade-up" style={{ transitionDelay: '.08s' }}><div className="stat-num">7</div><div className="stat-lbl">Expert Programs</div></div>
          <div className="fade-up" style={{ transitionDelay: '.16s' }}><div className="stat-num">95%</div><div className="stat-lbl">Placement Rate</div></div>
          <div className="fade-up" style={{ transitionDelay: '.24s' }}><div className="stat-num">50+</div><div className="stat-lbl">Expert Trainers</div></div>
        </div>
      </section>
      <section className="section" id="features" style={{ background: 'var(--bg)' }}>
        <div className="sec-hdr fade-up">
          <div className="sec-pill">Platform Features</div>
          <h2 className="sec-title">Everything You Need to Succeed</h2>
          <p className="sec-sub">A complete ecosystem designed to take you from learning to landing your dream job.</p>
        </div>
        <div className="feat-grid">
          {FEATURES.map(([icon, name, desc], i) => (
            <div key={name} className="feat-card fade-up" style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="feat-icon">{icon}</div>
              <div className="feat-name">{name}</div>
              <div className="feat-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>
      <Testimonials />
      <div className="cta-wrap fade-up">
        <div className="cta-box">
          <h2 className="cta-h2">Start Your Learning Journey <span>Today</span></h2>
          <p className="cta-sub">Join 5,000+ students who transformed their careers. Your next chapter begins here.</p>
          <div className="cta-btns">
            <Link to="/apply" className="btn-cta-o">Apply Now →</Link>
            <Link to="/courses" className="btn-cta-w">View All Courses</Link>
          </div>
        </div>
      </div>
    </>
  );
}
