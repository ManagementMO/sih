import { Image, CalendarDays, FileText } from 'lucide-react';
import Avatar from './Avatar';
import { currentUser } from '../data/pigeons';

export default function CreatePost() {
  return (
    <div className="bg-li-card rounded-lg border border-li-border shadow-sm p-4">
      {/* Top row: avatar + input */}
      <div className="flex items-center gap-3">
        <Avatar name={currentUser.name} color="#0a66c2" size="md" />
        <button className="flex-1 text-left border border-li-border rounded-full px-4 py-2.5 text-sm text-li-secondary hover:bg-gray-100 transition-colors">
          Start a post
        </button>
      </div>

      {/* Action row */}
      <div className="flex items-center justify-around mt-3 -mx-1">
        <PostAction icon={<Image size={20} />} label="Photo" color="text-blue-500" />
        <PostAction icon={<CalendarDays size={20} />} label="Event" color="text-amber-600" />
        <PostAction icon={<FileText size={20} />} label="Write article" color="text-orange-500" />
      </div>
    </div>
  );
}

function PostAction({ icon, label, color }) {
  return (
    <button className={`flex items-center gap-2 px-3 py-2 rounded-sm text-xs font-semibold text-li-secondary hover:bg-gray-100 transition-colors`}>
      <span className={color}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
