import { Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import CertificationDetail from './pages/CertificationDetail';
import Pricing from './pages/Pricing';
import Apply from './pages/Apply';
import EnrollRegister from './pages/EnrollRegister';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import LiveSession from './pages/LiveSession';
import InternshipDetail from './pages/InternshipDetail';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import TrainerDashboard from './pages/TrainerDashboard';
import CoursesPage from './pages/CoursesPage';
import InternshipsPage from './pages/InternshipsPage';
import PlacementPage from './pages/PlacementPage';
import TrainingPage from './pages/TrainingPage';
import CartPage from './pages/CartPage';

function LegacyHtmlRedirect() {
  const file = window.location.pathname.split('/').pop() || '';
  const qs = new URLSearchParams(window.location.search);

  if (file === 'course-detail.html') {
    const c = qs.get('course') || 'java';
    const tier = qs.get('tier');
    return <Navigate to={`/course/${c}${tier ? `?tier=${tier}` : ''}`} replace />;
  }
  if (file === 'certification-detail.html') {
    return <Navigate to={`/certification/${qs.get('cert') || 'java'}`} replace />;
  }
  if (file === 'internship-detail.html') {
    return <Navigate to={`/internship/${qs.get('id') || qs.get('role') || 'java'}`} replace />;
  }
  if (file === 'apply.html') {
    return <Navigate to={`/apply${qs.toString() ? `?${qs}` : ''}`} replace />;
  }

  const map = {
    'index.html': '/',
    'pricing.html': '/pricing',
    'login.html': '/login',
    'about.html': '/about',
    'contact.html': '/contact',
    'live-session.html': '/live-session',
    'dashboard.html': '/dashboard',
    'admin-dashboard.html': '/admin',
    'trainer-dashboard.html': '/trainer'
  };
  return <Navigate to={map[file] || '/'} replace />;
}

export const routes = [
  { path: '/index.html', element: <LegacyHtmlRedirect /> },
  { path: '/pricing.html', element: <Navigate to="/pricing" replace /> },
  { path: '/apply.html', element: <LegacyHtmlRedirect /> },
  { path: '/login.html', element: <Navigate to="/login" replace /> },
  { path: '/about.html', element: <Navigate to="/about" replace /> },
  { path: '/contact.html', element: <Navigate to="/contact" replace /> },
  { path: '/live-session.html', element: <Navigate to="/live-session" replace /> },
  { path: '/dashboard.html', element: <Navigate to="/dashboard" replace /> },
  { path: '/admin-dashboard.html', element: <Navigate to="/admin" replace /> },
  { path: '/trainer-dashboard.html', element: <Navigate to="/trainer" replace /> },
  { path: '/course-detail.html', element: <LegacyHtmlRedirect /> },
  { path: '/certification-detail.html', element: <LegacyHtmlRedirect /> },
  { path: '/internship-detail.html', element: <LegacyHtmlRedirect /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'courses', element: <CoursesPage /> },
      { path: 'internships', element: <InternshipsPage /> },
      { path: 'placement', element: <PlacementPage /> },
      { path: 'training', element: <TrainingPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'course/:courseId', element: <CourseDetail /> },
      { path: 'certification/:certId', element: <CertificationDetail /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'apply', element: <Apply /> },
      { path: 'enroll', element: <EnrollRegister /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'live-session', element: <LiveSession /> },
      { path: 'internship/:internId', element: <InternshipDetail /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'admin', element: <AdminDashboard /> },
      { path: 'trainer', element: <TrainerDashboard /> }
    ]
  },
  { path: '*', element: <Navigate to="/" replace /> }
];
