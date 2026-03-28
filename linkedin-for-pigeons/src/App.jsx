import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Jobs from './pages/Jobs'
import Messaging from './pages/Messaging'
import Network from './pages/Network'
import Notifications from './pages/Notifications'

function App() {
  return (
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
  )
}

export default App
