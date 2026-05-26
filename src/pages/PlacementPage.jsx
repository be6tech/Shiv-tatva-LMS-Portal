import useScrollReveal from '../hooks/useScrollReveal';
import { ProgramsPageHeader } from '../components/programs/programUtils';
import PlacementPanel from '../components/programs/PlacementPanel';
import '../styles/programs-page.css';

export default function PlacementPage() {
  useScrollReveal();

  return (
    <div className="programs-page">
      <ProgramsPageHeader
        pill="Placement"
        title="Placement Support"
        subtitle="Resume, LinkedIn, mocks, and hiring drives — we support you until you land your role."
      />
      <PlacementPanel />
    </div>
  );
}
