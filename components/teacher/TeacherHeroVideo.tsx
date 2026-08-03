"use client";

import { useEffect, useRef, useState } from "react";
import { assetUrl } from "@/lib/cdn";
import styles from "./TeacherHeroVideo.module.css";

export default function TeacherHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => setReady(true);
    const markFailed = () => setFailed(true);

    if (video.readyState >= 3) markReady();

    video.addEventListener("canplay", markReady);
    video.addEventListener("playing", markReady);
    video.addEventListener("error", markFailed);

    return () => {
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("playing", markReady);
      video.removeEventListener("error", markFailed);
    };
  }, []);

  return (
    <div
      className={`${styles.media} ${ready ? styles.ready : ""} ${failed ? styles.failed : ""}`}
      aria-hidden="true"
    >
      {!failed && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={styles.video}
          onCanPlay={() => setReady(true)}
          onPlaying={() => setReady(true)}
          onError={() => setFailed(true)}
          tabIndex={-1}
        >
          <source src={assetUrl("/videos/guilds.mp4")} type="video/mp4" />
          Your browser does not support background video.
        </video>
      )}

      <div className={styles.loader}>
        <span>Eduweer</span>
        <i />
      </div>
    </div>
  );
}
