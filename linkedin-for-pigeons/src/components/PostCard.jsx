import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageCircle, Repeat2, Send, Globe, MoreHorizontal, Info } from 'lucide-react';
import Avatar from './Avatar';

const REACTIONS = [
  { emoji: '👍', label: 'Like' },
  { emoji: '🐦', label: 'Coo' },
  { emoji: '🥖', label: 'Breadcrumb' },
  { emoji: '💩', label: 'Statue' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '😂', label: 'LOL' },
];

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [reaction, setReaction] = useState(null);

  const hoverTimerRef = useRef(null);
  const leaveTimerRef = useRef(null);

  const likeCount = liked ? post.likes + 1 : post.likes;

  const handleLikeAreaEnter = useCallback(() => {
    clearTimeout(leaveTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setShowReactions(true);
    }, 500);
  }, []);

  const handleLikeAreaLeave = useCallback(() => {
    clearTimeout(hoverTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setShowReactions(false);
    }, 300);
  }, []);

  const handlePickerEnter = useCallback(() => {
    clearTimeout(leaveTimerRef.current);
    clearTimeout(hoverTimerRef.current);
  }, []);

  const handlePickerLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => {
      setShowReactions(false);
    }, 300);
  }, []);

  const handleReactionClick = (r) => {
    setReaction(r);
    setLiked(true);
    setShowReactions(false);
  };

  const handleLikeClick = () => {
    if (liked) {
      setLiked(false);
      setReaction(null);
    } else {
      setLiked(true);
      if (!reaction) setReaction(REACTIONS[0]);
    }
  };

  return (
    <div className="bg-li-card rounded-lg border border-li-border shadow-sm">
      {/* Promoted label */}
      {post.sponsored && (
        <div className="flex items-center gap-1 px-4 pt-2 text-xs text-li-secondary">
          <span>Promoted</span>
          <Info size={12} className="text-li-secondary" />
        </div>
      )}

      {/* Author row */}
      <div className="flex items-start gap-2 p-4 pb-0">
        <Link to={`/profile/${post.authorId}`}>
          <Avatar name={post.authorName} color={post.authorColor} size="md" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <Link
                to={`/profile/${post.authorId}`}
                className="font-semibold text-sm text-li-text hover:underline hover:text-li-blue"
              >
                {post.authorName}
              </Link>
              <p className="text-xs text-li-secondary leading-tight truncate">
                {post.authorHeadline}
              </p>
              <p className="text-xs text-li-secondary flex items-center gap-1">
                {post.timeAgo} &middot; <Globe size={12} />
              </p>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 text-li-secondary">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Post content */}
      <div className="px-4 pt-3 pb-2 text-sm text-li-text whitespace-pre-wrap leading-relaxed">
        {post.content}
      </div>

      {/* Reaction summary bar */}
      <div className="flex items-center justify-between px-4 py-1.5 text-xs text-li-secondary">
        <div className="flex items-center gap-1">
          <span className="flex -space-x-0.5">
            {post.reactions.map((r, i) => (
              <span key={i} className="text-base">{r}</span>
            ))}
          </span>
          <span className="ml-1">{likeCount.toLocaleString()}</span>
        </div>
        <div className="flex gap-3">
          <span>{post.comments.toLocaleString()} comments</span>
          <span>{post.reposts.toLocaleString()} reposts</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-li-border" />

      {/* Action buttons */}
      <div className="flex items-center justify-around px-2 py-1">
        {/* Like button with reaction picker */}
        <div
          className="relative"
          onMouseEnter={handleLikeAreaEnter}
          onMouseLeave={handleLikeAreaLeave}
        >
          {/* Reaction picker popup */}
          {showReactions && (
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-full px-2 py-1 shadow-lg border border-gray-200 flex items-center gap-1 z-50"
              onMouseEnter={handlePickerEnter}
              onMouseLeave={handlePickerLeave}
            >
              {REACTIONS.map((r) => (
                <button
                  key={r.label}
                  onClick={() => handleReactionClick(r)}
                  className="relative group transition-transform duration-150 hover:scale-125 cursor-pointer"
                  style={{ fontSize: 28, lineHeight: 1, padding: '2px' }}
                  title={r.label}
                >
                  <span className="block hover:text-[36px] transition-all duration-150">
                    {r.emoji}
                  </span>
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {r.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          <ActionButton
            icon={
              reaction ? (
                <span style={{ fontSize: 20, lineHeight: 1 }}>{reaction.emoji}</span>
              ) : (
                <ThumbsUp size={20} />
              )
            }
            label={reaction ? reaction.label : 'Like'}
            active={liked}
            onClick={handleLikeClick}
          />
        </div>

        <ActionButton
          icon={<MessageCircle size={20} />}
          label="Coo"
          onClick={() => setShowComments(!showComments)}
        />
        <ActionButton icon={<Repeat2 size={20} />} label="Re-coo" />
        <ActionButton icon={<Send size={20} />} label="Air Drop" />
      </div>

      {/* Comments section */}
      {!showComments && post.commentsList && post.commentsList.length > 0 && (
        <div className="px-4 pb-3">
          <button
            onClick={() => setShowComments(true)}
            className="text-xs font-semibold text-li-secondary hover:text-li-text hover:underline"
          >
            Load {post.commentsList.length} comments
          </button>
        </div>
      )}

      {showComments && post.commentsList && (
        <div className="px-4 pb-3 space-y-3">
          <div className="border-t border-li-border" />
          {post.commentsList.map((comment, i) => (
            <div key={i} className="flex gap-2">
              <Avatar name={comment.authorName} color={comment.authorColor} size="sm" />
              <div className="flex-1 bg-gray-50 rounded-lg p-2.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-li-text">
                    {comment.authorName}
                  </span>
                  <span className="text-xs text-li-secondary">{comment.timeAgo}</span>
                </div>
                <p className="text-xs text-li-text mt-0.5 leading-relaxed">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ActionButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2.5 rounded-sm text-xs font-semibold transition-colors hover:bg-gray-100 ${
        active ? 'text-li-blue' : 'text-li-secondary'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
