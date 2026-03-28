/**
 * Hand-crafted SVG pigeon illustrations for each character.
 * Each pigeon has unique plumage colors, accessories, and personality.
 */

// Base pigeon body path - round, cute pigeon silhouette
function BasePigeon({ body, wing, belly, beak, eye, feet, children }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="50" cy="92" rx="22" ry="5" fill="#00000015" />

      {/* Tail feathers */}
      <path d="M28 62 L12 58 L16 65 L10 68 L20 70 L28 68Z" fill={wing} />

      {/* Body */}
      <ellipse cx="50" cy="60" rx="26" ry="28" fill={body} />

      {/* Wing */}
      <ellipse cx="38" cy="58" rx="16" ry="20" fill={wing} transform="rotate(-10, 38, 58)" />
      <path d="M26 50 Q22 60 24 72 Q30 68 35 62Z" fill={wing} opacity="0.6" />

      {/* Belly */}
      <ellipse cx="54" cy="68" rx="16" ry="16" fill={belly} />

      {/* Head */}
      <circle cx="62" cy="32" r="18" fill={body} />

      {/* Iridescent neck patch */}
      <ellipse cx="56" cy="44" rx="10" ry="8" fill={wing} opacity="0.7" />

      {/* Eye - white sclera */}
      <circle cx="67" cy="28" r="6" fill="white" />
      {/* Eye - iris */}
      <circle cx="68" cy="28" r="4" fill={eye} />
      {/* Eye - pupil */}
      <circle cx="69" cy="27.5" r="2.2" fill="#1a1a1a" />
      {/* Eye - highlight */}
      <circle cx="70" cy="26.5" r="1" fill="white" />

      {/* Beak */}
      <path d="M78 32 L88 35 L78 38Z" fill={beak} />
      <line x1="78" y1="35" x2="87" y2="35" stroke={body} strokeWidth="0.5" />

      {/* Feet */}
      <g fill={feet}>
        <path d="M42 86 L38 94 M42 86 L42 95 M42 86 L46 94" stroke={feet} strokeWidth="2" strokeLinecap="round" />
        <path d="M56 86 L52 94 M56 86 L56 95 M56 86 L60 94" stroke={feet} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Accessories/extras rendered on top */}
      {children}
    </svg>
  );
}

// ─── Individual pigeon designs ───

function GeraldPigeon() {
  // Distinguished corporate pigeon with tiny tie and slicked feathers
  return (
    <BasePigeon body="#7B8794" wing="#5C6670" belly="#D4D8DC" beak="#E8A735" eye="#4A6741" feet="#C4645C">
      {/* Tiny necktie */}
      <path d="M56 48 L52 56 L56 54 L60 56Z" fill="#0a66c2" />
      <rect x="54" y="46" width="4" height="4" rx="1" fill="#0a66c2" />
      {/* Monocle */}
      <circle cx="67" cy="28" r="7.5" fill="none" stroke="#C4A44A" strokeWidth="1.5" />
      <line x1="74" y1="28" x2="80" y2="38" stroke="#C4A44A" strokeWidth="1" />
      {/* Slicked-back head feathers */}
      <path d="M52 18 Q58 10 70 16" fill="none" stroke="#5C6670" strokeWidth="2" />
    </BasePigeon>
  );
}

function PeckyPigeon() {
  // QA inspector pigeon with tiny hard hat and clipboard
  return (
    <BasePigeon body="#6B7B6B" wing="#4D5C4D" belly="#C8D4C0" beak="#D4943A" eye="#3D2B1F" feet="#C4645C">
      {/* Hard hat */}
      <ellipse cx="62" cy="17" rx="16" ry="5" fill="#F5C518" />
      <path d="M48 17 Q48 10 62 8 Q76 10 76 17" fill="#F5C518" />
      <rect x="47" y="16" width="30" height="3" rx="1" fill="#E0B000" />
      {/* Tiny clipboard */}
      <rect x="18" y="50" width="10" height="13" rx="1.5" fill="#8B7355" />
      <rect x="20" y="53" width="6" height="1.5" rx="0.5" fill="white" />
      <rect x="20" y="56" width="6" height="1.5" rx="0.5" fill="white" />
      <rect x="20" y="59" width="4" height="1.5" rx="0.5" fill="white" />
      <rect x="20" y="49" width="6" height="2.5" rx="0.5" fill="#A08060" />
    </BasePigeon>
  );
}

