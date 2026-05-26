import useScrollReveal from '../hooks/useScrollReveal';
import { ProgramsPageHeader } from '../components/programs/programUtils';
import TrainingPanel from '../components/programs/TrainingPanel';
import '../styles/programs-page.css';

export default function TrainingPage() {
  useScrollReveal();

  return (
    <div className="programs-page">
      <ProgramsPageHeader
        pill="Training"
        title="Industry Training"
        subtitle="Focused certification prep — ₹1,500 per program with live classes and mock tests."
      />
      <TrainingPanel />
    </div>
  );
}
