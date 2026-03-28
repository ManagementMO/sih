const EMOJI_MAP = {
  'Gerald P. Featherton III': '🕊️',
  'Pecky McPeckface': '🐦',
  'Sir Reginald Von Coo': '🦅',
  'Henrietta Wingsworth': '🐧',
  'Bartholomew Fluffington': '🐤',
  'Clucksworth B. Feathers': '🦆',
  'Margaret Peckington': '🐔',
  'Chad Thunderwing': '🦜',
  'You (A Pigeon)': '🐦‍⬛',
  'Dave': '🐣',
  'Professor Coo-per': '🦉',
  'Elon Coo-sk': '🦩',
};

const FALLBACK_EMOJIS = ['🐦', '🕊️', '🐤', '🦆', '🐔'];

function hashName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getEmoji(name) {
  if (EMOJI_MAP[name]) return EMOJI_MAP[name];
  return FALLBACK_EMOJIS[hashName(name || 'Pigeon') % FALLBACK_EMOJIS.length];
}

const SIZE_CONFIG = {
  sm: { wh: 32, emoji: 18, badge: 12, badgeIcon: 8 },
  md: { wh: 48, emoji: 28, badge: 16, badgeIcon: 10 },
  lg: { wh: 72, emoji: 40, badge: 20, badgeIcon: 13 },
  xl: { wh: 128, emoji: 72, badge: 28, badgeIcon: 18 },
};

export default function Avatar({
  name,
  color = '#0a66c2',
  size = 'md',
  showOpenToWork = false,
  premium = false,
  verified = false,
}) {
  const config = SIZE_CONFIG[size] || SIZE_CONFIG.md;
  const emoji = getEmoji(name);

  const outerPad = 4;
  const outerSize = config.wh + outerPad * 2;

  return (
    <div
      className="relative shrink-0 select-none"
      style={{ width: outerSize, height: outerSize }}
    >
      {/* Open-to-work green dashed ring */}
      {showOpenToWork && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '3px dashed #057642',
          }}
        />
      )}

      {/* Main circle */}
      <div
        className="rounded-full flex items-center justify-center absolute"
        style={{
          width: config.wh,
          height: config.wh,
          backgroundColor: color,
          top: outerPad,
          left: outerPad,
        }}
      >
        <span
          style={{ fontSize: config.emoji, lineHeight: 1 }}
          role="img"
          aria-label={name || 'pigeon'}
        >
          {emoji}
        </span>
      </div>

      {/* Premium badge */}
      {premium && (
        <div
          className="absolute flex items-center justify-center rounded-full"
          style={{
            width: config.badge,
            height: config.badge,
            backgroundColor: '#E7A33E',
            bottom: 0,
            right: 0,
            border: '2px solid white',
            fontSize: config.badgeIcon,
            lineHeight: 1,
            color: 'white',
          }}
        >
          ⬥
        </div>
      )}

      {/* Verified badge */}
      {verified && (
        <div
          className="absolute flex items-center justify-center rounded-full"
          style={{
            width: config.badge,
            height: config.badge,
            backgroundColor: '#0a66c2',
            bottom: premium ? config.badge * 0.7 : 0,
            right: premium ? config.badge * 0.7 : 0,
            border: '2px solid white',
            fontSize: config.badgeIcon,
            lineHeight: 1,
            color: 'white',
            fontWeight: 700,
          }}
        >
          ✓
        </div>
      )}
    </div>
  );
}
