"use client";

interface BackgroundProps {
  glowStyle?: React.CSSProperties;
}

export default function Background({ glowStyle }: BackgroundProps) {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-glow" style={glowStyle} />
      <div className="bg-vignette" />

      {/* Hand-drawn map lines */}
      <svg
        className="bg-map"
        viewBox="0 0 1400 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <path d="M-20,180 Q120,160 280,192 Q440,224 620,178 Q800,132 980,175 Q1160,218 1340,185 Q1380,182 1420,185"
          stroke="#8AA0BC" strokeWidth="0.9" fill="none" opacity="0.55"/>
        <path d="M-20,380 Q100,355 300,388 Q500,421 700,372 Q900,323 1100,368 Q1280,410 1420,380"
          stroke="#8AA0BC" strokeWidth="0.7" fill="none" opacity="0.4"/>
        <path d="M-20,580 Q150,558 380,582 Q610,606 840,560 Q1060,516 1240,555 Q1360,580 1420,572"
          stroke="#8AA0BC" strokeWidth="0.6" fill="none" opacity="0.32"/>
        <path d="M-20,760 Q200,740 440,762 Q680,784 920,748 Q1120,718 1300,742 Q1380,754 1420,750"
          stroke="#8AA0BC" strokeWidth="0.5" fill="none" opacity="0.28"/>
        <path d="M260,-10 Q245,180 258,360 Q271,540 252,720 Q240,820 248,910"
          stroke="#8AA0BC" strokeWidth="0.7" fill="none" opacity="0.38"/>
        <path d="M700,-10 Q712,180 698,360 Q684,540 702,720 Q714,820 700,910"
          stroke="#8AA0BC" strokeWidth="0.55" fill="none" opacity="0.3"/>
        <path d="M1140,-10 Q1128,180 1145,360 Q1162,540 1138,720 Q1122,820 1142,910"
          stroke="#8AA0BC" strokeWidth="0.65" fill="none" opacity="0.36"/>
        <circle cx="260" cy="180" r="3.5" fill="#8AA0BC" opacity="0.55"/>
        <circle cx="700" cy="380" r="3.5" fill="#8AA0BC" opacity="0.55"/>
        <circle cx="1140" cy="580" r="3.5" fill="#8AA0BC" opacity="0.5"/>
        <circle cx="980" cy="175" r="2.5" fill="#8AA0BC" opacity="0.4"/>
        <circle cx="440"  cy="388" r="2.5" fill="#8AA0BC" opacity="0.4"/>
        <circle cx="840"  cy="560" r="2.5" fill="#8AA0BC" opacity="0.35"/>
        <g fontFamily="serif" fill="#8AA0BC" opacity="0.42" fontSize="13">
          <text x="96"  y="145">᛭</text>
          <text x="1260" y="148">◈</text>
          <text x="520" y="340">᛭</text>
          <text x="940"  y="358">◈</text>
          <text x="180"  y="545">◈</text>
          <text x="1060" y="530">᛭</text>
        </g>
        <path d="M40,30 Q55,30 60,45 M40,30 Q40,45 55,50"
          stroke="#8AA0BC" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round"/>
        <path d="M1360,30 Q1345,30 1340,45 M1360,30 Q1360,45 1345,50"
          stroke="#8AA0BC" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round"/>
        <path d="M40,870 Q55,870 60,855 M40,870 Q40,855 55,850"
          stroke="#8AA0BC" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round"/>
        <path d="M1360,870 Q1345,870 1340,855 M1360,870 Q1360,855 1345,850"
          stroke="#8AA0BC" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round"/>
        <path d="M-20,280 Q300,262 600,278 Q900,294 1200,272 Q1340,265 1420,270"
          stroke="#8AA0BC" strokeWidth="0.5" fill="none" opacity="0.22" strokeDasharray="4,10"/>
        <path d="M-20,480 Q300,498 600,482 Q900,466 1200,484 Q1340,492 1420,488"
          stroke="#8AA0BC" strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="4,10"/>
      </svg>

      <div className="bg-grain" />
    </div>
  );
}
