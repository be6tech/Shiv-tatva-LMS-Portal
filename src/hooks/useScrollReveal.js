import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Mirrors legacy IntersectionObserver — .fade-up starts hidden until .visible */
export default function useScrollReveal(extraDeps = []) {
  const location = useLocation();

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    const observe = () => {
      document.querySelectorAll('.fade-up:not(.visible)').forEach(el => obs.observe(el));
    };

    observe();
    const t = window.setTimeout(observe, 100);

    return () => {
      window.clearTimeout(t);
      obs.disconnect();
    };
  }, [location.pathname, location.search, ...extraDeps]);
}
