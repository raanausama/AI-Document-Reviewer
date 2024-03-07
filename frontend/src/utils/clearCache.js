export default function clearCache() {
    if ('caches' in window) {
      caches.keys().then((names) => {
        // Delete all the cache files
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
  
    sessionStorage.clear();
    localStorage.removeItem('persist:root');
    localStorage.clear();
    localStorage.setItem('logout-event', `logout  ${Math.random()}`);
  
    window.location.href = `${process.env.REACT_APP_CLIENT_URL}/login`;
  }