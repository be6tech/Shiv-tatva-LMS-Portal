import useScrollReveal from '../hooks/useScrollReveal';
import { ProgramsPageHeader } from '../components/programs/programUtils';
import InternshipsPanel from '../components/programs/InternshipsPanel';
import '../styles/programs-page.css';

export default function InternshipsPage() {
  useScrollReveal();

  return (
    <div className="programs-page">
      <ProgramsPageHeader
        pill="Internships"
        title="Internship Programs"
        subtitle="Gain real industry experience with stipends, mentors, and portfolio-ready projects."
      />
      <InternshipsPanel />
    </div>
  );
}
