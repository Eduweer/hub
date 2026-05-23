export default function PortalSceneParent() {
  return (
    <svg viewBox="0 0 290 290" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sg" cx="50%" cy="28%" r="72%">
          <stop offset="0%"   stopColor="#d8f4e8"/>
          <stop offset="48%"  stopColor="#5aaa7a"/>
          <stop offset="100%" stopColor="#1c4a2c"/>
        </radialGradient>
        <radialGradient id="sng" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fffde8" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#c0f0a0" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="290" height="290" fill="url(#sg)"/>
      <ellipse cx="145" cy="60" rx="65" ry="50" fill="url(#sng)" opacity="0.75"/>
      <circle cx="145" cy="56" r="16" fill="#fffde8" opacity="0.55"/>
      <ellipse cx="42"  cy="198" rx="128" ry="74" fill="#0e2e18" opacity="0.82"/>
      <ellipse cx="245" cy="202" rx="138" ry="78" fill="#0b2614" opacity="0.86"/>
      <ellipse cx="145" cy="268" rx="208" ry="68" fill="#183a22"/>
      <rect x="0" y="266" width="290" height="28" fill="#102018"/>
      <path d="M145,290 Q136,246 134,202 Q132,160 143,122 Q150,96 145,66"
        stroke="#d0f8d0" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.13"/>
      <path d="M145,290 Q136,246 134,202 Q132,160 143,122 Q150,96 145,66"
        stroke="#e8ffe0" strokeWidth="5"  fill="none" strokeLinecap="round" opacity="0.42"/>
      <path d="M145,290 Q136,246 134,202 Q132,160 143,122 Q150,96 145,66"
        stroke="white"   strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.44"/>
      <rect x="80" y="213" width="48" height="40" rx="2" fill="#091c0e"/>
      <polygon points="74,215 104,191 134,215" fill="#06100a"/>
      <rect x="96"  y="231" width="11" height="22" rx="1" fill="#193820"/>
      <rect x="85"  y="219" width="8"  height="8"  rx="1" fill="#142e18" opacity="0.7"/>
      <rect x="117" y="219" width="8"  height="8"  rx="1" fill="#142e18" opacity="0.7"/>
      <circle cx="123" cy="184" r="5" fill="#c8e0b8" opacity="0.2"/>
      <circle cx="125" cy="174" r="7" fill="#c8e0b8" opacity="0.14"/>
      <rect x="35"  y="150" width="8" height="100" fill="#06100a"/>
      <ellipse cx="39"  cy="143" rx="20" ry="24" fill="#112e18"/>
      <ellipse cx="39"  cy="135" rx="14" ry="18" fill="#1c4828"/>
      <rect x="242" y="156" width="7" height="96"  fill="#06100a"/>
      <ellipse cx="245" cy="150" rx="19" ry="23" fill="#112e18"/>
      <ellipse cx="245" cy="142" rx="13" ry="17" fill="#1c4828"/>
      <circle cx="112" cy="192" r="2.5" fill="#b8ffc0">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="2.1s" repeatCount="indefinite"/>
      </circle>
      <circle cx="168" cy="198" r="2"   fill="#b8ffc0">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="3.1s" repeatCount="indefinite"/>
      </circle>
      <circle cx="90"  cy="208" r="1.8" fill="#d0ffb8">
        <animate attributeName="opacity" values="0.2;0.9;0.2" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="188" cy="184" r="1.5" fill="#b8ffc0">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2.7s" repeatCount="indefinite"/>
      </circle>
      <circle cx="50"  cy="34" r="1.3" fill="white" opacity="0.7">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.1s" repeatCount="indefinite"/>
      </circle>
      <circle cx="96"  cy="18" r="1"   fill="white" opacity="0.5">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="194" cy="22" r="1.2" fill="white" opacity="0.55">
        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="235" cy="42" r="1"   fill="white" opacity="0.4">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.7s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}
