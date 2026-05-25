import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/page.css';

const INFO = [
  { ico: '📞', title: '+91 98765 43210', sub: 'Mon–Sat, 9 AM – 7 PM' },
  { ico: '✉️', title: 'info@shivtatva.com', sub: 'Replies within 24 hours' },
  { ico: '📍', title: 'Hyderabad, Telangana', sub: 'HITEC City · India' },
  { ico: '💬', title: 'WhatsApp Counselor', sub: '+91 98765 43210' }
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <div className="page-standalone" style={{ paddingBottom: 0 }}>
        <h1>Contact Us</h1>
        <p className="lead" style={{ marginBottom: 36 }}>Have questions about courses, placements, or partnerships? We&apos;re here to help.</p>
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          {INFO.map(i => (
            <div key={i.title} className="contact-info-item">
              <span className="ico">{i.ico}</span>
              <div>{i.title}<span>{i.sub}</span></div>
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
