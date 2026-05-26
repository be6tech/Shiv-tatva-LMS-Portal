import { Link } from 'react-router-dom';
import { SITE_CONTACT, FOOTER_PROGRAM_TABS } from '../data/siteContact';

const PROGRAM_ROUTES = {
  courses: '/courses',
  internships: '/internships',
  placement: '/placement',
  certifications: '/training'
};

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/logo.png" alt="Shiv Tatva Solutions Private Limited" className="footer-logo-img" />
          <p>Empowering students with industry-ready skills, real-time projects, and placement support. Your career transformation starts here.</p>
          <div className="socials">
            <a className="sl" href="#" aria-label="LinkedIn">in</a>
            <a className="sl" href="#" aria-label="X">𝕏</a>
            <a className="sl" href="#" aria-label="YouTube">▶</a>
            <a className="sl" href="#" aria-label="Instagram">ig</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/pricing">Pricing (Basic / Pro / Premium)</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Programs</h4>
          <ul>
            {FOOTER_PROGRAM_TABS.map(t => (
              <li key={t.id}>
                <Link to={PROGRAM_ROUTES[t.id]}>
                  {t.icon} {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Stay Updated</h4>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', marginBottom: 14, fontWeight: 500 }}>
            Get course updates and placement news in your inbox.
          </p>
          <div className="nl-row">
            <input type="email" placeholder="Your email address" />
            <button type="button">Subscribe</button>
          </div>
          <div className="footer-contact">
            {SITE_CONTACT.emails.map(e => (
              <a key={e.href} href={e.href} className="footer-contact-link">
                📧 {e.label}
              </a>
            ))}
            {SITE_CONTACT.phones.map(p => (
              <a key={p.href} href={p.href} className="footer-contact-link">
                📞 {p.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <p className="footer-address">
            <strong>{SITE_CONTACT.company}</strong>, {SITE_CONTACT.addressLine}
          </p>
          <p className="footer-reach">
            {SITE_CONTACT.emails.map((e, i) => (
              <span key={e.href}>
                {i > 0 && ' · '}
                <a href={e.href}>{e.label}</a>
              </span>
            ))}
            {' · '}
            {SITE_CONTACT.phones.map((p, i) => (
              <span key={p.href}>
                {i > 0 && ' · '}
                <a href={p.href}>{p.label}</a>
              </span>
            ))}
          </p>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Shiv Tatva Solutions Private Limited. All rights reserved.</p>
      </div>
    </footer>
  );
}
