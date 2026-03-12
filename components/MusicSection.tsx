"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useCallback } from "react";
import { useMusic, SONGS } from "@/components/MusicContext";

// ── Vinyl with album cover (spins when playing) ────────────────────────────
function VinylWithCover({ coverSrc, isPlaying }: { coverSrc: string; isPlaying: boolean }) {
  return (
    <div className="relative flex-shrink-0 w-32 h-32 sm:w-[150px] sm:h-[150px]">
      <div className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle at 50% 50%, #333 0%, #1C1A18 100%)", filter: "blur(6px)" }} />
      <div
        className="relative z-10 w-full h-full rounded-full overflow-hidden"
        style={{
          animation: isPlaying ? "vinyl-spin 8s linear infinite" : "none",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 0 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Black vinyl disc with grooves */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <radialGradient id="vinyl-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2A2826" />
              <stop offset="100%" stopColor="#1C1A18" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="98" fill="url(#vinyl-glow)" />
          {[90, 82, 74, 66, 58, 50].map((r, i) => (
            <circle key={i} cx="100" cy="100" r={r} stroke="#252320" strokeWidth="1.2" fill="none" />
          ))}
          <circle cx="100" cy="100" r="42" fill="transparent" />
        </svg>
        {/* Center label: album cover (larger = less black vinyl) */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
          <div className="rounded-full overflow-hidden" style={{
            width: "72%", height: "72%", boxShadow: "0 0 0 2px rgba(0,0,0,0.2)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverSrc} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        {/* Spindle hole (smaller) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: "4.5%", height: "4.5%", backgroundColor: "#0a0a0a", zIndex: 3, boxShadow: "inset 0 1px 2px rgba(255,255,255,0.08)" }} />
      </div>
    </div>
  );
}

// ── Ambient overlay (colors from cover image, per song) ───────────────────
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function MusicAmbientOverlay({
  accentColor,
  accentColor2,
}: {
  accentColor: string;
  accentColor2?: string;
}) {
  const c1 = hexToRgba(accentColor, 0.2);
  const c2 = hexToRgba(accentColor2 ?? accentColor, 0.15);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      key={accentColor}
      className="fixed inset-0 z-[4] pointer-events-none select-none"
      aria-hidden="true"
      style={{ opacity: 1 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="ambient-streak"
          style={{
            background: `repeating-linear-gradient(90deg, transparent 0, transparent 96px, ${c1} 96px, ${c1} 100px, ${c2} 100px, ${c2} 104px)`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Seekable progress bar ───────────────────────────────────────────────
function formatTime(sec: number) {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function SeekBar({
  currentTime,
  duration,
  onSeek,
}: {
  currentTime: number;
  duration: number;
  onSeek: (ratio: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;

  const getRatio = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.max(0, Math.min(1, x / rect.width));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const pointerId = e.pointerId;
      el.setPointerCapture(pointerId);
      onSeek(getRatio(e.clientX));
      const move = (ev: PointerEvent) => onSeek(getRatio(ev.clientX));
      const up = () => {
        try {
          el.releasePointerCapture(pointerId);
        } catch (_) { /* may fail if pointer already released */ }
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
    },
    [getRatio, onSeek]
  );

  return (
    <div className="flex items-center gap-3">
      <span
        className="text-xs tabular-nums flex-shrink-0"
        style={{ color: "#7A7060", fontFamily: "var(--inter)", minWidth: 36 }}
      >
        {formatTime(currentTime)}
      </span>
      <div
        ref={trackRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            const step = 5;
            const delta = e.key === "ArrowRight" ? step : -step;
            const newTime = Math.max(0, Math.min(duration, currentTime + delta));
            onSeek(duration > 0 ? newTime / duration : 0);
          }
        }}
        className="flex-1 h-2 rounded-full cursor-pointer select-none relative overflow-hidden"
        style={{
          backgroundColor: "#E0D4C0",
        }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-100"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: "#3D7A5F",
          }}
        />
      </div>
      <span
        className="text-xs tabular-nums flex-shrink-0"
        style={{ color: "#7A7060", fontFamily: "var(--inter)", minWidth: 36 }}
      >
        {formatTime(duration)}
      </span>
    </div>
  );
}

// ── Play/Pause button ─────────────────────────────────────────────────────
function PlayButton({ isPlaying, onClick }: { isPlaying: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{
        width: 44, height: 44, borderRadius: "50%",
        background: "#1C1A18", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        transition: "transform 0.15s, opacity 0.15s",
        flexShrink: 0,
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
    >
      {isPlaying ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
          <rect x="3" y="2" width="4" height="12" rx="1" />
          <rect x="9" y="2" width="4" height="12" rx="1" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
          <path d="M4 2 L14 8 L4 14 Z" />
        </svg>
      )}
    </button>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────
function DoodleWave({ width = 80, color = "#E8A87C", opacity = 0.55 }: { width?: number; color?: string; opacity?: number }) {
  return (
    <svg width={width} height="12" viewBox={`0 0 ${width} 12`} fill="none" style={{ opacity }}>
      <path d={`M 2 8 C ${width * 0.14} 3, ${width * 0.3} 11, ${width * 0.48} 6 C ${width * 0.64} 2, ${width * 0.82} 10, ${width - 2} 6`}
        stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function InkIcon({ src, size, rotate = 0, opacity = 0.22, style }: {
  src: string; size: number; rotate?: number; opacity?: number; style?: React.CSSProperties;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={size} height={size} draggable={false}
      style={{ display: "block", transform: `rotate(${rotate}deg)`, filter: "brightness(0)",
        opacity, pointerEvents: "none", userSelect: "none", ...style }} />
  );
}

function MusicDoodles() {
  return (
    <div className="relative w-full h-full" style={{ minHeight: "72px" }} aria-hidden="true">
      <InkIcon src="/SVG/weather/thunderstorm.svg"    size={54} rotate={10}  opacity={0.22} style={{ position: "absolute", top: "10%", left: "20%" }} />
      <InkIcon src="/SVG/emojis/heart-eyes-emoji.svg" size={50} rotate={-8}  opacity={0.2}  style={{ position: "absolute", top: "40%", left: "42%" }} />
      <InkIcon src="/SVG/objects/anchor.svg"          size={46} rotate={15}  opacity={0.18} style={{ position: "absolute", top: "15%", left: "62%" }} />
      <InkIcon src="/SVG/objects/movie-clapper.svg"   size={54} rotate={-15} opacity={0.18} style={{ position: "absolute", top: "45%", left: "78%" }} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function MusicSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const {
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    current,
    togglePlay,
    selectSong,
    handleSeek,
  } = useMusic();

  const goPrev = () => {
    const prev = (currentIndex - 1 + SONGS.length) % SONGS.length;
    selectSong(prev);
  };
  const goNext = () => {
    const next = (currentIndex + 1) % SONGS.length;
    selectSong(next);
  };

  return (
    <section id="music" className="py-12 px-6">
      <AnimatePresence mode="wait">
        {isPlaying && (
          <MusicAmbientOverlay
            key={currentIndex}
            accentColor={current.accentColor}
            accentColor2={current.accentColor2}
          />
        )}
      </AnimatePresence>

      {/* ── Header row ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-stretch gap-6 mb-10">
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="flex-shrink-0 w-full sm:w-48">
          <div className="flex items-baseline gap-3 flex-wrap">
            <p className="text-sm tracking-widest uppercase" style={{ color: "#7A7060" }}>Music</p>
            <h2 className="text-4xl whitespace-nowrap" style={{ fontFamily: "var(--caveat), cursive", color: "#1C1C1C" }}>
              人生歌单分享
            </h2>
            <div className="mb-1"><DoodleWave width={110} color="#E8A87C" opacity={0.6} /></div>
          </div>
        </motion.div>
        <div className="flex-1"><MusicDoodles /></div>
      </div>

      {/* ── Main 2-column grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* ── Left: Vinyl + dynamic info ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}>

          {/* Vinyl + controls row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-7">
            <VinylWithCover coverSrc={current.cover} isPlaying={isPlaying} />

            {/* Song meta + play button */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div key={currentIndex}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#9A8A72", fontFamily: "var(--inter)" }}>
                    {current.genre}
                  </p>
                  <p className="font-medium leading-snug mb-1"
                    style={{ fontFamily: "var(--dm-serif), serif", color: "#1C1C1C", fontSize: "1rem" }}>
                    {current.title}
                  </p>
                  <p className="text-sm" style={{ color: "#7A7060", fontFamily: "var(--inter)" }}>
                    {current.artist}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={goPrev}
                  aria-label="上一首"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E0D4C0]/50 transition-colors hover:bg-[#E0D4C0]/80"
                  style={{ color: "#7A7060" }}
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M10 12 L4 8 L10 4 Z" />
                  </svg>
                </button>
                <PlayButton isPlaying={isPlaying} onClick={togglePlay} />
                <button
                  onClick={goNext}
                  aria-label="下一首"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E0D4C0]/50 transition-colors hover:bg-[#E0D4C0]/80"
                  style={{ color: "#7A7060" }}
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6 4 L12 8 L6 12 Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Progress bar / seekable timeline */}
          <div className="w-full max-w-md lg:max-w-lg mb-4">
            <SeekBar
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
            />
          </div>

          {/* Sticky note description */}
          <AnimatePresence mode="wait">
            <motion.div key={`note-${currentIndex}`}
              initial={{ opacity: 0, y: 10, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: -0.8 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="relative mt-2 mb-4 w-full max-w-md lg:max-w-lg">
              <div style={{
                background: "linear-gradient(165deg, #FEFCF7 0%, #F5F0E8 100%)",
                borderRadius: "6px",
                padding: "20px 22px 16px",
                boxShadow: "2px 3px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                borderLeft: "3px solid #3D7A5F",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: "-4px", left: "20px",
                  width: "40px", height: "8px", borderRadius: "1px",
                  background: "rgba(61,122,95,0.2)",
                }} />
                <p style={{
                  color: "#3A3630",
                  fontFamily: "var(--caveat), cursive",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {current.description}
                </p>
                <p style={{
                  color: "#7A7060",
                  fontFamily: "var(--caveat), cursive",
                  fontSize: "0.85rem",
                  marginTop: "10px",
                  textAlign: "right",
                }}>
                  — {current.vibe}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dynamic genre tags */}
          <AnimatePresence mode="wait">
            <motion.div key={`tags-${currentIndex}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} className="flex flex-wrap gap-2">
              {current.tags.map((tag, i) => (
                <motion.span key={tag}
                  initial={{ opacity: 0, scale: 0.8, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06, type: "spring", stiffness: 260, damping: 20 }}
                  whileHover={{
                    scale: 1.04,
                    backgroundColor: "#3D7A5F",
                    color: "#FEFCF7",
                    borderColor: "#3D7A5F",
                  }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.2 } }}
                  className="text-xs px-3 py-1 rounded-full cursor-default select-none"
                  style={{
                    backgroundColor: "#EBE5D8",
                    border: "1px solid #D4C8B0",
                    color: "#5A5048",
                    fontFamily: "var(--inter)",
                    letterSpacing: "0.03em",
                  }}>
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Right: Scrollable playlist ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}>

          <div className="flex items-center gap-2 mb-4">
            <p className="text-xs tracking-widest uppercase" style={{ color: "#7A7060", fontFamily: "var(--inter)" }}>
              播放列表
            </p>
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ opacity: 0.45 }}>
              <path d="M 2 10 C 8 8, 16 9, 22 10" stroke="#3D7A5F" strokeWidth="2" strokeLinecap="round" />
              <path d="M 18 5 C 21 8, 22 9, 22 10 C 22 11, 21 13, 18 16" stroke="#3D7A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Scrollable list */}
          <div style={{ maxHeight: "420px", overflowY: "auto", paddingRight: "6px" }}
            className="space-y-2 playlist-scroll"
            data-lenis-prevent>
            {SONGS.map((song, i) => {
              const active = i === currentIndex;
              return (
                <motion.div key={song.file}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                  onClick={() => selectSong(i)}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer select-none"
                  style={{
                    backgroundColor: active ? "#EFF7F2" : "#FEFCF7",
                    border: `1.5px solid ${active ? "#3D7A5F" : "#E0D4C0"}`,
                    transition: "all 0.18s ease",
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#A8C8B8";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#F5FBF7";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#E0D4C0";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#FEFCF7";
                    }
                  }}
                >
                  {/* Track number */}
                  <span style={{ width: 20, fontSize: "11px", color: active ? "#3D7A5F" : "#C0B0A0",
                    fontFamily: "var(--inter)", textAlign: "center", flexShrink: 0, fontWeight: active ? 600 : 400 }}>
                    {i + 1}
                  </span>

                  {/* Song cover */}
                  <div className="flex-shrink-0 overflow-hidden" style={{
                    width: 36, height: 36, borderRadius: "6px",
                    boxShadow: active ? `0 0 0 2px ${song.labelColor}60` : "0 1px 3px rgba(0,0,0,0.08)",
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={song.cover} alt="" className="w-full h-full object-cover" />
                  </div>

                  {/* Title + artist */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight truncate"
                      style={{ fontFamily: "var(--inter)", color: active ? "#1C1C1C" : "#2A2020",
                        fontWeight: active ? 600 : 400 }}>
                      {song.title}
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "#9A8A72", fontFamily: "var(--inter)" }}>
                      {song.artist}
                    </p>
                  </div>

                  {/* Genre badge */}
                  <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: active ? "#D8EFE5" : "#F0EBE1",
                      color: active ? "#2D6A50" : "#8A7A68",
                      fontFamily: "var(--inter)", fontSize: "10px", letterSpacing: "0.03em",
                    }}>
                    {song.genre}
                  </span>

                  {/* Playing indicator */}
                  {active && isPlaying && (
                    <div className="flex items-end gap-0.5 flex-shrink-0" style={{ height: 14 }}>
                      {[1, 2, 3].map((bar) => (
                        <div key={bar} style={{
                          width: 3, borderRadius: 2, backgroundColor: "#3D7A5F",
                          animation: `equalizer-bar-${bar} ${0.5 + bar * 0.15}s ease-in-out infinite alternate`,
                          height: bar === 2 ? "100%" : "60%",
                        }} />
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
