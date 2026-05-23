"use client";

import { useEffect } from "react";

/**
 * Drop this component anywhere in a server-component page.
 * It attaches an IntersectionObserver that adds the "vis" class
 * to every element already carrying the "rev" class.
 *
 * CSS module classes are local, so callers pass the two class
 * names (can be hashed) via props.
 */
export default function ScrollReveal({
  revClass,
  visClass,
}: {
  revClass: string;
  visClass: string;
}) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(visClass);
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -36px 0px" }
    );

    document.querySelectorAll(`.${revClass}`).forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [revClass, visClass]);

  return null;
}
