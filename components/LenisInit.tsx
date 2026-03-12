"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisInit() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let animFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animFrameId = requestAnimationFrame(raf);
    }

    animFrameId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return null;
}
