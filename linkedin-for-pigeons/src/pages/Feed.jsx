import { Link } from 'react-router-dom';
import { Bookmark, ChevronDown, Plus } from 'lucide-react';
import Avatar from '../components/Avatar';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import { currentUser, pigeons } from '../data/pigeons';
import { posts } from '../data/posts';

export default function Feed() {
  const suggestedPigeons = pigeons.slice(0, 3);

  return (
    <div className="py-6">
      <div className="flex gap-6 justify-center">
        {/* ─── LEFT SIDEBAR ─── */}
        <aside className="w-56 shrink-0 hidden lg:block">
          <LeftSidebar />
        </aside>

        {/* ─── MAIN FEED ─── */}
        <main className="flex-1 max-w-[555px] space-y-2">
          <div className="bg-li-card rounded-lg border border-li-border shadow-sm p-4 flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-li-text">Your profile is being viewed by 47 pigeons</p>
              <p className="text-xs text-li-secondary">Complete your profile to get 2x more breadcrumb opportunities</p>
            </div>
            <button className="px-3 py-1.5 bg-li-blue text-white text-xs font-semibold rounded-full hover:bg-li-blue-hover">Complete Profile</button>
          </div>
          <CreatePost />
          <div className="border-t border-li-border my-1" />
          <div className="space-y-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </main>

        {/* ─── RIGHT SIDEBAR ─── */}
        <aside className="w-72 shrink-0 hidden lg:block space-y-2">
          <NewsCard />
          <LearningCard />
          <WhoToFollow pigeons={suggestedPigeons} />
          <div className="text-center text-xs text-li-secondary pt-4 space-y-1">
            <p className="font-semibold">PigeonIn Corporation © 2026</p>
            <p>About · Privacy Policy (We watch everything) · Terms of Perching · Accessibility (All ledges welcome)</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LEFT SIDEBAR
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LeftSidebar() {
  return (
    <div className="space-y-2">
      {/* Profile mini card */}
      <div className="bg-li-card rounded-lg border border-li-border shadow-sm overflow-hidden">
        {/* Banner */}
        <div
          className="h-14 relative"
          style={{ background: currentUser.banner }}
        />
        {/* Avatar overlapping */}
        <div className="flex justify-center -mt-7">
          <Link to="/profile/me" className="border-2 border-white rounded-full">
            <Avatar name={currentUser.name} color="#0a66c2" size="lg" showOpenToWork={currentUser.openToWork} />
          </Link>
        </div>
        <div className="text-center px-3 pt-2 pb-3">
          <Link to="/profile/me" className="font-semibold text-sm text-li-text hover:underline">
            {currentUser.name}
          </Link>
          <p className="text-xs text-li-secondary mt-0.5 leading-tight">
            {currentUser.headline}
          </p>
        </div>

        <div className="border-t border-li-border" />

        {/* Stats */}
        <div className="px-3 py-2 space-y-1.5">
          <Link to="/profile/me" className="flex justify-between text-xs hover:bg-gray-50 -mx-3 px-3 py-1 rounded">
            <span className="text-li-secondary">Who cooed at your profile</span>
            <span className="font-semibold text-li-blue">47</span>
          </Link>
          <Link to="/profile/me" className="flex justify-between text-xs hover:bg-gray-50 -mx-3 px-3 py-1 rounded">
            <span className="text-li-secondary">Impressions of your post</span>
            <span className="font-semibold text-li-blue">2,341</span>
          </Link>
        </div>

        <div className="border-t border-li-border" />

        {/* Saved items */}
        <Link to="#" className="flex items-center gap-2 px-3 py-2.5 text-xs text-li-secondary hover:bg-gray-50">
          <Bookmark size={14} />
          <span className="font-semibold">My items</span>
        </Link>
      </div>

      {/* My Flocks */}
      <div className="bg-li-card rounded-lg border border-li-border shadow-sm p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-li-secondary">My Flocks</span>
          <Plus size={14} className="text-li-secondary" />
        </div>
        <ul className="space-y-1.5">
          {[
            'Toronto Pigeon Networking',
            'Breadcrumb Investors Club',
            'Statue QA Professionals',
            'Pigeons in Tech',
            'Anti-Seagull Alliance',
          ].map((name) => (
            <li key={name}>
              <Link to="#" className="text-xs text-li-blue font-semibold hover:underline">
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <button className="flex items-center gap-1 mt-2 text-xs text-li-secondary hover:text-li-text">
          Show more <ChevronDown size={12} />
        </button>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   RIGHT SIDEBAR – NEWS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function NewsCard() {
  const stories = [
    { title: 'Toronto breadcrumb shortage reaches crisis levels', readers: '4,287 readers' },
    { title: 'Pigeon wins staring contest with toddler at park', readers: '3,102 readers' },
    { title: 'New study: Pigeons 47% smarter than geese', readers: '8,451 readers' },
    { title: 'Local pigeon refuses to move for TTC bus', readers: '12,009 readers' },
    { title: 'Startup raises 10M breadcrumbs in Series Coo', readers: '6,734 readers' },
  ];

  return (
    <div className="bg-li-card rounded-lg border border-li-border shadow-sm p-3">
      <h3 className="font-semibold text-sm text-li-text mb-2">PigeonIn News</h3>
      <ul className="space-y-3">
        {stories.map((story, i) => (
          <li key={i}>
            <Link to="#" className="text-xs font-semibold text-li-text hover:text-li-blue hover:underline leading-tight block">
              {story.title}
            </Link>
            <span className="text-xs text-li-secondary">{story.readers}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   RIGHT SIDEBAR – PIGEON LEARNING
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LearningCard() {
  const courses = [
    { title: 'Breadcrumb Acquisition 101', rating: '4.8', enrolled: '12,847' },
    { title: 'Advanced Statue Techniques', rating: '4.6', enrolled: '3,201' },
    { title: 'Cooing for Executives', rating: '4.9', enrolled: '8,445' },
    { title: 'Python for Pigeons (NOT the predator)', rating: '4.7', enrolled: '5,672' },
  ];
  return (
    <div className="bg-li-card rounded-lg border border-li-border shadow-sm p-3">
      <h3 className="font-semibold text-sm text-li-text mb-2">PigeonIn Learning</h3>
      <ul className="space-y-2.5">
        {courses.map((c, i) => (
          <li key={i}>
            <a href="#" className="text-xs font-semibold text-li-text hover:text-li-blue hover:underline block">{c.title}</a>
            <span className="text-xs text-li-secondary">⭐ {c.rating} · {c.enrolled} enrolled</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   RIGHT SIDEBAR – WHO TO FOLLOW
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function WhoToFollow({ pigeons }) {
  return (
    <div className="bg-li-card rounded-lg border border-li-border shadow-sm p-3">
      <h3 className="font-semibold text-sm text-li-text mb-3">Who to Follow</h3>
      <div className="space-y-3">
        {pigeons.map((pigeon) => (
          <div key={pigeon.id} className="flex items-start gap-2">
            <Link to={`/profile/${pigeon.id}`}>
              <Avatar name={pigeon.name} color={pigeon.color} size="md" premium={pigeon.premium} verified={pigeon.verified} />
            </Link>
            <div className="flex-1 min-w-0">
              <Link to={`/profile/${pigeon.id}`} className="text-xs font-semibold text-li-text hover:underline hover:text-li-blue block truncate">
                {pigeon.name}
              </Link>
              <p className="text-xs text-li-secondary leading-tight truncate">
                {pigeon.headline.split('|')[0].trim()}
              </p>
              <button className="mt-1.5 flex items-center gap-1 px-3 py-1 border border-li-secondary rounded-full text-xs font-semibold text-li-secondary hover:bg-gray-50 hover:border-li-text hover:text-li-text transition-colors">
                <Plus size={14} /> Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
