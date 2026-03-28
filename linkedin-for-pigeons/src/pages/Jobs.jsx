import { useState } from 'react';
import {
  Search,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Users,
  Sparkles,
  Bell,
  BellOff,
  SlidersHorizontal,
  X,
  Briefcase,
  Building2,
  BadgeCheck,
} from 'lucide-react';
import { jobs } from '../data/jobs';

function Jobs() {
  const [expandedJob, setExpandedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState({});
  const [alertOn, setAlertOn] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const toggleExpand = (id) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSavedJobs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(searchTitle.toLowerCase());
    const locMatch = job.location.toLowerCase().includes(searchLocation.toLowerCase());
    return titleMatch && locMatch;
  });

  return (
    <div className="max-w-[1128px] mx-auto py-6 px-4 flex gap-6">
      {/* LEFT SIDEBAR */}
      <aside className="w-72 shrink-0 hidden lg:block">
        {/* Search Filters Card */}
        <div className="bg-li-card rounded-lg border border-li-border overflow-hidden">
          {/* Search inputs */}
          <div className="p-4 border-b border-li-border">
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-li-secondary" />
              <input
                type="text"
                placeholder="Search by title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-li-border rounded bg-li-bg text-li-text placeholder:text-li-secondary focus:outline-none focus:border-li-blue"
              />
            </div>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-li-secondary" />
              <input
                type="text"
                placeholder="City, province, or remote"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-li-border rounded bg-li-bg text-li-text placeholder:text-li-secondary focus:outline-none focus:border-li-blue"
              />
            </div>
          </div>

          {/* Job Alert Toggle */}
          <div className="p-4 border-b border-li-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {alertOn ? (
                  <Bell size={16} className="text-li-blue" />
                ) : (
                  <BellOff size={16} className="text-li-secondary" />
                )}
                <div>
                  <p className="text-sm font-semibold text-li-text">Job alert</p>
                  <p className="text-xs text-li-secondary">Breadcrumb Analyst</p>
                </div>
              </div>
              <button
                onClick={() => setAlertOn(!alertOn)}
                className={`w-10 h-6 rounded-full relative transition-colors ${
                  alertOn ? 'bg-li-blue' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    alertOn ? 'left-[18px]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="p-4 space-y-1">
            <FilterDropdown icon={<Briefcase size={16} />} label="Salary" options={['0-300 breadcrumbs', '300-700 breadcrumbs', '700-1000 breadcrumbs', '1000+ breadcrumbs']} />
            <FilterDropdown icon={<Clock size={16} />} label="Date posted" options={['Past 24 hours', 'Past week', 'Past month', 'Any time']} />
            <FilterDropdown icon={<BadgeCheck size={16} />} label="Experience level" options={['Hatchling (Intern)', 'Junior Pigeon', 'Mid-Level Pigeon', 'Senior Pigeon', 'Chief Pigeon Officer']} />
            <FilterDropdown icon={<Building2 size={16} />} label="Company" options={['CooTech Solutions', 'MonuMess Inc.', 'WalkBlock Corp', 'StareDown Holdings', 'Rooftop Technologies', 'CrumbMetrics', 'PigeonIn']} />
          </div>
        </div>

        {/* Recommended for you */}
        <div className="bg-li-card rounded-lg border border-li-border mt-3 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-li-blue" />
            <h3 className="text-sm font-semibold text-li-text">Recommended for you</h3>
          </div>
          <p className="text-xs text-li-secondary leading-relaxed">
            Based on your profile: <span className="font-medium text-li-text">Pigeon who stands on things</span>
          </p>
          <p className="text-xs text-li-secondary mt-2 leading-relaxed">
            We found <span className="font-semibold text-li-green">{jobs.length} jobs</span> matching your interests in standing, staring, and breadcrumb acquisition.
          </p>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT */}
      <main className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-li-text">
            Jobs based on your preferences
          </h1>
          <span className="text-sm text-li-secondary">{filteredJobs.length} results</span>
        </div>

        <div className="space-y-2">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              expanded={expandedJob === job.id}
              saved={savedJobs[job.id]}
              onToggle={() => toggleExpand(job.id)}
              onSave={(e) => toggleSave(e, job.id)}
            />
          ))}

          {filteredJobs.length === 0 && (
            <div className="bg-li-card rounded-lg border border-li-border p-12 text-center">
              <p className="text-li-secondary text-sm">No jobs found. Try adjusting your search, or just go eat crumbs off the sidewalk.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function FilterDropdown({ icon, label, options }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-li-text hover:bg-li-bg rounded transition-colors"
      >
        <span className="flex items-center gap-2 text-li-secondary">
          {icon}
          <span className={selected ? 'text-li-text font-medium' : ''}>{selected || label}</span>
        </span>
        {open ? <ChevronUp size={16} className="text-li-secondary" /> : <ChevronDown size={16} className="text-li-secondary" />}
      </button>
      {open && (
        <div className="bg-li-card border border-li-border rounded-lg shadow-lg mt-1 py-1 z-20 relative">
          {selected && (
            <button
              onClick={() => { setSelected(null); setOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-li-red hover:bg-li-bg flex items-center gap-2"
            >
              <X size={14} /> Clear
            </button>
          )}
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { setSelected(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-li-bg transition-colors ${
                selected === opt ? 'text-li-blue font-medium bg-li-blue-light' : 'text-li-text'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function JobCard({ job, expanded, saved, onToggle, onSave }) {
  return (
    <div
      className={`bg-li-card rounded-lg border transition-all ${
        expanded ? 'border-li-blue shadow-md' : 'border-li-border hover:shadow-sm'
      }`}
    >
      {/* Main card content - clickable */}
      <div
        className="p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex gap-3">
          {/* Company logo circle */}
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ backgroundColor: job.companyColor }}
          >
            {job.company[0]}
          </div>

          {/* Job info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-li-blue hover:underline leading-tight">
                  {job.title}
                </h3>
                <p className="text-sm text-li-text mt-0.5">{job.company}</p>
                <p className="text-sm text-li-secondary mt-0.5 flex items-center gap-1">
                  <MapPin size={13} className="shrink-0" />
                  {job.location}
                  <span className="mx-1">-</span>
                  <span className="text-xs">({job.type})</span>
                </p>
              </div>

              {/* Save button - top right */}
              <button
                onClick={onSave}
                className="p-1.5 hover:bg-li-bg rounded-full transition-colors shrink-0"
                title={saved ? 'Unsave' : 'Save'}
              >
                {saved ? (
                  <BookmarkCheck size={20} className="text-li-blue" />
                ) : (
                  <Bookmark size={20} className="text-li-secondary" />
                )}
              </button>
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="text-xs text-li-secondary flex items-center gap-1">
                <Clock size={12} />
                {job.posted}
              </span>
              <span className="text-xs text-li-secondary flex items-center gap-1">
                <Users size={12} />
                {job.applicants} applicants
              </span>
              {job.salary && (
                <span className="text-xs text-li-secondary">
                  {job.salary}
                </span>
              )}
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-2">
              {job.promoted && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-li-green border border-green-200">
                  <Sparkles size={11} />
                  Promoted
                </span>
              )}
              {job.easyApply && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-li-blue-light text-li-blue">
                  <span className="w-3.5 h-3.5 rounded-sm bg-li-blue text-white flex items-center justify-center text-[8px] font-bold">P</span>
                  Easy Apply
                </span>
              )}
            </div>

            {/* Description preview */}
            {!expanded && (
              <p className="text-sm text-li-secondary mt-2 line-clamp-2 leading-relaxed">
                {job.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Expanded detail section */}
      {expanded && (
        <div className="border-t border-li-border px-4 pt-4 pb-5">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-li-text mb-2">About this role</h4>
            <p className="text-sm text-li-secondary leading-relaxed">{job.description}</p>
          </div>

          <div className="mb-5">
            <h4 className="text-sm font-semibold text-li-text mb-2">Requirements</h4>
            <ul className="space-y-1.5">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-li-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-li-blue mt-1.5 shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="px-6 py-1.5 bg-li-blue text-white text-sm font-semibold rounded-full hover:bg-li-blue-hover transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                alert(`You applied to "${job.title}" at ${job.company}!\n\nJust kidding. You're a pigeon. Go peck at something.`);
              }}
            >
              {job.easyApply ? 'Easy Apply' : 'Apply'}
            </button>
            <button
              onClick={onSave}
              className="px-6 py-1.5 text-sm font-semibold rounded-full border border-li-blue text-li-blue hover:bg-li-blue-light transition-colors"
            >
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;
