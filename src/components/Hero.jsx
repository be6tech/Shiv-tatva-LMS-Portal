import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HERO_COURSES } from '../data';

export default function Hero() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [pop, setPop] = useState(false);
  const timerRef = useRef(null);
  const count = HERO_COURSES.length || 1;
  const c = HERO_COURSES[idx] || HERO_COURSES[0] || { id: 'java', emoji: '☕', name: 'Java Full Stack', title: 'Java Full Stack Engineer' };
  const step = 360 / count;

  const pickCourse = (i) => {
    setIdx(i);
    setPop(true);
    window.setTimeout(() => setPop(false), 450);
  };

  const startTimer = () => {
    if (count < 2) return;
    stopTimer();
    timerRef.current = window.setInterval(() => {
      setIdx(prev => (prev + 1) % count);
      setPop(true);
      window.setTimeout(() => setPop(false), 450);
    }, 2800);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startTimer();
    return stopTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <section className="hero" id="home">
      <div className="sparkle s1">✦</div>
      <div className="sparkle s2">✦</div>
      <div className="hero-left">
        <div className="hero-pill">Exclusively for All Aspiring Tech Professionals</div>
        <h1 className="hero-h1">Become a Highly-paid</h1>
        <h1 className="hero-h1-accent">
          <span className="hero-title-cycle">
            <span className="cycle-word active">{c.title}</span>
          </span>
        </h1>
        <ul className="hero-bullets">
          <li>50+ Real-world Industry Projects</li>
          <li>Learn from Expert Faculty & Industry Mentors</li>
          <li>End-to-End Placement Support</li>
        </ul>
        <div className="hero-social-proof">
          <div className="avatars">
            <span style={{ background: 'var(--navy)' }}>RK</span>
            <span style={{ background: 'var(--orange)' }}>PS</span>
            <span style={{ background: '#14b8a6' }}>AM</span>
            <span style={{ background: '#f59e0b' }}>+</span>
          </div>
          <span className="social-txt">Join 5,000+ Students Preparing for Top-tech Careers</span>
        </div>
        <div className="batch-txt">Next Batch Starting 1st Week of June</div>
        <div className="hero-mobile-courses">
          {HERO_COURSES.map((hc, i) => (
            <Link
              key={hc.id}
              to={`/course/${hc.id}`}
              className={`hero-mc-chip${i === idx ? ' active' : ''}`}
              onMouseEnter={() => pickCourse(i)}
            >
              {hc.emoji} {hc.name.split(' ').slice(0, 3).join(' ')}
            </Link>
          ))}
        </div>
        <div className="hero-btns">
          <button type="button" className="btn-apply" onClick={() => navigate(`/course/${c.id}`)}>
            View Curriculum <span className="arr">→</span>
          </button>
          <button type="button" className="btn-explore" onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Curriculum
          </button>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-illustration">
          <div className="hero-grid-bg" />
          <div className="hero-orbit-system" onMouseEnter={stopTimer} onMouseLeave={startTimer}>
            <div className="orbit-ring">
              {HERO_COURSES.map((hc, i) => (
                <Link
                  key={hc.id}
                  to={`/course/${hc.id}`}
                  className={`orbit-node${i === idx ? ' active' : ''}`}
                  title={hc.name}
                  style={{ '--orbit-deg': `${i * step}deg` }}
                  onMouseEnter={() => pickCourse(i)}
                >
                  <span>{hc.emoji}</span>
                </Link>
              ))}
            </div>
            <div className="hero-center">
              <div className={`hcc-visual${pop ? ' pop' : ''}`}>
                {c.image ? (
                  <picture>
                    <source srcSet={c.image} type="image/webp" />
                    <img src={c.imageFallback} alt="" className="hcc-course-img" />
                  </picture>
                ) : (
                  <span className="hcc-emoji">{c.emoji}</span>
                )}
                <span className="hcc-emoji-badge" aria-hidden>{c.emoji}</span>
              </div>
              <div className="hcc-name">{c.name}</div>
              <div className="hcc-role">7 Official Programs · 1 Goal</div>
              <div className="hcc-dots">
                {HERO_COURSES.map((_, i) => (
                  <span key={i} className={i === idx ? 'on' : ''} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="fbadge fb1">
          <div className="bdot" />
          <span>Explore: {c.name.split(' ').slice(0, 2).join(' ')}</span>
        </div>
        <div className="fbadge fb2">
          <div className="bdot" style={{ background: 'var(--navy)' }} />
          1000+ Students
        </div>
      </div>
    </section>
  );
}
