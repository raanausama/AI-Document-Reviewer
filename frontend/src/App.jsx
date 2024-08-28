import { useEffect, forwardRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import clearCache from './utils/clearCache';
import { clearUser } from './redux/user';

import './App.css'
import Router from './routes'
import LazyLoader from './components/LazyLoader';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LazyLoader />;
  }
  return (
    <Router/>
  )
}

export default App
