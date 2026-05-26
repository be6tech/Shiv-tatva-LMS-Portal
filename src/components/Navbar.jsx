import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="nav-wrap">
        <nav>
          <Link to="/" className="nav-logo">
            <img src="/logo.png" alt="Shiv Tatva Solutions Private Limited" className="nav-logo-img" />
          </Link>
          <button type="button" className="nav-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
          <ul className={`nav-links${open ? ' open' : ''}`}>
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/courses" onClick={() => setOpen(false)}>Courses</Link></li>
            <li><Link to="/internships" onClick={() => setOpen(false)}>Internships</Link></li>
            <li><Link to="/placement" onClick={() => setOpen(false)}>Placement</Link></li>
            <li><Link to="/training" onClick={() => setOpen(false)}>Training</Link></li>
            <li><a href="/#features" onClick={e => { e.preventDefault(); setOpen(false); navigate('/#features'); }}>Features</a></li>
            <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
          </ul>
          <div className="nav-cta">
            <button type="button" className="btn-ghost" onClick={() => navigate('/live-session')}>Join Free Live Session</button>
            <button type="button" className="btn-ghost" onClick={() => navigate('/signup')}>Sign Up</button>
            <button type="button" className="btn-orange" onClick={() => navigate('/login')}>Login</button>
          </div>
        </nav>
      </div>
      {open && <div className="nav-overlay show" onClick={() => setOpen(false)} aria-hidden="true" />}
    </>
  );
}
