import { Link, useLocation } from 'react-router-dom';
import useCart from '../hooks/useCart';
import '../styles/bottom-nav.css';

const TABS = [
  { id: 'home', label: 'Home', to: '/', isActive: pathname => pathname === '/' },
  { id: 'courses', label: 'Courses', to: '/courses', isActive: pathname => pathname === '/courses' || pathname.startsWith('/course/') },
  { id: 'internships', label: 'Internships', to: '/internships', isActive: pathname => pathname === '/internships' || pathname.startsWith('/internship/') },
  { id: 'placement', label: 'Placement', to: '/placement', isActive: pathname => pathname === '/placement' },
  { id: 'training', label: 'Training', to: '/training', isActive: pathname => pathname.startsWith('/training') || pathname.startsWith('/certification/') },
  { id: 'cart', label: 'Cart', to: '/cart', isActive: pathname => pathname === '/cart' }
];

function Icon({ name, active }) {
  const c = active ? 'var(--orange)' : '#9ca3af';
  const icons = {
    home: (
      <svg viewBox="0 0 24 24" fill={active ? c : 'none'} stroke={c} strokeWidth="2">
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" strokeLinejoin="round" />
      </svg>
    ),
    courses: (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <rect x="4" y="4" width="7" height="7" rx="1.5" fill={active ? c : 'none'} />
        <rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" fill={active ? c : 'none'} />
      </svg>
    ),
    internships: (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <rect x="3" y="7" width="18" height="13" rx="2" fill={active ? c : 'none'} />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      </svg>
    ),
    placement: (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <path d="M4.5 16.5l7.5-9 7.5 9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4v12" strokeLinecap="round" />
      </svg>
    ),
    training: (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <circle cx="12" cy="9" r="5" fill={active ? c : 'none'} />
        <path d="M7 14h10l1 6H6l1-6z" strokeLinejoin="round" />
      </svg>
    ),
    cart: (
      <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <path d="M6 6h15l-1.5 9H8L6 6z" strokeLinejoin="round" />
        <circle cx="10" cy="20" r="1.5" fill={active ? c : 'none'} />
        <circle cx="18" cy="20" r="1.5" fill={active ? c : 'none'} />
        <path d="M6 6L5 3H2" strokeLinecap="round" />
      </svg>
    )
  };
  return <span className="bottom-nav-icon">{icons[name]}</span>;
}

export default function BottomNav() {
  const { pathname } = useLocation();
  const { count } = useCart();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {TABS.map(tab => {
        const active = tab.isActive(pathname);
        const badge = tab.id === 'cart' && count > 0 ? count : 0;
        return (
          <Link
            key={tab.id}
            to={tab.to}
            className={`bottom-nav-item${active ? ' active' : ''}`}
            onClick={() => {
              if (tab.id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="bottom-nav-icon-wrap">
              <Icon name={tab.id} active={active} />
              {badge > 0 && (
                <span className="bottom-nav-badge" aria-label={`${badge} items in cart`}>
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </span>
            <span className="bottom-nav-label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
