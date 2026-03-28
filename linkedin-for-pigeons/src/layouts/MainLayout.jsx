import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  CircleUserRound,
  Search,
} from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/network', icon: Users, label: 'My Network' },
  { to: '/jobs', icon: Briefcase, label: 'Jobs' },
  { to: '/messaging', icon: MessageSquare, label: 'Messaging', badge: '5' },
  { to: '/notifications', icon: Bell, label: 'Notifications', badge: '3+' },
]

function MainLayout() {
  const [dismissed, setDismissed] = useState(false)

  return (
    <div className="min-h-screen bg-li-bg">
      {/* Premium upsell banner */}
      {!dismissed && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center py-1.5 px-4 text-xs font-medium flex items-center justify-center gap-2">
          <span>✨ Try PigeonIn Premium for free! See who's been cooing at your profile.</span>
          <button onClick={() => setDismissed(true)} className="ml-2 hover:text-amber-200 font-bold">×</button>
        </div>
      )}

      {/* Fixed top navbar */}
      <nav className={`fixed ${dismissed ? 'top-0' : 'top-[30px]'} left-0 right-0 z-50 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_3px_rgba(0,0,0,0.04)]`}>
        <div className="mx-auto flex h-[52px] max-w-[1128px] items-center px-4">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-2">
            {/* PigeonIn Logo */}
            <NavLink to="/" className="flex shrink-0 items-center gap-0.5 no-underline">
              <span className="text-[22px] leading-none" role="img" aria-label="pigeon">🐦</span>
              <span className="text-[20px] font-semibold tracking-tight text-li-text">
                Pigeon
              </span>
              <span className="inline-flex items-center rounded-[3px] bg-li-blue px-[3px] py-[1px] text-[14px] font-bold leading-tight text-white">
                in
              </span>
            </NavLink>

            {/* Search bar */}
            <div className="relative ml-2">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-li-secondary"
              />
              <input
                type="text"
                placeholder="Search for pigeons, crumbs, or opportunities"
                className="h-[34px] w-[280px] rounded-[4px] border-none bg-[#eef3f8] py-1.5 pl-9 pr-3 text-[14px] text-li-text placeholder-li-secondary/80 outline-none focus:w-[360px] focus:shadow-[0_0_0_2px_#0a66c2] transition-all duration-200"
              />
            </div>
          </div>

          {/* Center spacer */}
          <div className="flex-1" />

          {/* Right: Nav icons */}
          <div className="flex items-center gap-0">
            {navItems.map(({ to, icon: Icon, label, badge }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative flex min-w-[80px] flex-col items-center justify-center px-3 py-0 no-underline transition-colors duration-100 h-[52px] border-b-2 ${
                    isActive
                      ? 'border-li-nav-active text-li-nav-active'
                      : 'border-transparent text-li-nav-icon hover:text-li-nav-active'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="relative">
                      <Icon
                        size={24}
                        strokeWidth={isActive ? 2 : 1.5}
                      />
                      {badge && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{badge}</span>
                      )}
                    </div>
                    <span className="mt-0.5 text-[12px] leading-tight whitespace-nowrap">
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}

            {/* Divider */}
            <div className="mx-1 h-[40px] w-px bg-li-border" />

            {/* Me dropdown */}
            <NavLink
              to="/profile/me"
              className={({ isActive }) =>
                `relative flex min-w-[80px] flex-col items-center justify-center px-3 py-0 no-underline transition-colors duration-100 h-[52px] border-b-2 ${
                  isActive
                    ? 'border-li-nav-active text-li-nav-active'
                    : 'border-transparent text-li-nav-icon hover:text-li-nav-active'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-li-blue/15">
                    <CircleUserRound
                      size={24}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                  </div>
                  <span className="mt-0.5 flex items-center gap-0.5 text-[12px] leading-tight">
                    Me
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 11.4L2.6 6 4 4.6l4 4 4-4L13.4 6z" />
                    </svg>
                  </span>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Page content below fixed navbar */}
      <main className={`mx-auto max-w-[1128px] px-4 ${dismissed ? 'pt-[68px]' : 'pt-[98px]'}`}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-[1128px] px-4 py-6 text-center text-xs text-li-secondary border-t border-li-border mt-8">
        <p className="font-semibold mb-1">PigeonIn Corporation © 2026</p>
        <p>About · Accessibility (All ledges welcome) · Privacy Policy (We watch everything) · Terms of Perching · Advertising · Business Services</p>
        <p className="mt-1">PigeonIn is not affiliated with LinkedIn. Pigeons are not real (allegedly). 🐦</p>
      </footer>
    </div>
  )
}

export default MainLayout
