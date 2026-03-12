"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const CYCLING_WORDS = ["精准", "高效", "自然", "有趣"];

// ── SVG icon helper ───────────────────────────────────────────────────────
function InkIcon({
  src, size, rotate = 0, opacity = 0.35, style,
}: { src: string; size: number; rotate?: number; opacity?: number; style?: React.CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={size} height={size} draggable={false}
      style={{
        display: "block", transform: `rotate(${rotate}deg)`,
        filter: "brightness(0)", opacity, pointerEvents: "none",
        userSelect: "none", flexShrink: 0, ...style,
      }} />
  );
}

// ── Right-side scatter: 响应式布局 ─────────────────────────────────────────
function ScatterCluster() {
  return (
    <div className="relative w-full min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]" aria-hidden="false">
      {/* ── Polaroid photo frame，四角钉针效果 ── */}
      <motion.div
        initial={{ opacity: 0, y: 10, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-[180px] sm:w-48 md:w-56 lg:w-64 relative mx-auto lg:mx-0 lg:absolute lg:top-[18%] lg:left-[4%]"
        style={{
          background: "#FEFCF7",
          borderRadius: "4px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
          border: "1px solid #E0D4C0",
          padding: "8px",
          zIndex: 3,
        }}
      >
        {/* 四角钉针，响应式尺寸 */}
        <InkIcon src="/SVG/interface/pin.svg" size={20} rotate={-45} opacity={0.5}
          style={{ position: "absolute", top: -5, left: -5, zIndex: 5 }} />
        <InkIcon src="/SVG/interface/pin.svg" size={20} rotate={45} opacity={0.5}
          style={{ position: "absolute", top: -5, right: -5, zIndex: 5 }} />
        <InkIcon src="/SVG/interface/pin.svg" size={20} rotate={-135} opacity={0.5}
          style={{ position: "absolute", bottom: -5, left: -5, zIndex: 5 }} />
        <InkIcon src="/SVG/interface/pin.svg" size={20} rotate={135} opacity={0.5}
          style={{ position: "absolute", bottom: -5, right: -5, zIndex: 5 }} />
        {/* Photo area */}
        <div
          className="aspect-square w-full overflow-hidden rounded-[2px]"
          style={{ border: "1px solid #C8B89A" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/pic/portrait.jpg"
            alt="黄逸能"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

    </div>
  );
}

// ── Squiggle underline ────────────────────────────────────────────────────
function Squiggle() {
  return (
    <svg width="140" height="10" viewBox="0 0 140 10" fill="none" style={{ opacity: 0.35 }}>
      <path d="M 2 7 C 16 2, 30 9, 46 5 C 62 2, 76 9, 92 5 C 108 2, 122 9, 138 5"
        stroke="#4A6858" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 pb-10 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="grid-paper rounded-3xl overflow-hidden relative"
        style={{ border: "2px solid #C8B89A", borderTop: "8px solid #3D7A5F", minHeight: "clamp(400px, 55vh, 700px)" }}
      >
        {/* Corner accents */}
        <div className="absolute top-4 left-4 pointer-events-none" style={{ opacity: 0.12 }}>
          <InkIcon src="/SVG/misc/chip.svg" size={16} opacity={1} />
        </div>
        <div className="absolute bottom-4 right-4 pointer-events-none" style={{ opacity: 0.08 }}>
          <InkIcon src="/SVG/weather/snowflake.svg" size={14} rotate={30} opacity={1} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 p-6 sm:p-8 lg:p-14 lg:items-center">
          {/* ── Left ── */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Name — muted sage ink + skewed */}
              <div className="mb-1">
                <div style={{ display: "inline-block", transform: "skewX(-9deg)", transformOrigin: "left bottom" }}>
                  <h1
                    className="leading-none"
                    style={{
                      fontFamily: "'Ma Shan Zheng', cursive",
                      fontSize: "clamp(5rem, 10vw, 7.5rem)",
                      /* lighter, lower saturation — muted sage */
                      background: "linear-gradient(150deg, #3E5848 0%, #4C6A58 50%, #5A7A6A 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 2px 5px rgba(60,90,72,0.18))",
                      letterSpacing: "0.07em",
                    }}
                  >
                    黄逸能
                  </h1>
                </div>
                <div className="mt-1 ml-1"><Squiggle /></div>
              </div>

              <div className="text-base mb-4 mt-3 space-y-0.5"
                style={{ fontFamily: "var(--inter), sans-serif", color: "#7A7060", letterSpacing: "0.06em" }}>
                <p className="flex items-center gap-2">
                  <InkIcon src="/SVG/objects/movie-clapper.svg" size={18} rotate={-6} opacity={0.45} />
                  前影视特效师 · 动画制片
                </p>
                <p className="flex items-center gap-2">
                  <InkIcon src="/SVG/misc/bot.svg" size={18} rotate={0} opacity={0.45} />
                  现 AI 训练师
                </p>
              </div>

              <div className="text-4xl lg:text-5xl font-bold leading-tight"
                style={{ fontFamily: "var(--dm-serif), serif", color: "#1C1C1C" }}>
                <span>AI 应该让你</span><br />
                <span>感到 </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={CYCLING_WORDS[wordIndex]}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="italic"
                    style={{ color: "#3D7A5F" }}
                  >
                    {CYCLING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <p className="text-sm"
                style={{ color: "#7A7060", fontFamily: "var(--inter), sans-serif" }}>
                ISTP · 动手优先于空谈 · 摇滚在耳
              </p>
              <InkIcon src="/SVG/objects/crown.svg" size={14} rotate={5} opacity={0.35} />
            </div>
          </div>

          {/* ── Right: scatter ── */}
          <div className="w-full min-w-0 lg:min-w-[280px] lg:max-w-[320px] lg:flex-shrink-0">
            <ScatterCluster />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
