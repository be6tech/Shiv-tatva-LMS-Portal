import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardShell from '../components/DashboardShell';
import { TRAINER_SCHEDULE } from '../data/aboutContent';
import { getStoredEmail, formatUserFromEmail } from '../utils/auth';

const NAV = [
  { id: 'overview', label: '📊 Dashboard' },
  { id: 'batches', label: '📚 My Batches' },
  { id: 'assignments', label: '📝 Assignments' },
  { id: 'attendance', label: '✅ Attendance' },
  { id: 'live', label: '📹 Live Classes', href: '/live-session' }
];

export default function TrainerDashboard() {
  const [params] = useSearchParams();
  const email = getStoredEmail(params.get('email'));
  const user = useMemo(() => formatUserFromEmail(email || 'trainer@shivtatva.com'), [email]);

  return (
    <DashboardShell
      variant="trainer"
      title="Trainer Portal"
      subtitle={`Welcome, ${user.name.split(' ')[0]}`}
      navItems={NAV}
      activeView="overview"
      onNavClick={() => {}}
    >
      <div className="trainer-grid">
        <div className="stat-card"><div className="n">3</div><div className="l">Active Batches</div></div>
        <div className="stat-card"><div className="n">142</div><div className="l">Total Students</div></div>
        <div className="stat-card"><div className="n">18</div><div className="l">Pending Reviews</div></div>
      </div>
      <div className="dash-panel">
        <h2>Today&apos;s Schedule</h2>
        {TRAINER_SCHEDULE.map(s => (
          <div key={s.time} className="admin-row">
            <span>{s.time}</span>
            <span style={{ color: 'var(--muted)' }}>{s.students}</span>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
