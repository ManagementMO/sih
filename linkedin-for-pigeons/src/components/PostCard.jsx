import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageCircle, Repeat2, Send, Globe, MoreHorizontal } from 'lucide-react';
import Avatar from './Avatar';

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);

  const likeCount = liked ? post.likes + 1 : post.likes;

  return (
    <div className="bg-li-card rounded-lg border border-li-border shadow-sm">
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
        <ActionButton
          icon={<ThumbsUp size={20} />}
          label="Like"
          active={liked}
          onClick={() => setLiked(!liked)}
        />
        <ActionButton
          icon={<MessageCircle size={20} />}
          label="Comment"
          onClick={() => setShowComments(!showComments)}
        />
        <ActionButton icon={<Repeat2 size={20} />} label="Repost" />
        <ActionButton icon={<Send size={20} />} label="Send" />
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