function ReginaldPigeon() {
  // Fancy entrepreneur pigeon with tiny crown and gold chain
  return (
    <BasePigeon body="#5B4B6B" wing="#3D2E4D" belly="#C4B8D4" beak="#E8A735" eye="#6B4423" feet="#9B6B5C">
      {/* Crown */}
      <path d="M50 12 L53 6 L57 14 L62 4 L67 14 L71 6 L74 12Z" fill="#FFD700" />
      <rect x="50" y="12" width="24" height="5" rx="1" fill="#FFD700" />
      <circle cx="56" cy="14" r="1.5" fill="#E8333A" />
      <circle cx="62" cy="14" r="1.5" fill="#2563EB" />
      <circle cx="68" cy="14" r="1.5" fill="#16A34A" />
      {/* Gold chain necklace */}
      <path d="M44 44 Q50 50 56 46 Q62 50 68 44" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="2 2" />
    </BasePigeon>
  );
}

function HenriettaPigeon() {
  // Territorial VP pigeon with a beret and fierce expression
  return (
    <BasePigeon body="#8B6B8B" wing="#6B4B6B" belly="#E4D0E4" beak="#D4643A" eye="#2D1B1B" feet="#B85C5C">
      {/* Beret */}
      <ellipse cx="60" cy="17" rx="15" ry="5" fill="#C41E3A" />
      <path d="M47 19 Q47 10 60 8 Q73 10 73 19" fill="#C41E3A" />
      <circle cx="60" cy="10" r="2.5" fill="#C41E3A" />
      {/* Fierce eyebrow */}
      <line x1="62" y1="22" x2="73" y2="20" stroke="#4B2B4B" strokeWidth="2" strokeLinecap="round" />
      {/* Tiny map in wing */}
      <rect x="16" y="54" width="9" height="7" rx="1" fill="#F5F0E0" />
      <path d="M18 56 L20 58 L22 55" stroke="#C41E3A" strokeWidth="0.8" fill="none" />
    </BasePigeon>
  );
}

function BartholomewPigeon() {
  // Extra fluffy round pigeon that refuses to move - grumpy face, puffed up
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="50" cy="92" rx="24" ry="5" fill="#00000015" />
      {/* EXTRA ROUND fluffy body - this pigeon is a UNIT */}
      <ellipse cx="50" cy="60" rx="30" ry="32" fill="#B8A88A" />
      {/* Fluffy chest */}
      <ellipse cx="54" cy="66" rx="22" ry="22" fill="#E8DCC8" />
      {/* Ruffled feathers */}
      <path d="M22 50 Q18 55 22 60" stroke="#A09070" strokeWidth="1.5" fill="none" />
      <path d="M24 54 Q20 59 24 64" stroke="#A09070" strokeWidth="1.5" fill="none" />
      {/* Head - slightly angry */}
      <circle cx="60" cy="34" r="16" fill="#B8A88A" />
      {/* Grumpy eyebrows */}
      <line x1="58" y1="26" x2="68" y2="24" stroke="#6B5B4B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="65" cy="30" r="5" fill="white" />
      <circle cx="66" cy="30" r="3.5" fill="#2D1B1B" />
      <circle cx="67" cy="29" r="1" fill="white" />
      {/* Grumpy beak (slightly downturned) */}
      <path d="M74 34 L84 36 L74 40Z" fill="#D4943A" />
      <line x1="74" y1="37" x2="83" y2="37" stroke="#B8A88A" strokeWidth="0.5" />
      {/* Tiny feet (barely visible - he's too round) */}
      <path d="M42 88 L38 95 M42 88 L42 96 M42 88 L46 95" stroke="#C4645C" strokeWidth="2" strokeLinecap="round" />
      <path d="M56 88 L52 95 M56 88 L56 96 M56 88 L60 95" stroke="#C4645C" strokeWidth="2" strokeLinecap="round" />
      {/* "I'm not moving" stance lines */}
      <line x1="14" y1="88" x2="86" y2="88" stroke="#00000010" strokeWidth="1" />
    </svg>
  );
}

