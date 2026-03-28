import { useState } from 'react';
import {
  Users,
  Contact,
  UsersRound,
  CalendarDays,
  FileText,
  X,
  Bird,
} from 'lucide-react';
import { pigeons, getPigeonById } from '../data/pigeons';
import Avatar from '../components/Avatar';

const extraPigeons = [
  {
    id: 'extra-1',
    name: 'Professor Coo-per',
    headline: 'Tenured Professor of Urban Foraging at Pigeon University',
    color: '#7c3aed',
    mutual: 7,
    connections: 312,
    connectionsLabel: '312',
  },
  {
    id: 'extra-2',
    name: 'Dave',
    headline: 'Just a pigeon. Nothing special. Standing here.',
    color: '#78716c',
    mutual: 1,
    connections: 14,
    connectionsLabel: '14',
  },
  {
    id: 'extra-3',
    name: 'Elon Coo-sk',
    headline: 'Technoking of PigeonX | Making pigeons multi-planetary',
    color: '#171717',
    mutual: 42,
    connections: 500,
    connectionsLabel: '500+',
  },
];

const allSuggestions = [...pigeons, ...extraPigeons];

const sidebarLinks = [
  { icon: Users, label: 'Connections', count: 487 },
  { icon: Contact, label: 'Contacts', count: '1,247' },
  { icon: Bird, label: 'Pigeons I Follow', count: 89 },
  { icon: UsersRound, label: 'Groups', count: 3 },
  { icon: CalendarDays, label: 'Events', count: 2 },
  { icon: FileText, label: 'Pages', count: 12 },
];

const groups = [
  'Toronto Pigeon Professionals',
  'Breadcrumb Economy Discussion',
  'Pigeons Who Code',
];

const bannerGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #0a66c2 0%, #378fe9 100%)',
  'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
  'linear-gradient(135deg, #09203f 0%, #537895 100%)',
];

