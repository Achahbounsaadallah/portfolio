export default function NameLogo() {
  return (
    <svg
      viewBox="0 0 480 210"
      fill="none"
      role="img"
      aria-label="SAD logo"
      className="w-full h-auto block"
      style={{ filter: 'drop-shadow(0 0 18px rgba(182, 0, 168, 0.18))' }}
    >
      <defs>
        <linearGradient id="sad-logo-gradient" gradientUnits="userSpaceOnUse" x1="20" y1="20" x2="300" y2="190">
          <stop offset="0%" stopColor="#BBCCD7" />
          <stop offset="100%" stopColor="#D7E2EA" />
        </linearGradient>
        <linearGradient id="sad-logo-echo" gradientUnits="userSpaceOnUse" x1="176" y1="30" x2="440" y2="178">
          <stop offset="0%" stopColor="#7621B0" />
          <stop offset="55%" stopColor="#B600A8" />
          <stop offset="100%" stopColor="#BE4C00" />
        </linearGradient>
        <filter id="sad-logo-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <g strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
        <path d="M176 178 L239 30 L302 178 L352 178 V30 H362 C438 30 438 178 362 178 H352" stroke="#B600A8" strokeOpacity=".55" filter="url(#sad-logo-blur)" />
        <path d="M176 178 L239 30 L302 178 L352 178 V30 H362 C438 30 438 178 362 178 H352" stroke="url(#sad-logo-echo)" />
        <path d="M205 128 H274" stroke="url(#sad-logo-echo)" />
        <path d="M302 178 L352 178" stroke="#fff" strokeWidth="5" strokeDasharray="10 40">
          <animate attributeName="stroke-dashoffset" from="50" to="0" dur="1.2s" repeatCount="indefinite" />
        </path>
        <path d="M112 50 C106 24 44 20 40 55 C36 90 112 86 112 116 C112 146 62 152 34 136 C20 150 40 178 92 178 L142 178 L205 30 L268 178" stroke="url(#sad-logo-gradient)" />
        <path d="M168 128 H242" stroke="url(#sad-logo-gradient)" />
      </g>
    </svg>
  );
}
