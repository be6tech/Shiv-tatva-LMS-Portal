import { Link } from 'react-router-dom';
import { clearAuthSession } from '../utils/authSession';
import '../styles/dashboard.css';

export default function DashboardShell({
  variant = 'student',
  title,
  subtitle,
  userName = 'Student',
  userRole = 'Student · Batch Jun 2025',
  initials = 'ST',
  navItems = [],
  activeView,
  onNavClick,
  topAction,
  children
}) {
  const brand = variant === 'admin' ? (
    <h2>SHIV<em>TATVA</em> Admin</h2>
  ) : (
    <Link to="/" className="sb-logo">
      <img src="/logo.png" alt="Shiv Tatva" className="sb-logo-img" />
    </Link>
  );

  return (
    <div className={`dashboard-layout${variant === 'admin' ? ' admin-side' : ''}`}>
      <aside className="dashboard-sidebar">
        {brand}
        {variant === 'student' && (
          <div className="sb-user">
            <div className="sb-av">{initials}</div>
            <div>
              <div className="sb-name">{userName}</div>
              <div className="sb-role">{userRole}</div>
            </div>
          </div>
        )}
        {navItems.map(item => (
          item.href ? (
            <Link key={item.id} to={item.href} className={`side-link${item.id === activeView ? ' active' : ''}`}>
              {item.label}
            </Link>
          ) : (
            <button
              key={item.id}
              type="button"
              className={`side-link${item.id === activeView ? ' active' : ''}`}
              onClick={() => onNavClick?.(item.id)}
            >
              {item.label}
            </button>
          )
        ))}
        <div className="sb-foot">
          <Link to="/login" className="sb-logout" onClick={() => clearAuthSession()}>
            ← Logout
          </Link>
        </div>
      </aside>
      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {topAction}
        </div>
        {children}
      </main>
    </div>
  );
}
