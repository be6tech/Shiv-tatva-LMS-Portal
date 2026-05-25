import { TEAM } from '../data/aboutContent';
import '../styles/page.css';

export default function About() {
  return (
    <>
      <div className="page-standalone">
        <h1>About Shiv Tatva</h1>
        <p className="lead">
          Shiv Tatva Solutions offers seven official programs — Java Full Stack, Python Full Stack, Cloud Computing, AI & ML, Cyber Security, SAP FICO & HANA, and Salesforce — with live mentorship and end-to-end placement support, headquartered in Hyderabad, Telangana.
        </p>
        <div className="about-stats">
          {[['1000+', 'Students Trained'], ['95%', 'Placement Rate'], ['200+', 'Hiring Partners'], ['50+', 'Expert Trainers']].map(([n, l]) => (
            <div key={l} className="about-stat"><div className="n">{n}</div><div className="l">{l}</div></div>
          ))}
        </div>
        <h2 style={{ fontFamily: 'Nunito', fontSize: 22, fontWeight: 900, marginBottom: 20 }}>Our Leadership</h2>
        <div className="team-grid">
          {TEAM.map(t => (
            <div key={t.name} className="team-card">
              <div className="team-av">{t.av}</div>
              <div className="team-name">{t.name}</div>
              <div className="team-role">{t.role}</div>
            </div>
          ))}
        </div>
        <div className="mission-block">
          <h2>Our Mission</h2>
          <p>
            To bridge the gap between academic learning and industry expectations by delivering practical, project-based education with measurable career outcomes for every student who walks through our doors — online or in-person.
          </p>
        </div>
      </div>
    </>
  );
}
