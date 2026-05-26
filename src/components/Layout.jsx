import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';

export default function Layout() {
  const { pathname } = useLocation();
  const hideChrome =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/trainer');

  useEffect(() => {
    if (hideChrome) {
      document.body.classList.remove('has-bottom-nav');
      return undefined;
    }
    document.body.classList.add('has-bottom-nav');
    return () => document.body.classList.remove('has-bottom-nav');
  }, [hideChrome]);

  return (
    <>
      <Navbar />
      <Outlet />
      {!hideChrome && <Footer />}
      {!hideChrome && <BottomNav />}
    </>
  );
}
