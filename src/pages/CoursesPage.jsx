import useScrollReveal from '../hooks/useScrollReveal';
import { ProgramsPageHeader } from '../components/programs/programUtils';
import CoursesPanel from '../components/programs/CoursesPanel';
import '../styles/programs-page.css';

export default function CoursesPage() {
  useScrollReveal();

  return (
    <div className="programs-page">
      <ProgramsPageHeader
        pill="Courses"
        title="All Courses"
        subtitle="Seven brochure-backed full-stack and specialist programs — pick Basic, Pro, or Premium for each track."
      />
      <CoursesPanel />
    </div>
  );
}
