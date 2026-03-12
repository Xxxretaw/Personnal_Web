"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import Lenis from "lenis";

type LenisInstance = InstanceType<typeof Lenis> | null;

const LenisContext = createContext<LenisInstance>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<LenisInstance>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: true, // 让 Lenis 正确处理锚点链接
    });
    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      instance.destroy();
      cancelAnimationFrame(rafRef.current);
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
