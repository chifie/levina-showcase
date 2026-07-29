export default function ProfileIllustration() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      {/* Background gradient circle */}
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D946EF" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1F0B14" />
          <stop offset="100%" stopColor="#3D1F30" />
        </linearGradient>
        <linearGradient id="codeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D946EF" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <clipPath id="circleClip">
          <circle cx="200" cy="200" r="170" />
        </clipPath>
      </defs>

      {/* Background circle */}
      <circle cx="200" cy="200" r="170" fill="url(#bgGrad)" opacity="0.15" />

      {/* Decorative rings */}
      <circle cx="200" cy="200" r="180" stroke="url(#bgGrad)" strokeWidth="1" opacity="0.3" />
      <circle cx="200" cy="200" r="190" stroke="url(#bgGrad)" strokeWidth="0.5" opacity="0.15" />

      {/* Body / shoulders */}
      <path
        d="M140 320 C140 280 160 260 200 260 C240 260 260 280 260 320 L260 380 L140 380 Z"
        fill="#FDF2F8"
        stroke="#FCE7F3"
        strokeWidth="2"
      />

      {/* Collar/blouse detail */}
      <path
        d="M180 260 L200 290 L220 260"
        fill="none"
        stroke="url(#bgGrad)"
        strokeWidth="2"
        opacity="0.5"
      />

      {/* Neck */}
      <rect x="188" y="245" width="24" height="25" rx="12" fill="#FFE4E6" />

      {/* Head */}
      <ellipse cx="200" cy="205" rx="55" ry="60" fill="#FFE4E6" />

      {/* Hair - main */}
      <path
        d="M145 200 C145 140 160 125 200 120 C240 125 255 140 255 200 L255 240 C255 245 245 250 240 245 L240 200 C240 155 230 140 200 138 C170 140 160 155 160 200 L160 245 C155 250 145 245 145 240 Z"
        fill="url(#hairGrad)"
      />

      {/* Hair - side strands */}
      <path
        d="M148 190 C145 170 150 150 160 140 C155 155 152 175 155 200"
        fill="url(#hairGrad)"
        opacity="0.8"
      />
      <path
        d="M252 190 C255 170 250 150 240 140 C245 155 248 175 245 200"
        fill="url(#hairGrad)"
        opacity="0.8"
      />

      {/* Eyes */}
      <ellipse cx="178" cy="200" rx="8" ry="5" fill="#1F0B14" />
      <ellipse cx="222" cy="200" rx="8" ry="5" fill="#1F0B14" />

      {/* Eye shine */}
      <circle cx="181" cy="198" r="2.5" fill="white" opacity="0.8" />
      <circle cx="225" cy="198" r="2.5" fill="white" opacity="0.8" />

      {/* Eyebrows */}
      <path
        d="M165 190 Q175 184 190 188"
        fill="none"
        stroke="#1F0B14"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M210 188 Q225 184 235 190"
        fill="none"
        stroke="#1F0B14"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Nose */}
      <path
        d="M200 207 Q200 215 195 218"
        fill="none"
        stroke="#FBCFE8"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Smile */}
      <path
        d="M185 225 Q200 238 215 225"
        fill="none"
        stroke="#BE185D"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Blush */}
      <ellipse cx="165" cy="218" rx="10" ry="5" fill="#FBCFE8" opacity="0.5" />
      <ellipse cx="235" cy="218" rx="10" ry="5" fill="#FBCFE8" opacity="0.5" />

      {/* Glasses - stylish round frames */}
      <circle cx="178" cy="200" r="14" fill="none" stroke="#D946EF" strokeWidth="2" opacity="0.4" />
      <circle cx="222" cy="200" r="14" fill="none" stroke="#D946EF" strokeWidth="2" opacity="0.4" />
      <path
        d="M192 200 L208 200"
        fill="none"
        stroke="#D946EF"
        strokeWidth="2"
        opacity="0.4"
      />

      {/* Code brackets floating */}
      <text
        x="130"
        y="155"
        fontSize="16"
        fontWeight="bold"
        fill="#D946EF"
        opacity="0.3"
        fontFamily="monospace"
      >
        {'{ }'}
      </text>
      <text
        x="245"
        y="165"
        fontSize="12"
        fontWeight="bold"
        fill="#EC4899"
        opacity="0.25"
        fontFamily="monospace"
      >
        {'< />'}
      </text>

      {/* Floating decorative dots */}
      <circle cx="140" cy="175" r="3" fill="#D946EF" opacity="0.2" />
      <circle cx="265" cy="210" r="2" fill="#EC4899" opacity="0.2" />
      <circle cx="155" cy="240" r="2.5" fill="#D946EF" opacity="0.15" />
      <circle cx="250" cy="235" r="2" fill="#EC4899" opacity="0.2" />

      {/* Laptop/device element at bottom */}
      <rect x="170" y="340" width="60" height="8" rx="4" fill="#D946EF" opacity="0.15" />
      <rect x="175" y="335" width="50" height="5" rx="2" fill="#D946EF" opacity="0.1" />
    </svg>
  );
}
