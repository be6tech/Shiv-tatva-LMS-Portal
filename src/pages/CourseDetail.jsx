import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { enrollUrl } from '../utils/enrollUrl';
import { COURSES, CURRICULA, TIER_PLANS, TIER_COMPARE_ROWS, courseImage, courseImageFallback } from '../data';
import { MonthCurriculumPanel } from '../components/WeekCurriculum';
import { normalizeMonth } from '../utils/curriculum';
import { buildLessonAccessMap } from '../utils/videoAccess';
import { refreshEnrollmentsFromApi } from '../utils/enrollment';
import { hasAuthToken } from '../utils/authSession';
import { addToCart } from '../utils/cart';
import '../styles/course-detail.css';
import '../styles/cart.css';

const TIERS = ['basic', 'pro', 'premium'];

export default function CourseDetail() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const course = COURSES[courseId] || COURSES.java;
  const curr = CURRICULA[courseId] || CURRICULA.java;
  const initialTier = TIER_PLANS[searchParams.get('tier')] ? searchParams.get('tier') : 'pro';
  const [activeTier, setActiveTier] = useState(initialTier);
  const [activeMonth, setActiveMonth] = useState(1);
  const [enrollmentSync, setEnrollmentSync] = useState(0);
  const [cartMsg, setCartMsg] = useState('');

  useEffect(() => {
    const t = searchParams.get('tier');
    if (t && TIER_PLANS[t]) setActiveTier(t);
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (hasAuthToken()) await refreshEnrollmentsFromApi();
      if (!cancelled) setEnrollmentSync(n => n + 1);
    })();
    return () => {
      cancelled = true;
    };
  }, [course.id]);

  const selectTier = (tid) => {
    setActiveTier(tid);
    setSearchParams({ tier: tid });
  };

  const plan = TIER_PLANS[activeTier];
  const monthCount = course.tierMonths[activeTier];
  const months = curr.months.slice(0, monthCount).map(normalizeMonth);
  const enrollLink = enrollUrl({ course: course.id, tier: activeTier });
  const demoUrl = `/apply?type=course&course=${course.id}&tier=${activeTier}`;

  const handleAddToCart = () => {
    const added = addToCart({ courseId: course.id, tier: activeTier });
    setCartMsg(added ? 'Added to cart!' : 'Already in your cart');
    window.setTimeout(() => setCartMsg(''), 2500);
  };

  const { map: accessMap } = useMemo(() => {
    const full = curr.months.map(normalizeMonth);
    return buildLessonAccessMap(full, course.id);
  }, [curr.months, course.id, enrollmentSync]);

  const heroTitle = curr.titleEm ? (
    <>{curr.title} <em>{curr.titleEm}</em></>
  ) : (
    <>{curr.title.split(' ').slice(0, -1).join(' ')} <em>{curr.title.split(' ').slice(-1)}</em></>
  );

  return (
    <>
      <div className="course-hero">
        <div className="hero-inner">
          <Link to="/courses" className="course-back-link">← Back to Courses</Link>
          <div className="course-tag"><span className="course-tag-dot" /><span className="course-tag-label">{curr.cat} · 3 Plans</span></div>
          <h1>{heroTitle}</h1>
          <p>{curr.heroDesc}</p>
          <div className="hero-meta">
            <div className="hm-item"><span>📦</span>Basic ₹40K · Pro ₹70K · Premium ₹1.2L</div>
            <div className="hm-item"><span>⏱</span>{course.duration}</div>
            <div className="hm-item"><span>📹</span>{curr.videos} Video Lessons</div>
            <div className="hm-item"><span>💼</span>Doubt · Resume · LinkedIn · Placement Materials</div>
          </div>
          <div className="hero-btns">
            <button type="button" className="btn-hero-enroll" onClick={() => navigate(enrollLink)}>Enroll {plan.name} – {plan.price}</button>
            <button type="button" className="btn-hero-outline" onClick={() => navigate(demoUrl)}>Request Free Demo</button>
          </div>
        </div>
      </div>
      <div className="stats-strip">
        {[['3', 'Plan Types'], ['₹40K', 'Basic'], ['₹70K', 'Pro'], ['₹1.2L', 'Premium'], [course.students, 'Students']].map(([n, l]) => (
          <div key={l} className="ss-item"><div className="ss-num">{n}</div><div className="ss-lbl">{l}</div></div>
        ))}
      </div>
      <div className="main-wrap">
        <div className="left-col">
          <div className="tier-picker-wrap">
            <div className="tier-picker-title">Choose Your Plan</div>
            <div className="tier-picker-grid">
              {TIERS.map(tid => (
                <div key={tid} className={`tier-card tier-${tid}${activeTier === tid ? ' active' : ''}`} onClick={() => selectTier(tid)}>
                  <div className="tier-card-name">{TIER_PLANS[tid].name}</div>
                  <div className="tier-card-price">{TIER_PLANS[tid].price}</div>
                  <div className="tier-card-meta">{course.duration} · {course.tierModules[tid].length} modules</div>
                  <span className="tier-card-badge">{TIER_PLANS[tid].durationNote}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="tier-modules-box">
            <div className="tier-modules-title">{plan.name} plan — modules included ({course.duration})</div>
            <ul className="tier-module-list">{course.tierModules[activeTier].map(m => <li key={m}>{m}</li>)}</ul>
          </div>
          <div className="tier-compare-wrap">
            <div className="tier-compare-title">Compare all plans</div>
            <table className="tier-compare-table">
              <thead><tr><th>Feature</th>{TIERS.map(t => <th key={t} className={`col-${t}${activeTier === t ? ' hl' : ''}`}>{TIER_PLANS[t].name}</th>)}</tr></thead>
              <tbody>
                {TIER_COMPARE_ROWS.map(row => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    {TIERS.map(t => <td key={t} className={activeTier === t ? 'hl' : ''}>{row[t]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overview-pills">
            {curr.pills.map(p => {
              const parts = p.split(' ');
              return <div key={p} className="ov-pill"><span>{parts[0]}</span> {parts.slice(1).join(' ')}</div>;
            })}
          </div>
          <div className="tab-bar">
            {months.map((m, i) => (
              <button key={m.num} type="button" className={`tab-btn${activeMonth === m.num ? ' active' : ''}`} onClick={() => setActiveMonth(m.num)}>Month {m.num}</button>
            ))}
          </div>
          {months.map(m => (
            <MonthCurriculumPanel
              key={m.num}
              month={m}
              active={activeMonth === m.num}
              weekLabel="Week"
              accessMap={accessMap}
            />
          ))}
        </div>
        <aside className="sidebar">
          <div className="sidebar-card">
            <div className="sc-thumb sc-thumb-img-wrap">
              <picture>
                <source srcSet={course.image || courseImage(course.id)} type="image/webp" />
                <img
                  src={course.imageFallback || courseImageFallback(course.id)}
                  alt=""
                  className="sc-thumb-img"
                />
              </picture>
              <span className="sc-thumb-badge" aria-hidden>{curr.emoji}</span>
            </div>
            <div className="sc-body">
              <div className="sc-plan-label">{plan.name} Plan</div>
              <div className="sc-price">{plan.price}</div>
              <div className="sc-tier-note">{course.duration} program · {monthCount} months of curriculum · {course.tierModules[activeTier].length} modules</div>
              {course.brochure && <a className="btn-brochure" href={course.brochure} target="_blank" rel="noopener">📄 Download Official Brochure</a>}
              <button type="button" className="btn-enroll-big" onClick={() => navigate(enrollLink)}>Enroll Now</button>
              <button type="button" className="btn-add-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
              {cartMsg && <p className="cart-added-msg">{cartMsg}</p>}
              <button type="button" className="btn-demo" onClick={() => navigate(demoUrl)}>Request Free Demo</button>
              <hr className="sc-divider" />
              <ul className="sc-includes">{course.tierIncludes[activeTier].map(x => <li key={x}>{x}</li>)}</ul>
              <hr className="sc-divider" />
              <div className="sc-guarantee">🔒 7-Day Money-Back Guarantee</div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
