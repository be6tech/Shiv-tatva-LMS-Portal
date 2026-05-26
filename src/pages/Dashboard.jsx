import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DashboardShell from '../components/DashboardShell';
import { getStoredEmail, formatUserFromEmail } from '../utils/auth';
import { refreshEnrollmentsFromApi } from '../utils/enrollment';
import { hasAuthToken } from '../utils/authSession';

const VIEW_TITLES = {
  overview: ['Dashboard', "Welcome back! Here's your learning progress."],
  courses: ['My Courses', 'Track progress across enrolled programs.'],
  assignments: ['Assignments', 'Pending tasks and graded submissions.'],
  placement: ['Placement', 'Doubt sessions, resume & LinkedIn, placement materials, mocks, and drives.'],
  certs: ['Certificates', 'Earned and upcoming credentials.']
};

const NAV = [
  { id: 'overview', label: '📊 Overview' },
  { id: 'courses', label: '📚 My Courses' },
  { id: 'assignments', label: '📝 Assignments' },
  { id: 'placement', label: '🚀 Placement' },
  { id: 'live', label: '📹 Live Session', href: '/live-session' }
];

export default function Dashboard() {
  const [params] = useSearchParams();
  const [view, setView] = useState(params.get('view') || 'overview');
  const email = getStoredEmail(params.get('email'));
  const user = useMemo(() => formatUserFromEmail(email), [email]);
  const [title, subtitle] = VIEW_TITLES[view] || VIEW_TITLES.overview;

  useEffect(() => {
    const v = params.get('view');
    if (v && VIEW_TITLES[v]) setView(v);
  }, [params]);

  useEffect(() => {
    if (hasAuthToken()) refreshEnrollmentsFromApi();
  }, []);

  return (
    <DashboardShell
      variant="student"
      title={title}
      subtitle={subtitle}
      userName={user.name}
      userRole="Student · Batch Jun 2025"
      initials={user.initials}
      navItems={NAV}
      activeView={view}
      onNavClick={setView}
      topAction={
        <Link to="/live-session" className="btn-dash-sm">Join Today&apos;s Class</Link>
      }
    >
      <div className={`dash-view${view === 'overview' ? ' active' : ''}`}>
        <div className="stats-row">
          <div className="stat-card"><div className="n">68%</div><div className="l">Overall Progress</div></div>
          <div className="stat-card"><div className="n">24</div><div className="l">Classes Attended</div></div>
          <div className="stat-card"><div className="n">3</div><div className="l">Pending Assignments</div></div>
          <div className="stat-card"><div className="n">92%</div><div className="l">Attendance Rate</div></div>
        </div>
        <div className="grid2-dash">
          <div className="dash-panel">
            <h2>My Courses <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setView('courses')}>View all</button></h2>
            <CourseRow pct={68} />
          </div>
          <div className="dash-panel">
            <h2>Upcoming</h2>
            <ul className="task-list">
              <li><span className="dot dot-orange" /> Spring Boot REST API — Due Fri</li>
              <li><span className="dot dot-navy" /> Mock Interview — Mon 4 PM</li>
              <li><span className="dot dot-green" /> Placement Drive: TCS — Jun 28</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`dash-view${view === 'courses' ? ' active' : ''}`}>
        <div className="dash-panel">
          <h2>Enrolled Courses</h2>
          <CourseRow pct={68} meta="Next: Microservices & JWT · Instructor: Arun K. · ₹1,20,000 plan" />
          <div className="course-row">
            <div className="cr-icon">📊</div>
            <div className="cr-info">
              <div className="cr-name">Aptitude for Placements</div>
              <div className="cr-meta">Bundled with placement program</div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: '40%' }} /></div>
            </div>
            <div className="cr-pct">40%</div>
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--muted)' }}>
            <Link to="/courses" style={{ color: 'var(--orange)', fontWeight: 700 }}>+ Browse more courses</Link>
          </p>
        </div>
      </div>

      <div className={`dash-view${view === 'assignments' ? ' active' : ''}`}>
        <div className="dash-panel">
          <h2>Assignments & Quizzes</h2>
          <ul className="task-list">
            <li><span className="dot dot-orange" /> REST API Project <span className="badge-dash badge-pending">Due in 2 days</span></li>
            <li><span className="dot dot-orange" /> SQL Joins Quiz <span className="badge-dash badge-pending">Due in 5 days</span></li>
            <li><span className="dot dot-green" /> OOP Concepts Assignment <span className="badge-dash badge-done">Submitted</span></li>
            <li><span className="dot dot-green" /> Git & GitHub Lab <span className="badge-dash badge-done">Graded · 92%</span></li>
          </ul>
        </div>
      </div>

      <div className={`dash-view${view === 'placement' ? ' active' : ''}`}>
        <div className="dash-panel">
          <h2>Placement Status</h2>
          <ul className="task-list">
            <li><span className="dot dot-green" /> Resume building workshop completed</li>
            <li><span className="dot dot-green" /> LinkedIn profile optimized</li>
            <li><span className="dot dot-green" /> Placement material pack downloaded</li>
            <li><span className="dot dot-green" /> 2 mock interviews + weekly doubt sessions attended</li>
            <li><span className="dot dot-green" /> Guaranteed internship — coordinator assigned (Premium)</li>
            <li><span className="dot dot-orange" /> TCS Drive — Registered · Interview Jun 28</li>
            <li><span className="dot dot-navy" /> Infosys Drive — Opens Jul 5</li>
          </ul>
          <Link to="/apply?type=placement" className="btn-dash-sm" style={{ display: 'inline-block', marginTop: 16 }}>Register for New Drive</Link>
        </div>
      </div>

      <div className={`dash-view${view === 'certs' ? ' active' : ''}`}>
        <div className="dash-panel">
          <h2>My Certificates</h2>
          <ul className="task-list">
            <li><span className="dot dot-green" /> Git & Version Control — <span className="badge-dash badge-done">Issued</span></li>
            <li><span className="dot dot-orange" /> Java Full Stack — <span className="badge-dash badge-pending">On completion</span></li>
          </ul>
          <p style={{ marginTop: 14, fontSize: 13, color: 'var(--muted)' }}>
            Certificates are QR-verified. Share your ID: <strong>ST-2025-08421</strong>
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}

function CourseRow({ pct, meta }) {
  return (
    <div className="course-row">
      <div className="cr-icon">☕</div>
      <div className="cr-info">
        <div className="cr-name">
          Java Full Stack Development <span className="tier-plan-badge">Premium</span>
        </div>
        <div className="cr-meta">
          {meta || (
            <>
              Month 4 of 6 · Live class tomorrow 7 PM ·{' '}
              <Link to="/course/java?tier=premium" style={{ color: 'var(--orange)', fontWeight: 700 }}>View curriculum</Link>
            </>
          )}
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
      </div>
      <div className="cr-pct">{pct}%</div>
    </div>
  );
}
