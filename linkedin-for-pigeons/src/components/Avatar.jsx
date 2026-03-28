export default function Avatar({ name, color = '#0a66c2', size = 'md' }) {
  const sizeMap = {
    sm: { wh: 32, text: 'text-xs' },
    md: { wh: 48, text: 'text-base' },
    lg: { wh: 72, text: 'text-2xl' },
    xl: { wh: 128, text: 'text-4xl' },
  };

  const { wh, text } = sizeMap[size] || sizeMap.md;

  const parts = (name || '').split(' ').filter(Boolean);
  const initials = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : (parts[0] || 'P')[0];

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white shrink-0 select-none`}
      style={{
        width: wh,
        height: wh,
        backgroundColor: color,
        fontSize: undefined,
      }}
    >
      <span className={text}>{initials.toUpperCase()}</span>
    </div>
  );
}