function Network() {
  const [dismissed, setDismissed] = useState({});
  const [connected, setConnected] = useState({});
  const [toast, setToast] = useState(null);

  const visibleSuggestions = allSuggestions.filter((p) => !dismissed[p.id]);

  const handleDismiss = (e, id) => {
    e.stopPropagation();
    setDismissed((prev) => ({ ...prev, [id]: true }));
  };

  const handleConnect = (e, id) => {
    e.stopPropagation();
    setConnected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const showToast = (name) => {
    setToast(`You are now connected with ${name}. They are now watching you.`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="max-w-[1128px] mx-auto py-6 px-4 flex gap-6 relative">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-li-card border border-li-border shadow-lg rounded-lg px-4 py-3 text-sm text-li-text max-w-md">
          {toast}
        </div>
      )}
      {/* LEFT SIDEBAR */}
      <aside className="w-72 shrink-0 hidden lg:block">
        <div className="bg-li-card rounded-lg border border-li-border overflow-hidden">
          <div className="px-4 pt-4 pb-2">
            <h2 className="text-base font-semibold text-li-text">Manage my network</h2>
          </div>

          <nav className="pb-2">
            {sidebarLinks.map(({ icon: Icon, label, count }) => (
              <a
                key={label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-li-bg transition-colors no-underline"
              >
                <span className="flex items-center gap-3 text-sm text-li-secondary">
                  <Icon size={18} />
                  <span>{label}</span>
                </span>
                <span className="text-sm text-li-text font-medium">{count}</span>
              </a>
            ))}
          </nav>

          {/* Groups detail */}
          <div className="border-t border-li-border px-4 py-3">
            <p className="text-xs font-semibold text-li-secondary uppercase tracking-wider mb-2">Groups</p>
            {groups.map((g) => (
              <a
                key={g}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="block text-sm text-li-text hover:text-li-blue py-1 no-underline hover:underline"
              >
                {g}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0">
        {/* Invitations section */}
        <div className="bg-li-card rounded-lg border border-li-border mb-4">
          <div className="flex items-center justify-between px-4 py-3 border-b border-li-border">
            <h2 className="text-base font-semibold text-li-text">Invitations (3)</h2>
            <button className="text-sm font-semibold text-li-secondary hover:text-li-text transition-colors">
              Manage
            </button>
          </div>
          <div className="divide-y divide-li-border">
            <InvitationRow
              name="Gerald P. Featherton III"
              headline="Head of Breadcrumb Acquisitions at CooTech Solutions"
              color="#0a66c2"
              time="3 days ago"
              pigeon={getPigeonById('1')}
              onAccept={showToast}
            />
            <InvitationRow
              name="Professor Coo-per"
              headline="Tenured Professor of Urban Foraging at Pigeon University"
              color="#7c3aed"
              time="1 week ago"
              onAccept={showToast}
            />
            <InvitationRow
              name="Chad Thunderwing"
              headline="Fitness Influencer | 200+ flights/day"
              color="#ef4444"
              time="2 weeks ago"
              pigeon={getPigeonById('8')}
              onAccept={showToast}
            />
          </div>
        </div>

        {/* Pigeons you may know */}
        <div className="bg-li-card rounded-lg border border-li-border">
          <div className="px-4 pt-4 pb-3 border-b border-li-border">
            <h2 className="text-base font-semibold text-li-text">Pigeons you may know</h2>
            <p className="text-sm text-li-secondary mt-0.5">Based on your profile and search history</p>
          </div>

          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {visibleSuggestions.map((pigeon, index) => (
              <SuggestionCard
                key={pigeon.id}
                pigeon={pigeon}
                gradient={bannerGradients[index % bannerGradients.length]}
                isConnected={connected[pigeon.id]}
                onDismiss={(e) => handleDismiss(e, pigeon.id)}
                onConnect={(e) => handleConnect(e, pigeon.id)}
              />
            ))}
          </div>

          {visibleSuggestions.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-li-secondary text-sm">You dismissed everyone. Classic pigeon move.</p>
              <button
                onClick={() => setDismissed({})}
                className="mt-3 text-sm text-li-blue font-semibold hover:underline"
              >
                Reset suggestions
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function InvitationRow({ name, headline, color, time, pigeon, onAccept }) {
  const [responded, setResponded] = useState(null);

  const handleAccept = () => {
    setResponded('accepted');
    if (onAccept) onAccept(name);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Avatar name={name} color={color} size="md" premium={pigeon?.premium} verified={pigeon?.verified} showOpenToWork={pigeon?.openToWork} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-li-text truncate">{name}</p>
        <p className="text-xs text-li-secondary truncate">{headline}</p>
        <p className="text-xs text-li-secondary mt-0.5">{time}</p>
      </div>
      {responded === null ? (
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setResponded('ignored')}
            className="px-4 py-1.5 text-sm font-semibold text-li-secondary rounded-full border border-li-border hover:bg-li-bg transition-colors"
          >
            Ignore
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 text-sm font-semibold text-li-blue rounded-full border border-li-blue hover:bg-li-blue-light transition-colors"
          >
            Accept
          </button>
        </div>
      ) : (
        <span className="text-xs text-li-secondary shrink-0">
          {responded === 'accepted' ? 'Connected!' : 'Ignored'}
        </span>
      )}
    </div>
  );
}

function SuggestionCard({ pigeon, gradient, isConnected, onDismiss, onConnect }) {
  return (
    <div className="bg-li-card border border-li-border rounded-lg overflow-hidden relative group hover:shadow-md transition-shadow">
      {/* Dismiss X */}
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
        title="Dismiss"
      >
        <X size={14} className="text-li-secondary" />
      </button>

      {/* Gradient banner */}
      <div
        className="h-16"
        style={{ background: gradient }}
      />

      {/* Avatar overlapping banner */}
      <div className="flex justify-center -mt-8 relative z-[1]">
        <div className="ring-3 ring-white rounded-full">
          <Avatar name={pigeon.name} color={pigeon.color} size="lg" premium={pigeon.premium} verified={pigeon.verified} showOpenToWork={pigeon.openToWork} />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-4 text-center">
        <h3 className="text-sm font-semibold text-li-text truncate">{pigeon.name}</h3>
        <p className="text-xs text-li-secondary mt-0.5 line-clamp-2 leading-relaxed min-h-[2.5em]">
          {pigeon.headline}
        </p>

        {pigeon.mutual && (
          <p className="text-xs text-li-secondary mt-2 flex items-center justify-center gap-1">
            <Users size={12} />
            {pigeon.mutual} mutual connections
          </p>
        )}

        <button
          onClick={onConnect}
          className={`mt-3 w-full py-1.5 text-sm font-semibold rounded-full transition-colors ${
            isConnected
              ? 'bg-li-bg text-li-secondary border border-li-border'
              : 'border border-li-blue text-li-blue hover:bg-li-blue-light hover:border-li-blue-hover'
          }`}
        >
          {isConnected ? 'Pending' : '+ Connect'}
        </button>
      </div>
    </div>
  );
}

export default Network;
