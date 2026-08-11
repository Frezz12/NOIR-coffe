export default function Cup({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 340"
      fill="none"
      className={className}
      aria-label="A cup of coffee with steam"
      role="img"
    >
      {/* soft shadow */}
      <ellipse cx="180" cy="318" rx="150" ry="14" fill="var(--coffee)" opacity="0.18" />

      {/* saucer */}
      <ellipse cx="180" cy="292" rx="146" ry="26" fill="var(--saucer)" />
      <ellipse cx="180" cy="296" rx="146" ry="26" fill="var(--saucer)" />
      <path
        d="M34 292 C34 306 99 318 180 318 C261 318 326 306 326 292 L326 296 C326 310 261 322 180 322 C99 322 34 310 34 296 Z"
        fill="var(--cup-edge)"
        opacity="0.7"
      />
      <ellipse cx="150" cy="290" rx="60" ry="9" fill="var(--cup-body)" opacity="0.35" />

      {/* cup body */}
      <path
        d="M95 128 L265 128 L248 248 Q246 262 231 262 L129 262 Q114 262 112 248 Z"
        fill="var(--cup-body)"
      />
      {/* body shading */}
      <path
        d="M95 128 L118 128 L133 262 L129 262 Q114 262 112 248 Z"
        fill="var(--coffee)"
        opacity="0.08"
      />
      <path
        d="M239 128 L265 128 L248 248 Q246 262 231 262 L222 262 Z"
        fill="var(--coffee)"
        opacity="0.1"
      />
      {/* body highlight */}
      <path
        d="M108 140 C118 152 122 190 121 238"
        stroke="var(--cup-hi)"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* handle */}
      <path
        d="M264 158 C306 156 316 190 306 216 C299 234 286 244 272 244 L262 244"
        stroke="var(--cup-edge)"
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M264 158 C306 156 316 190 306 216 C299 234 286 244 272 244"
        stroke="var(--cup-hi)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* rim */}
      <ellipse cx="180" cy="128" rx="85" ry="20" fill="var(--cup-edge)" />
      <ellipse cx="180" cy="126" rx="79" ry="18" fill="var(--coffee)" />
      <ellipse cx="180" cy="127" rx="56" ry="13" fill="#6b4023" opacity="0.55" />

      {/* crema swirl */}
      <path
        d="M158 127 C150 120 196 112 212 126 C220 133 216 136 211 132 C203 125 185 124 178 131 C172 137 177 140 183 136"
        stroke="var(--coffee-cream)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.9"
      />
      <ellipse cx="194" cy="127" rx="8" ry="3" fill="var(--coffee-cream)" opacity="0.5" />

      {/* steam */}
      <g style={{ ["--steam-x" as string]: "10px", ["--steam-op" as string]: "0.5" }}>
        <path
          className="steam-path"
          d="M168 106 C160 92 174 82 166 68"
          stroke="var(--coffee-cream)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>
      <g style={{ ["--steam-x" as string]: "-8px", ["--steam-op" as string]: "0.4", animationDelay: "1.1s" }}>
        <path
          className="steam-path"
          d="M192 104 C200 90 186 80 194 66"
          stroke="var(--coffee-cream)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g style={{ ["--steam-x" as string]: "2px", ["--steam-op" as string]: "0.32", animationDelay: "2.2s" }}>
        <path
          className="steam-path"
          d="M180 108 C176 96 184 88 180 74"
          stroke="var(--coffee-cream)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
