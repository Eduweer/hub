"use client";

interface MoteConfig {
  left: string;
  top: string;
  size: string;
  color: string;
  duration: string;
  delay: string;
}

const DEFAULT_MOTES: MoteConfig[] = [
  { left: "9%",  top: "74%", size: "2.5px", color: "#C8963C", duration: "11s", delay: "0s" },
  { left: "23%", top: "68%", size: "2px",   color: "#C8963C", duration: "14s", delay: "2.3s" },
  { left: "74%", top: "76%", size: "3px",   color: "#C8963C", duration: "10s", delay: "4.1s" },
  { left: "87%", top: "64%", size: "2px",   color: "#C8963C", duration: "13s", delay: "1.2s" },
  { left: "47%", top: "82%", size: "2px",   color: "#E8BB6A", duration: "12s", delay: "3.5s" },
  { left: "62%", top: "60%", size: "2.5px", color: "#C8963C", duration: "9s",  delay: "5.8s" },
  { left: "36%", top: "78%", size: "2px",   color: "#E8BB6A", duration: "15s", delay: "1.7s" },
  { left: "55%", top: "70%", size: "1.5px", color: "#C8963C", duration: "8s",  delay: "0.6s" },
];

interface MotesProps {
  motes?: MoteConfig[];
}

export default function Motes({ motes = DEFAULT_MOTES }: MotesProps) {
  return (
    <div className="motes" aria-hidden="true">
      {motes.map((m, i) => (
        <div
          key={i}
          className="mote"
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            background: m.color,
            animationDuration: m.duration,
            animationDelay: m.delay,
          }}
        />
      ))}
    </div>
  );
}
