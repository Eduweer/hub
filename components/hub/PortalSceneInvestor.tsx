export default function PortalSceneInvestor() {
  return (
    <svg viewBox="0 0 370 370" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sb" cx="50%" cy="34%" r="70%">
          <stop offset="0%"   stopColor="#c8e8ff"/>
          <stop offset="42%"  stopColor="#1a5898"/>
          <stop offset="100%" stopColor="#05101e"/>
        </radialGradient>
        <filter id="fb" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="370" height="370" fill="url(#sb)"/>
      <circle cx="54"  cy="44"  r="1.4" fill="white" opacity="0.8"><animate attributeName="opacity" values="0.4;1;0.4" dur="2.3s" repeatCount="indefinite"/></circle>
      <circle cx="108" cy="20"  r="1.1" fill="white" opacity="0.7"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.4s" repeatCount="indefinite"/></circle>
      <circle cx="184" cy="28"  r="1.4" fill="white" opacity="0.85"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite"/></circle>
      <circle cx="245" cy="50"  r="1.1" fill="white" opacity="0.7"><animate attributeName="opacity" values="0.4;1;0.4" dur="2.7s" repeatCount="indefinite"/></circle>
      <circle cx="308" cy="28"  r="1"   fill="white" opacity="0.5"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.8s" repeatCount="indefinite"/></circle>
      <circle cx="340" cy="78"  r="1.4" fill="white" opacity="0.6"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.2s" repeatCount="indefinite"/></circle>
      <line x1="54"  y1="44" x2="108" y2="20"  stroke="rgba(180,220,255,0.15)" strokeWidth="0.8"/>
      <line x1="108" y1="20" x2="145" y2="66"  stroke="rgba(180,220,255,0.15)" strokeWidth="0.8"/>
      <line x1="145" y1="66" x2="184" y2="28"  stroke="rgba(180,220,255,0.15)" strokeWidth="0.8"/>
      <line x1="184" y1="28" x2="245" y2="50"  stroke="rgba(180,220,255,0.15)" strokeWidth="0.8"/>
      <line x1="245" y1="50" x2="308" y2="28"  stroke="rgba(180,220,255,0.15)" strokeWidth="0.8"/>
      <circle cx="304" cy="70" r="29" fill="#0a2855" opacity="0.82"/>
      <circle cx="304" cy="70" r="19" fill="#1a4a8a" opacity="0.72"/>
      <circle cx="304" cy="70" r="10" fill="#2a6ab0" opacity="0.62"/>
      <ellipse cx="185" cy="198" rx="126" ry="63" fill="none" stroke="rgba(120,200,255,0.1)"  strokeWidth="1.5" strokeDasharray="5,10"/>
      <ellipse cx="185" cy="198" rx="100" ry="50" fill="none" stroke="rgba(120,200,255,0.07)" strokeWidth="1"   strokeDasharray="3,12"/>
      <circle cx="311" cy="198" r="5.5" fill="#7ac0f0" opacity="0.75" filter="url(#fb)"/>
      <circle cx="185" cy="135" r="5"   fill="#C8963C" opacity="0.75" filter="url(#fb)"/>
      <circle cx="59"  cy="198" r="5.5" fill="#7ac0f0" opacity="0.75" filter="url(#fb)"/>
      <g transform="translate(150,150)" filter="url(#fb)">
        <polygon points="35,0 70,22 70,58 35,80 0,58 0,22"
          fill="#0a2050" stroke="#7ac0f0" strokeWidth="1.5" opacity="0.96"/>
        <polygon points="35,7 62,25 62,55 35,73 8,55 8,25"
          fill="#122870" opacity="0.7"/>
        <line x1="35" y1="0"  x2="35" y2="80" stroke="rgba(120,200,255,0.28)" strokeWidth="0.8"/>
        <line x1="0"  y1="40" x2="70" y2="40" stroke="rgba(120,200,255,0.28)" strokeWidth="0.8"/>
        <circle cx="35" cy="40" r="7" fill="#2a6ab0" opacity="0.82"/>
        <circle cx="35" cy="40" r="3" fill="white"   opacity="0.9"/>
      </g>
      <rect x="0" y="325" width="370" height="45" fill="#020810" opacity="0.8"/>
      <ellipse cx="185" cy="330" rx="185" ry="22" fill="#0a1e40" opacity="0.55"/>
    </svg>
  );
}
