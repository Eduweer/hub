"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ArtifactsHeroVideo.module.css";
import { assetUrl } from "@/lib/cdn";
import { artifactHeroMedia } from "@/lib/artifacts";

/**
 * Hero background video for /artifacts.
 *
 * Mirrors the parent HeroVideo behaviour (autoplay/muted/loop/playsInline +
 * branded loader) but adds a static fallback image. The poster shows while the
 * video buffers and the same image is rendered as a hard fallback if the video
 * errors or is never made available (e.g. mobile data-saving). Video never
 * blocks the page — it sits behind scrolling content and fades in when ready.
 */
export default function ArtifactsHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState<number | null>(null); // null = indeterminate
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 4) {
      setReady(true);
      return;
    }

    const markReady = () => setReady(true);

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
      {/* Static fallback — always rendered behind the video as poster + hard
          fallback. Stays visible on mobile / when the video fails to load. */}
      <Image
        src={artifactHeroMedia.poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.fallback}
        style={{ objectFit: "cover" }}
      />

      {!failed && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={assetUrl(artifactHeroMedia.poster)}
          className={styles.video}
          onError={() => setFailed(true)}
        >
          <source src={assetUrl(artifactHeroMedia.video)} type="video/mp4" />
        </video>
      )}

      {/* Branded loader — shown until the video can play through. */}
      {!failed && (
        <div className={styles.loader} aria-hidden="true">
          <div className={styles.brand}>EDUWEER</div>
          <div className={styles.track}>
            <div
              className={`${styles.fill} ${indeterminate ? styles.indeterminate : ""}`}
              style={pct != null ? { width: `${pct}%` } : undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
}
