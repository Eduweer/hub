"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroVideo.module.css";
import { assetUrl } from "@/lib/cdn";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Already enough data to play through without stopping
    if (video.readyState >= 4) {
      setReady(true);
      return;
    }

    const onReady = () => setReady(true);
    video.addEventListener("canplaythrough", onReady);
    return () => video.removeEventListener("canplaythrough", onReady);
  }, []);

  return (
    <div className={`${styles.videoWrap} ${ready ? styles.ready : ""}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={styles.video}
      >
        <source src={assetUrl("/videos/trailer.mp4")} type="video/mp4" />
      </video>
    </div>
  );
}