function ClucksworthPigeon() {
  // Data scientist pigeon with tiny glasses and a laptop glow
  return (
    <BasePigeon body="#4B8B8B" wing="#2B6B6B" belly="#B8E0D8" beak="#D4943A" eye="#1A3A3A" feet="#9B7B5C">
      {/* Tiny round glasses */}
      <circle cx="64" cy="28" r="6" fill="none" stroke="#333" strokeWidth="1.5" />
      <circle cx="76" cy="28" r="5" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="70" y1="28" x2="71" y2="28" stroke="#333" strokeWidth="1.5" />
      <line x1="58" y1="28" x2="52" y2="26" stroke="#333" strokeWidth="1" />
      {/* Tiny laptop */}
      <rect x="14" y="58" width="14" height="9" rx="1" fill="#333" />
      <rect x="15" y="59" width="12" height="7" rx="0.5" fill="#4AF" opacity="0.8" />
      <rect x="12" y="67" width="18" height="2" rx="1" fill="#555" />
      {/* Code on screen */}
      <line x1="16.5" y1="61" x2="22" y2="61" stroke="#AFA" strokeWidth="0.7" />
      <line x1="16.5" y1="63" x2="25" y2="63" stroke="#FAA" strokeWidth="0.7" />
    </BasePigeon>
  );
}

function MargaretPigeon() {
  // HR director pigeon with tiny pearl necklace and warm expression
  return (
    <BasePigeon body="#8B7B6B" wing="#6B5B4B" belly="#E8DCD0" beak="#D4843A" eye="#3D2B1F" feet="#B87B6C">
      {/* Pearl necklace */}
      <circle cx="48" cy="46" r="2" fill="#F0E8D8" stroke="#D4C4A8" strokeWidth="0.5" />
      <circle cx="53" cy="48" r="2" fill="#F0E8D8" stroke="#D4C4A8" strokeWidth="0.5" />
      <circle cx="58" cy="48" r="2" fill="#F0E8D8" stroke="#D4C4A8" strokeWidth="0.5" />
      <circle cx="63" cy="46" r="2" fill="#F0E8D8" stroke="#D4C4A8" strokeWidth="0.5" />
      <circle cx="67" cy="43" r="2" fill="#F0E8D8" stroke="#D4C4A8" strokeWidth="0.5" />
      {/* Warm smile line near beak */}
      <path d="M77 38 Q80 40 78 42" stroke="#C4743A" strokeWidth="0.8" fill="none" />
      {/* Flower on head */}
      <circle cx="54" cy="20" r="3.5" fill="#FF85A2" />
      <circle cx="58" cy="18" r="3.5" fill="#FF85A2" />
      <circle cx="56" cy="23" r="3.5" fill="#FF85A2" />
      <circle cx="52" cy="18" r="3" fill="#FF85A2" />
      <circle cx="55" cy="20" r="2" fill="#FFD700" />
      {/* Heart badge */}
      <path d="M20 52 C20 48 26 48 26 52 C26 56 20 60 20 60 C20 60 14 56 14 52 C14 48 20 48 20 52Z" fill="#10b981" opacity="0.8" />
    </BasePigeon>
  );
}

