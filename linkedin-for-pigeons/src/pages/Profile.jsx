import { useParams, Link } from 'react-router-dom';
import { MapPin, Link as LinkIcon, UserPlus, MessageCircle, MoreHorizontal, Briefcase, ChevronDown } from 'lucide-react';
import Avatar from '../components/Avatar';
import { getPigeonById, pigeons, currentUser } from '../data/pigeons';

export default function Profile() {
  const { id } = useParams();
  const pigeon = getPigeonById(id || 'me');

  if (!pigeon) {
    return (
      <div className="max-w-[850px] mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-li-text">Pigeon not found</h1>
        <p className="text-li-secondary mt-2">This pigeon may have flown away.</p>
        <Link to="/" className="text-li-blue font-semibold mt-4 inline-block">Back to feed</Link>
      </div>
    );
  }

  const isMe = id === 'me' || pigeon.id === 'me';
  const color = pigeon.color || '#0a66c2';
  const connectionsLabel = pigeon.connectionsLabel || pigeon.connections?.toLocaleString() || '487';

  // Pick 3 other pigeons for "also viewed"
  const alsoViewed = pigeons.filter(p => p.id !== pigeon.id).slice(0, 3);

  return (
    <div className="max-w-[850px] mx-auto px-4 py-6 space-y-2">
      {/* ─── BANNER + INFO CARD ─── */}
      <div className="bg-li-card rounded-lg border border-li-border shadow-sm overflow-hidden">
        {/* Banner */}
        <div
          className="h-48 relative"
          style={{
            background: pigeon.banner || `linear-gradient(135deg, ${color}cc 0%, ${color}44 100%)`,
          }}
        />

        {/* Avatar overlapping banner */}
        <div className="relative px-6">
          <div className="-mt-16 border-4 border-white rounded-full inline-block">
            <Avatar name={pigeon.name} color={color} size="xl" />
          </div>
        </div>

        {/* Info */}
        <div className="px-6 pt-3 pb-5">
          <h1 className="text-2xl font-bold text-li-text">{pigeon.name}</h1>
          <p className="text-sm text-li-text mt-0.5">{pigeon.headline}</p>

          <div className="flex items-center gap-3 mt-2 text-xs text-li-secondary">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {pigeon.location}
            </span>
            <button className="text-li-blue font-semibold hover:underline flex items-center gap-1">
              <LinkIcon size={14} /> Contact info
            </button>
          </div>

          <div className="flex items-center gap-2 mt-2 text-xs">
            <Link to="#" className="text-li-blue font-semibold hover:underline">
              {connectionsLabel} connections
            </Link>
            {pigeon.mutual && (
              <span className="text-li-secondary">&middot; {pigeon.mutual} mutual</span>
            )}
          </div>

          {/* Open to Coo badge */}
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 border border-li-green/30 rounded-full text-xs font-semibold text-li-green">
              Open to Coo
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mt-4">
            {isMe ? (
              <>
                <button className="px-5 py-1.5 bg-li-blue text-white text-sm font-semibold rounded-full hover:bg-li-blue-hover transition-colors">
                  Open to
                </button>
                <button className="px-5 py-1.5 border border-li-blue text-li-blue text-sm font-semibold rounded-full hover:bg-li-blue-light transition-colors">
                  Add profile section
                </button>
              </>
            ) : (
              <>
                <button className="flex items-center gap-1.5 px-5 py-1.5 bg-li-blue text-white text-sm font-semibold rounded-full hover:bg-li-blue-hover transition-colors">
                  <UserPlus size={16} /> Connect
                </button>
                <button className="flex items-center gap-1.5 px-5 py-1.5 border border-li-blue text-li-blue text-sm font-semibold rounded-full hover:bg-li-blue-light transition-colors">
                  <MessageCircle size={16} /> Message
                </button>
                <button className="p-2 border border-li-secondary rounded-full text-li-secondary hover:bg-gray-100 hover:border-li-text transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      {pigeon.about && (
        <div className="bg-li-card rounded-lg border border-li-border shadow-sm p-6">
          <h2 className="text-lg font-bold text-li-text mb-3">About</h2>
          <p className="text-sm text-li-text leading-relaxed whitespace-pre-wrap">
            {pigeon.about}
          </p>
        </div>
      )}

      {/* ─── EXPERIENCE ─── */}
      {pigeon.experience && pigeon.experience.length > 0 && (
        <div className="bg-li-card rounded-lg border border-li-border shadow-sm p-6">
          <h2 className="text-lg font-bold text-li-text mb-4">Experience</h2>
          <div className="space-y-5">
            {pigeon.experience.map((exp, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: color + '33' }}
                >
                  <Briefcase size={22} style={{ color }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-li-text">{exp.role}</h3>
                  <p className="text-sm text-li-text">{exp.company}</p>
                  <p className="text-xs text-li-secondary">{exp.duration}</p>
                  <p className="text-sm text-li-secondary mt-1.5 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── SKILLS ─── */}
      {pigeon.skills && pigeon.skills.length > 0 && (
        <div className="bg-li-card rounded-lg border border-li-border shadow-sm p-6">
          <h2 className="text-lg font-bold text-li-text mb-4">Skills</h2>
          <div className="space-y-4">
            {pigeon.skills.map((skill, i) => {
              const endorsements = getEndorsementCount(skill);
              const barPct = Math.min(100, (endorsements / 89) * 100);
              return (
                <div key={i}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-semibold text-li-text">{skill}</h3>
                    <span className="text-xs text-li-secondary">
                      Endorsed by {endorsements} pigeons
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
                    <div
                      className="h-1.5 rounded-full bg-li-blue transition-all"
                      style={{ width: `${barPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <button className="flex items-center gap-1 mt-4 text-sm text-li-secondary font-semibold hover:text-li-text">
            Show all skills <ChevronDown size={16} />
          </button>
        </div>
      )}

      {/* ─── PIGEONS ALSO VIEWED ─── */}
      <div className="bg-li-card rounded-lg border border-li-border shadow-sm p-6">
        <h2 className="text-lg font-bold text-li-text mb-4">Pigeons also viewed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {alsoViewed.map((p) => (
            <div key={p.id} className="border border-li-border rounded-lg overflow-hidden">
              <div
                className="h-16"
                style={{ background: `linear-gradient(135deg, ${p.color}cc 0%, ${p.color}44 100%)` }}
              />
              <div className="flex flex-col items-center -mt-6 pb-4 px-3">
                <Link to={`/profile/${p.id}`} className="border-2 border-white rounded-full">
                  <Avatar name={p.name} color={p.color} size="lg" />
                </Link>
                <Link
                  to={`/profile/${p.id}`}
                  className="text-sm font-semibold text-li-text text-center mt-2 hover:underline hover:text-li-blue"
                >
                  {p.name}
                </Link>
                <p className="text-xs text-li-secondary text-center mt-0.5 leading-tight line-clamp-2">
                  {p.headline.split('|')[0].trim()}
                </p>
                {p.mutual && (
                  <p className="text-xs text-li-secondary mt-1">{p.mutual} mutual connections</p>
                )}
                <button className="mt-2.5 flex items-center gap-1 px-4 py-1 border border-li-secondary rounded-full text-xs font-semibold text-li-secondary hover:bg-gray-50 hover:border-li-text hover:text-li-text transition-colors">
                  <UserPlus size={14} /> Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Deterministic pseudo-random endorsement count from skill name */
function getEndorsementCount(skill) {
  let hash = 0;
  for (let i = 0; i < skill.length; i++) {
    hash = ((hash << 5) - hash + skill.charCodeAt(i)) | 0;
  }
  return 5 + (Math.abs(hash) % 85); // range 5-89
}
