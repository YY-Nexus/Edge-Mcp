import { useEffect } from 'react';
import { getUserRole } from '../utils/auth';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const role = getUserRole();
    if (window.location.pathname.includes('/dashboard') && role !== 'instructor' && role !== 'admin') {
      window.location.href = '/student-home';
    }
  }, []);
  return <Component {...pageProps} />;
}