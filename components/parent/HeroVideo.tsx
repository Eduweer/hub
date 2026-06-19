"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroVideo.module.css";
import { assetUrl } from "@/lib/cdn";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState<number | null>(null); // null = indeterminate
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Already buffered enough to play through without stopping
    if (video.readyState >= 4) {
      setReady(true);
      return;
    }

    const markReady = () => setReady(true);

    // Estimate buffering progress from the last buffered range vs duration
    const updateProgress = () => {
      const d = video.duration;
      if (!d || !isFinite(d) || video.buffered.length === 0) return;
      const end = video.buffered.end(video.buffered.length - 1);
      setProgress(Math.min(end / d, 1));
    };

    const onError = () => setFailed(true);

    video.addEventListener("canplaythrough", markReady);
    video.addEventListener("playing", markReady);
    video.addEventListener("progress", updateProgress);
    video.addEventListener("loadeddata", updateProgress);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("canplaythrough", markReady);
      video.removeEventListener("playing", markReady);
      video.removeEventListener("progress", updateProgress);
      video.removeEventListener("loadeddata", updateProgress);
      video.removeEventListener("error", onError);
    };
  }, []);

  const pct = progress != null ? Math.round(progress * 100) : null;
  const indeterminate = pct == null && !failed;

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
        onError={() => setFailed(true)}
      >
        <source src={assetUrl("/videos/trailer.mp4")} type="video/mp4" />
      </video>

      {/* Branded loader — visible until the video can play through, so a slow
          network shows the mark + progress instead of a bare grey panel. */}
      <div className={styles.loader} aria-hidden="true">
        <div className={styles.brand}>EDUWEER</div>
        <div className={styles.track}>
          <div
            className={`${styles.fill} ${indeterminate ? styles.indeterminate : ""} ${failed ? styles.stalled : ""}`}
            style={pct != null ? { width: `${pct}%` } : undefined}
          />
        </div>
      </div>
    </div>
  );
}
