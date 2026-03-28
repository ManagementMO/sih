import { useState } from 'react';
import { MoreHorizontal, Award, Eye, TrendingUp, Search as SearchIcon, UserPlus, ThumbsUp, Briefcase, MessageCircle, PartyPopper } from 'lucide-react';
import Avatar from '../components/Avatar';
import { notifications } from '../data/notifications';

const typeIcons = {
  endorsement: Award,
  view: Eye,
  trending: TrendingUp,
  search: SearchIcon,
  connection: UserPlus,
  like: ThumbsUp,
  job: Briefcase,
  comment: MessageCircle,
  anniversary: PartyPopper,
};

function groupNotifications(items) {
  const today = [];
  const thisWeek = [];

  items.forEach((n) => {
    // "m ago" or "h ago" = Today; "d ago" = This Week
    if (n.time.includes('m ago') || n.time.includes('h ago')) {
      today.push(n);
    } else {
      thisWeek.push(n);
    }
  });

  return { today, thisWeek };
}

function renderText(notification) {
  // Actor name is bold, then the rest. The text field may contain <strong> tags.
  const parts = [];
  if (notification.actor) {
    parts.push(
      <span key="actor" className="font-semibold text-li-text">{notification.actor}</span>
    );
    parts.push(' ');
  }
  // Parse <strong>...</strong> in text
  const textParts = notification.text.split(/(<strong>.*?<\/strong>)/g);
  textParts.forEach((part, i) => {
    const strongMatch = part.match(/^<strong>(.*?)<\/strong>$/);
    if (strongMatch) {
      parts.push(<span key={`s-${i}`} className="font-semibold">{strongMatch[1]}</span>);
    } else {
      parts.push(<span key={`t-${i}`}>{part}</span>);
    }
  });

  return parts;
}

function NotificationRow({ notification, hoveredId, setHoveredId }) {
  const Icon = typeIcons[notification.type] || Award;
  const hasActor = !!notification.actor;

  return (
    <div
      className={`relative flex items-start gap-3 px-4 py-3 border-b border-li-border/60 transition-colors cursor-pointer ${
        !notification.read ? 'bg-li-blue-light' : 'bg-white'
      } hover:bg-[#f3f3f3]`}
      onMouseEnter={() => setHoveredId(notification.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      {/* Unread dot */}
      {!notification.read && (
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-li-blue rounded-full" />
      )}

      {/* Avatar / Icon */}
      <div className="shrink-0 mt-0.5">
        {hasActor ? (
          <Avatar name={notification.actor} color={notification.actorColor} size="sm" />
        ) : (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: notification.actorColor + '1a' }}
          >
            <Icon size={18} style={{ color: notification.actorColor }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] text-li-text leading-snug">
          {renderText(notification)}
        </p>
      </div>

      {/* Time + Menu */}
      <div className="flex items-center gap-2 shrink-0 mt-0.5">
        <span className="text-[12px] text-li-secondary whitespace-nowrap">{notification.time}</span>
        <button
          className={`p-1 rounded-full hover:bg-gray-200 text-li-secondary transition-all ${
            hoveredId === notification.id ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}

function Notifications() {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = activeTab === 'all'
    ? notifications
    : notifications.filter(n => n.type === 'like' || n.type === 'comment');

  const { today, thisWeek } = groupNotifications(filtered);

  return (
    <div className="max-w-[850px] mx-auto py-4">
      <div className="bg-li-card rounded-lg border border-li-border overflow-hidden">
        {/* Tab Header */}
        <div className="flex items-center border-b border-li-border px-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`relative px-4 py-3 text-[14px] font-semibold transition-colors border-none bg-transparent ${
              activeTab === 'all'
                ? 'text-li-green'
                : 'text-li-secondary hover:text-li-text'
            }`}
          >
            All
            {activeTab === 'all' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-li-green" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`relative px-4 py-3 text-[14px] font-semibold transition-colors border-none bg-transparent ${
              activeTab === 'posts'
                ? 'text-li-green'
                : 'text-li-secondary hover:text-li-text'
            }`}
          >
            My Posts
            {activeTab === 'posts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-li-green" />
            )}
          </button>
        </div>

        {/* Notification Groups */}
        {today.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-[#f9f9f9] border-b border-li-border/60">
              <span className="text-[13px] font-semibold text-li-text">Today</span>
            </div>
            {today.map((n) => (
              <NotificationRow
                key={n.id}
                notification={n}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            ))}
          </div>
        )}

        {thisWeek.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-[#f9f9f9] border-b border-li-border/60">
              <span className="text-[13px] font-semibold text-li-text">This Week</span>
            </div>
            {thisWeek.map((n) => (
              <NotificationRow
                key={n.id}
                notification={n}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-li-secondary">
            <p className="text-[48px] mb-2">🔔</p>
            <p className="text-[16px]">No notifications yet. Keep cooing!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