function ChadPigeon() {
  // Buff fitness pigeon with headband and flexed wings
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="50" cy="92" rx="22" ry="5" fill="#00000015" />
      {/* Tail feathers - spread aggressively */}
      <path d="M28 58 L8 50 L14 60 L6 64 L18 66 L28 64Z" fill="#3B5B3B" />
      {/* BUFF body - wider than normal */}
      <ellipse cx="50" cy="58" rx="28" ry="28" fill="#4B7B4B" />
      {/* Visible muscles (wing definition) */}
      <path d="M24 48 Q20 58 26 70" stroke="#3B5B3B" strokeWidth="2.5" fill="none" />
      <path d="M28 46 Q24 56 30 68" stroke="#3B5B3B" strokeWidth="1.5" fill="none" />
      {/* Belly */}
      <ellipse cx="54" cy="66" rx="16" ry="16" fill="#A8D4A0" />
      {/* Head */}
      <circle cx="62" cy="32" r="17" fill="#4B7B4B" />
      {/* Headband */}
      <path d="M46 28 Q56 22 78 28" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      <path d="M78 28 L86 24 L84 30" fill="#ef4444" />
      <path d="M78 28 L85 20" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      {/* Determined eye */}
      <circle cx="67" cy="30" r="5.5" fill="white" />
      <circle cx="68" cy="30" r="3.8" fill="#1B3B1B" />
      <circle cx="69" cy="29" r="1" fill="white" />
      {/* Fierce eyebrow */}
      <line x1="62" y1="24" x2="72" y2="22" stroke="#2B4B2B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Beak - shouting */}
      <path d="M78 33 L90 32 L78 38Z" fill="#D4A43A" />
      {/* Feet - power stance */}
      <path d="M38 84 L32 94 M38 84 L38 96 M38 84 L44 94" stroke="#C4645C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 84 L54 94 M60 84 L60 96 M60 84 L66 94" stroke="#C4645C" strokeWidth="2.5" strokeLinecap="round" />
      {/* Tiny dumbbell */}
      <rect x="10" y="52" width="3" height="8" rx="1" fill="#888" />
      <line x1="12" y1="56" x2="20" y2="54" stroke="#666" strokeWidth="2" />
      <rect x="19" y="50" width="3" height="8" rx="1" fill="#888" />
    </svg>
  );
}

function YouPigeon() {
  // Normal-ish pigeon, relatable, slight bewilderment
  return (
    <BasePigeon body="#7B7B8B" wing="#5B5B6B" belly="#D0D0DC" beak="#E8A735" eye="#3B3B4B" feet="#C4645C">
      {/* Slightly confused/wide eye */}
      <circle cx="67" cy="28" r="6.5" fill="white" />
      <circle cx="68" cy="28" r="4.5" fill="#3B3B4B" />
      <circle cx="69.5" cy="27" r="1.2" fill="white" />
      {/* Small thought bubble */}
      <circle cx="44" cy="14" r="2" fill="#E8E8F0" />
      <circle cx="40" cy="10" r="3" fill="#E8E8F0" />
      <circle cx="34" cy="5" r="5" fill="#E8E8F0" />
      <text x="31" y="7.5" fontSize="5" fill="#666">?</text>
    </BasePigeon>
  );
}

function DavePigeon() {
  // The most plain, unassuming pigeon. Just vibes.
  return (
    <BasePigeon body="#8B8B8B" wing="#6B6B6B" belly="#D4D4D4" beak="#C89030" eye="#333" feet="#B07060">
      {/* Dave is literally just a pigeon. Nothing special. */}
      {/* But that IS the joke -- he's the most default bird */}
      {/* Tiny name tag */}
      <rect x="40" y="55" width="18" height="10" rx="2" fill="white" stroke="#ddd" strokeWidth="0.5" />
      <text x="42" y="59" fontSize="3.5" fill="#999">HELLO</text>
      <text x="42" y="63" fontSize="5" fill="#333" fontWeight="bold">Dave</text>
    </BasePigeon>
  );
}

