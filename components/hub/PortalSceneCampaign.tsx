export default function PortalSceneCampaign() {
  return (
    <svg viewBox="0 0 290 290" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sc" cx="50%" cy="40%" r="70%">
          <stop offset="0%"   stopColor="#fff3c8"/>
          <stop offset="38%"  stopColor="#e09838"/>
          <stop offset="100%" stopColor="#4a1808"/>
        </radialGradient>
        <radialGradient id="rc" cx="50%" cy="100%" r="70%">
          <stop offset="0%"   stopColor="#fff8d0" stopOpacity="0.8"/>
          <stop offset="40%"  stopColor="#f5c060" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#b05820" stopOpacity="0"/>
        </radialGradient>
        <filter id="fc" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="290" height="290" fill="url(#sc)"/>
      <ellipse cx="145" cy="290" rx="158" ry="118" fill="url(#rc)"/>
      <g stroke="#f5c060" strokeWidth="1.5" opacity="0.3">
        <line x1="145" y1="260" x2="145" y2="204"/>
        <line x1="173" y1="264" x2="189" y2="210"/>
        <line x1="117" y1="264" x2="101" y2="210"/>
        <line x1="196" y1="274" x2="224" y2="232"/>
        <line x1="94"  y1="274" x2="66"  y2="232"/>
      </g>
      <ellipse cx="54"  cy="258" rx="152" ry="62" fill="#380e04" opacity="0.9"/>
      <ellipse cx="252" cy="265" rx="162" ry="67" fill="#2a0a04" opacity="0.95"/>
      <ellipse cx="145" cy="278" rx="212" ry="58" fill="#1e0802"/>
      <g transform="translate(80,142)">
        <rect x="4" y="34" width="49" height="71" rx="3" fill="#180604" opacity="0.3"/>
        <rect x="2" y="30" width="49" height="71" rx="3" fill="#1a3d28"/>
        <rect x="6" y="34" width="41" height="63" rx="2" fill="#245535"/>
        <rect x="10" y="42" width="31" height="2"   rx="1" fill="rgba(255,255,255,0.42)"/>
        <rect x="13" y="48" width="22" height="1.5" rx="1" fill="rgba(255,255,255,0.22)"/>
        <rect x="10" y="53" width="31" height="1"   rx="1" fill="rgba(255,255,255,0.14)"/>
        <path d="M26,66 L28,72 L34,72 L29.5,75.5 L31.5,81.5 L26,78 L20.5,81.5 L22.5,75.5 L18,72 L24,72 Z"
          fill="#C8963C" opacity="0.95" filter="url(#fc)"/>
        <g transform="translate(51,4) rotate(10)">
          <rect x="0" y="20" width="35" height="61" rx="3" fill="#7a3a10"/>
          <rect x="3" y="23" width="29" height="55" rx="2" fill="#9a5020"/>
          <rect x="7" y="30" width="17" height="1.5" rx="1" fill="rgba(255,255,255,0.32)"/>
          <rect x="7" y="36" width="13" height="1"   rx="1" fill="rgba(255,255,255,0.2)"/>
        </g>
      </g>
      <circle cx="78"  cy="132" r="3"   fill="#C8963C" filter="url(#fc)">
        <animate attributeName="r" values="2;4;2" dur="1.7s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.7s" repeatCount="indefinite"/>
      </circle>
      <circle cx="220" cy="144" r="2.5" fill="#C8963C" filter="url(#fc)">
        <animate attributeName="r" values="1.5;3.5;1.5" dur="2.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60"  cy="190" r="2"   fill="#f5c060">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="242" cy="125" r="2"   fill="#f5c060">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.9s" repeatCount="indefinite"/>
      </circle>
      <g transform="translate(232,63)" stroke="#C8963C" strokeWidth="1.5" opacity="0.65" filter="url(#fc)">
        <line x1="0" y1="-9" x2="0"  y2="9"/>
        <line x1="-9" y1="0" x2="9"  y2="0"/>
        <line x1="-6" y1="-6" x2="6" y2="6"/>
        <line x1="6"  y1="-6" x2="-6" y2="6"/>
      </g>
    </svg>
  );
}
