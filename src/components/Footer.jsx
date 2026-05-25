import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/logo.png" alt="Shiv Tatva Solutions Private Limited" className="footer-logo-img" />
          <p>Empowering students with industry-ready skills, real-time projects, and placement support. Your career transformation starts here.</p>
          <div className="socials">
            <a className="sl" href="#">in</a>
            <a className="sl" href="#">𝕏</a>
            <a className="sl" href="#">▶</a>
            <a className="sl" href="#">ig</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/pricing">Pricing (Basic / Pro / Premium)</Link></li>
            <li><Link to="/?program=courses">Courses</Link></li>
            <li><Link to="/?program=certifications">Training</Link></li>
            <li><Link to="/?program=internships">Internship</Link></li>
            <li><Link to="/?program=placement">Placement</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Programs</h4>
          <ul>
            <li><Link to="/course/java">Java Full Stack</Link></li>
            <li><Link to="/course/python">Python Full Stack</Link></li>
            <li><Link to="/course/cloud">Cloud Computing</Link></li>
            <li><Link to="/course/ai">AI & ML</Link></li>
            <li><Link to="/course/cyber">Cyber Security</Link></li>
            <li><Link to="/course/sap">SAP FICO & HANA</Link></li>
            <li><Link to="/course/salesforce">Salesforce</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Stay Updated</h4>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', marginBottom: 14, fontWeight: 500 }}>Get course updates and placement news in your inbox.</p>
          <div className="nl-row">
            <input type="email" placeholder="Your email address" />
            <button type="button">Subscribe</button>
          </div>
          <div className="footer-contact">
            📧 info@shivtatva.com<br />📞 +91 98765 43210<br />📍 Hyderabad, Telangana
          </div>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Shiv Tatva Solutions Private Limited. All rights reserved.</div>
    </footer>
  );
}
