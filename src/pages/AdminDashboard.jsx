import DashboardShell from '../components/DashboardShell';
import { ADMIN_APPLICATIONS } from '../data/aboutContent';

const NAV = [
  { id: 'overview', label: '📊 Overview' },
  { id: 'students', label: '👥 Students' },
  { id: 'courses', label: '📚 Courses' },
  { id: 'internships', label: '💼 Internships' },
  { id: 'placements', label: '🚀 Placements' },
  { id: 'applications', label: '📋 Applications' }
];

export default function AdminDashboard() {
  return (
    <DashboardShell
      variant="admin"
      title="Admin Control Panel"
      subtitle="Manage students, applications, and placement drives."
      navItems={NAV}
      activeView="overview"
      onNavClick={() => {}}
    >
      <div className="admin-grid">
        <div className="admin-stat"><div className="n">5,124</div><div className="l">Students</div></div>
        <div className="admin-stat"><div className="n">48</div><div className="l">New Applications</div></div>
        <div className="admin-stat"><div className="n">12</div><div className="l">Active Drives</div></div>
        <div className="admin-stat"><div className="n">₹8.2L</div><div className="l">Revenue (MTD)</div></div>
      </div>
      <div className="admin-panels">
        <div className="dash-panel">
          <h2>Recent Applications</h2>
          {ADMIN_APPLICATIONS.map(a => (
            <div key={a.name} className="admin-row">
              <span>{a.name} — {a.program}</span>
              <span className={a.status === 'new' ? 'badge-new-sm' : 'badge-ok-sm'}>{a.status === 'new' ? 'New' : 'Contacted'}</span>
            </div>
          ))}
        </div>
        <div className="dash-panel">
          <h2>Quick Actions</h2>
          <div className="admin-row"><span>Post placement drive</span><button type="button" className="btn-admin-sm">Create</button></div>
          <div className="admin-row"><span>Add new course batch</span><button type="button" className="btn-admin-sm">Create</button></div>
          <div className="admin-row"><span>Export attendance report</span><button type="button" className="btn-admin-sm">Export</button></div>
        </div>
      </div>
    </DashboardShell>
  );
}
