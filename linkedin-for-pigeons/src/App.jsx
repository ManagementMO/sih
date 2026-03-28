import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Jobs from './pages/Jobs'
import Messaging from './pages/Messaging'
import Network from './pages/Network'
import Notifications from './pages/Notifications'

function App() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let index = 0;
    const handler = (e) => {
      if (e.key === code[index]) {
        index++;
        if (index === code.length) {
          setShowEasterEgg(true);
          setTimeout(() => setShowEasterEgg(false), 3500);
          index = 0;
        }
      } else {
        index = 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {showEasterEgg && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
          <div className="animate-fly-across text-[120px]">🐦</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-black text-li-blue opacity-80" style={{textShadow: '2px 2px 0 white'}}>COO!</div>
        </div>
      )}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Feed />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/network" element={<Network />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
