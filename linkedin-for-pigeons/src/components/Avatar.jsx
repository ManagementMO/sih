import PigeonSVG from './PigeonSVG';

const SIZE_CONFIG = {
  sm: { wh: 32, badge: 12, badgeIcon: 8 },
  md: { wh: 48, badge: 16, badgeIcon: 10 },
  lg: { wh: 72, badge: 20, badgeIcon: 13 },
  xl: { wh: 128, badge: 28, badgeIcon: 18 },
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
  const outerPad = 4;
  const outerSize = config.wh + outerPad * 2;

  return (
    <div
      className="relative shrink-0 select-none animate-pigeon-bob"
      style={{ width: outerSize, height: outerSize }}
    >
      {/* Open-to-work green dashed ring */}
      {showOpenToWork && (
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: '3px dashed #057642' }}
        />
      )}

      {/* Main circle with SVG pigeon */}
      <div
        className="rounded-full overflow-hidden absolute"
        style={{
          width: config.wh,
          height: config.wh,
          backgroundColor: color + '22',
          top: outerPad,
          left: outerPad,
        }}
      >
        <PigeonSVG name={name} color={color} />
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
