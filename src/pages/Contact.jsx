import { useState } from 'react';
import { SITE_CONTACT } from '../data/siteContact';
import '../styles/page.css';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const info = [
    ...SITE_CONTACT.phones.map(p => ({
      ico: '📞',
      title: p.label,
      sub: 'Mon–Sat, 9 AM – 7 PM',
      href: p.href
    })),
    ...SITE_CONTACT.emails.map(e => ({
      ico: '✉️',
      title: e.label,
      sub: 'Replies within 24 hours',
      href: e.href
    })),
    {
      ico: '📍',
      title: SITE_CONTACT.company,
      sub: SITE_CONTACT.addressLine,
      href: null
    }
  ];

  return (
    <>
      <div className="page-standalone" style={{ paddingBottom: 0 }}>
        <h1>Contact Us</h1>
        <p className="lead" style={{ marginBottom: 36 }}>
          Have questions about courses, placements, or partnerships? We&apos;re here to help.
        </p>
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          {info.map(i => (
            <div key={i.title} className="contact-info-item">
              <span className="ico">{i.ico}</span>
              <div>
                {i.href ? (
                  <a href={i.href} style={{ color: 'var(--navy)', fontWeight: 700 }}>
                    {i.title}
                  </a>
                ) : (
                  i.title
                )}
                <span>{i.sub}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="form-card-page">
          {sent ? (
            <p className="form-ok">✅ Message sent! We&apos;ll get back to you soon.</p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
              <label>Name *</label>
              <input name="name" required />
              <label>Email *</label>
              <input type="email" name="email" required />
              <label>Subject</label>
              <select name="subject" defaultValue="Course Inquiry">
                <option>Course Inquiry</option>
                <option>Internship</option>
                <option>Placement</option>
                <option>Corporate Training</option>
                <option>Other</option>
              </select>
              <label>Message *</label>
              <textarea name="message" required placeholder="How can we help?" />
              <button type="submit" className="btn-submit">Send Message →</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
