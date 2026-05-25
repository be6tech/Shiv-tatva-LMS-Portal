import { TESTIMONIALS } from '../data/homeContent';

export default function Testimonials() {
  return (
    <section className="section" id="stories" style={{ background: '#fff' }}>
      <div className="sec-hdr fade-up">
        <div className="sec-pill">Student Stories</div>
        <h2 className="sec-title">Our Students, Their Success</h2>
        <p className="sec-sub">Hear from students who transformed their careers with Shiv Tatva Solutions.</p>
      </div>
      <div className="test-grid">
        {TESTIMONIALS.map((t, i) => (
          <div key={t.name} className="test-card fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="test-stars">{'★'.repeat(t.stars)}</div>
            <p className="test-txt">&ldquo;{t.text}&rdquo;</p>
            <div className="test-author">
              <div className="test-av" style={{ background: t.avBg }}>{t.av}</div>
              <div>
                <div className="test-name">{t.name}</div>
                <div className="test-role">{t.role}</div>
                <div className="test-co">{t.co}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