function ProfessorPigeon() {
  // Academic pigeon with mortarboard and tiny scroll
  return (
    <BasePigeon body="#6B5B4B" wing="#4B3B2B" belly="#D4C8B8" beak="#D4943A" eye="#1A1A2A" feet="#9B6B5C">
      {/* Mortarboard */}
      <rect x="48" y="12" width="28" height="3" rx="0.5" fill="#1a1a2a" />
      <rect x="56" y="6" width="12" height="8" rx="0.5" fill="#1a1a2a" />
      <line x1="68" y1="8" x2="74" y2="4" stroke="#FFD700" strokeWidth="1.5" />
      <circle cx="75" cy="3" r="2" fill="#FFD700" />
      {/* Small reading glasses */}
      <ellipse cx="64" cy="30" rx="5.5" ry="4.5" fill="none" stroke="#8B7355" strokeWidth="1.2" />
      <ellipse cx="75" cy="30" rx="4.5" ry="4" fill="none" stroke="#8B7355" strokeWidth="1.2" />
      <line x1="69.5" y1="30" x2="70.5" y2="30" stroke="#8B7355" strokeWidth="1" />
      {/* Tiny scroll */}
      <rect x="14" y="56" width="12" height="8" rx="3" fill="#F5E8C8" />
      <line x1="17" y1="58" x2="23" y2="58" stroke="#C4A878" strokeWidth="0.6" />
      <line x1="17" y1="60" x2="22" y2="60" stroke="#C4A878" strokeWidth="0.6" />
    </BasePigeon>
  );
}

function ElonPigeon() {
  // Techbro pigeon with sunglasses and rocket
  return (
    <BasePigeon body="#2B2B3B" wing="#1B1B2B" belly="#8888A8" beak="#C4943A" eye="#222" feet="#6B5B5B">
      {/* Cool sunglasses */}
      <rect x="59" y="25" width="14" height="8" rx="2" fill="#1a1a1a" />
      <rect x="73" y="25" width="10" height="7" rx="2" fill="#1a1a1a" />
      <line x1="73" y1="29" x2="73" y2="29" stroke="#1a1a1a" strokeWidth="2" />
      <line x1="55" y1="28" x2="59" y2="28" stroke="#1a1a1a" strokeWidth="1.5" />
      {/* Tiny rocket */}
      <path d="M14 40 L14 56 L18 56 L18 40 L16 34Z" fill="#C0C0C0" />
      <path d="M12 52 L14 48 L14 56Z" fill="#E44" />
      <path d="M18 48 L20 52 L18 56Z" fill="#E44" />
      <path d="M14 56 L13 62 M16 56 L16 63 M18 56 L19 62" stroke="#F80" strokeWidth="1.5" strokeLinecap="round" />
      {/* "X" logo on chest */}
      <text x="50" y="64" fontSize="10" fill="white" fontWeight="bold" opacity="0.3">X</text>
    </BasePigeon>
  );
}

// Fallback generic pigeon
function GenericPigeon({ color }) {
  return (
    <BasePigeon body={color || "#7B8B7B"} wing={darken(color) || "#5B6B5B"} belly="#D4D8D4" beak="#D4943A" eye="#333" feet="#B07060" />
  );
}

function darken(hex) {
  if (!hex) return null;
  try {
    const r = Math.max(0, parseInt(hex.slice(1,3), 16) - 40);
    const g = Math.max(0, parseInt(hex.slice(3,5), 16) - 40);
    const b = Math.max(0, parseInt(hex.slice(5,7), 16) - 40);
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
  } catch { return '#5B6B5B'; }
}

// ─── Main mapping ───

const PIGEON_MAP = {
  'Gerald P. Featherton III': GeraldPigeon,
  'Pecky McPeckface': PeckyPigeon,
  'Sir Reginald Von Coo': ReginaldPigeon,
  'Henrietta Wingsworth': HenriettaPigeon,
  'Bartholomew Fluffington': BartholomewPigeon,
  'Clucksworth B. Feathers': ClucksworthPigeon,
  'Margaret Peckington': MargaretPigeon,
  'Chad Thunderwing': ChadPigeon,
  'You (A Pigeon)': YouPigeon,
  'Dave': DavePigeon,
  'Professor Coo-per': ProfessorPigeon,
  'Elon Coo-sk': ElonPigeon,
};

export default function PigeonSVG({ name, color }) {
  const Component = PIGEON_MAP[name];
  if (Component) return <Component />;
  return <GenericPigeon color={color} />;
}

export function hasPigeonSVG(name) {
  return name in PIGEON_MAP;
}
