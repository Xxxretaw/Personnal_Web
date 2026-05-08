"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import { useMusic, type PlayMode } from "@/components/MusicContext";

// ── Vinyl with album cover (spins when playing) ────────────────────────────
function VinylWithCover({ coverSrc, isPlaying }: { coverSrc: string; isPlaying: boolean }) {
  return (
    <div className="relative flex-shrink-0 w-44 h-44 sm:w-52 sm:h-52">
      <div className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle at 50% 50%, #333 0%, #1C1A18 100%)", filter: "blur(6px)" }} />
      <div
        className="relative z-10 w-full h-full rounded-full overflow-hidden"
        style={{
          animation: isPlaying ? "vinyl-spin 8s linear infinite" : "none",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 0 60px rgba(0,0,0,0.3)",
        }}
      >
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
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
          <div className="rounded-full overflow-hidden" style={{
            width: "72%", height: "72%", boxShadow: "0 0 0 2px rgba(0,0,0,0.2)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverSrc} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
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
        style={{ backgroundColor: "#E0D4C0" }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-100"
          style={{ width: `${progress * 100}%`, backgroundColor: "#3D7A5F" }}
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

// ── Play mode toggle ─────────────────────────────────────────────────────
function PlayModeButton({ mode, onChange }: { mode: PlayMode; onChange: (m: PlayMode) => void }) {
  const next = mode === "sequential" ? "shuffle" : "sequential";
  const label = mode === "sequential" ? "顺序播放" : "随机播放";
  return (
    <button
      onClick={() => onChange(next)}
      aria-label={label}
      title={label}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors"
      style={{
        backgroundColor: mode === "shuffle" ? "#EFF7F2" : "#F5F0E8",
        color: mode === "shuffle" ? "#3D7A5F" : "#7A7060",
        border: `1px solid ${mode === "shuffle" ? "#3D7A5F" : "#E0D4C0"}`,
        fontFamily: "var(--inter)",
      }}
    >
      {mode === "sequential" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M17 3L21 7L17 11" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <path d="M7 21L3 17L7 13" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M16 3h5v5" /><path d="M4 20L21 3" />
          <path d="M21 16v5h-5" /><path d="M15 15l6 6" /><path d="M4 4l5 5" />
        </svg>
      )}
      {label}
    </button>
  );
}

// ── Prev / Next buttons ──────────────────────────────────────────────────
function SkipButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "上一首" : "下一首"}
      className="w-10 h-10 flex items-center justify-center rounded-full transition-all"
      style={{
        color: "#5A5248",
        backgroundColor: "rgba(224,212,192,0.35)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = "rgba(224,212,192,0.7)";
        e.currentTarget.style.transform = "scale(1.08)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = "rgba(224,212,192,0.35)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {direction === "prev" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="5" width="2.5" height="14" rx="1" />
          <path d="M18 5.5 L9 12 L18 18.5 Z" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <rect x="17.5" y="5" width="2.5" height="14" rx="1" />
          <path d="M6 5.5 L15 12 L6 18.5 Z" />
        </svg>
      )}
    </button>
  );
}

// ── Play/Pause button ─────────────────────────────────────────────────────
function PlayButton({ isPlaying, onClick, size = 48 }: { isPlaying: boolean; onClick: () => void; size?: number }) {
  return (
    <button onClick={onClick}
      style={{
        width: size, height: size, borderRadius: "50%",
        background: "#3D7A5F", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 12px rgba(61,122,95,0.3)",
        transition: "transform 0.15s, opacity 0.15s",
        flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.05)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
    >
      {isPlaying ? (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
          <rect x="3" y="2" width="4" height="12" rx="1" />
          <rect x="9" y="2" width="4" height="12" rx="1" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
          <path d="M4 2 L14 8 L4 14 Z" />
        </svg>
      )}
    </button>
  );
}

// ── Doodle wave ───────────────────────────────────────────────────────────
function DoodleWave({ width = 80, color = "#E8A87C", opacity = 0.55 }: { width?: number; color?: string; opacity?: number }) {
  return (
    <svg width={width} height="12" viewBox={`0 0 ${width} 12`} fill="none" style={{ opacity }}>
      <path d={`M 2 8 C ${width * 0.14} 3, ${width * 0.3} 11, ${width * 0.48} 6 C ${width * 0.64} 2, ${width * 0.82} 10, ${width - 2} 6`}
        stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function MusicSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(el);

    const fallback = setTimeout(() => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setVisible(true);
        observer.disconnect();
      }
    }, 1200);

    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, []);

  const {
    songs,
    loading,
    error,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    current,
    playMode,
    setPlayMode,
    togglePlay,
    selectSong,
    handleSeek,
  } = useMusic();

  const goPrev = () => {
    if (songs.length === 0) return;
    if (playMode === "shuffle") {
      const rand = Math.floor(Math.random() * songs.length);
      selectSong(rand === currentIndex && songs.length > 1 ? (rand + 1) % songs.length : rand);
    } else {
      selectSong((currentIndex - 1 + songs.length) % songs.length);
    }
  };
  const goNext = () => {
    if (songs.length === 0) return;
    if (playMode === "shuffle") {
      const rand = Math.floor(Math.random() * songs.length);
      selectSong(rand === currentIndex && songs.length > 1 ? (rand + 1) % songs.length : rand);
    } else {
      selectSong((currentIndex + 1) % songs.length);
    }
  };

  if (loading) {
    return (
      <section id="music" ref={sectionRef} className="py-16 px-6">
        <p style={{ color: "#7A7060", fontFamily: "var(--inter)", textAlign: "center" }}>
          正在加载歌单...
        </p>
      </section>
    );
  }

  if (error || !current) {
    return (
      <section id="music" ref={sectionRef} className="py-16 px-6">
        <p style={{ color: "#C44A4A", fontFamily: "var(--inter)", textAlign: "center" }}>
          歌单加载失败：{error}
        </p>
      </section>
    );
  }

  return (
    <section
      id="music"
      ref={sectionRef}
      className="py-16 px-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-baseline gap-3 flex-wrap mb-10">
        <p className="text-sm tracking-widest uppercase" style={{ color: "#7A7060" }}>Music</p>
        <h2 className="text-4xl whitespace-nowrap" style={{ fontFamily: "var(--caveat), cursive", color: "#1C1C1C" }}>
          人生歌单分享
        </h2>
        <div className="mb-1"><DoodleWave width={110} color="#E8A87C" opacity={0.6} /></div>
      </div>

      {/* ── Two-column: player left + playlist right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-start">

        {/* ── Left: Player card ── */}
        <div
          className="rounded-2xl p-6 flex flex-col"
          style={{
            background: "linear-gradient(135deg, #FEFCF7 0%, #F5F0E8 100%)",
            border: "1px solid #E0D4C0",
            boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex flex-col items-center flex-1 justify-center">
            <VinylWithCover coverSrc={current.pic} isPlaying={isPlaying} />

            <div className="mt-5 text-center w-full">
              <AnimatePresence mode="wait">
                <motion.div key={currentIndex}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#9A8A72", fontFamily: "var(--inter)" }}>
                    {current.album}
                  </p>
                  <p className="text-lg font-medium leading-snug mb-1"
                    style={{ fontFamily: "var(--dm-serif), serif", color: "#1C1C1C" }}>
                    {current.name}
                  </p>
                  <p className="text-sm" style={{ color: "#7A7060", fontFamily: "var(--inter)" }}>
                    {current.artist}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="mt-5 flex items-center justify-center gap-3">
                <SkipButton direction="prev" onClick={goPrev} />
                <PlayButton isPlaying={isPlaying} onClick={togglePlay} />
                <SkipButton direction="next" onClick={goNext} />
                <div className="ml-1">
                  <PlayModeButton mode={playMode} onChange={setPlayMode} />
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 w-full max-w-sm mx-auto">
                <SeekBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Playlist ── */}
        <div
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            border: "1px solid #E0D4C0",
            background: "#FEFCF7",
            maxHeight: "min(600px, 70vh)",
          }}
        >
          <div className="flex items-center px-5 py-3 flex-shrink-0"
            style={{ borderBottom: "1px solid #E0D4C0", background: "#F5F0E8" }}>
            <p className="text-xs tracking-widest uppercase font-medium" style={{ color: "#7A7060", fontFamily: "var(--inter)" }}>
              播放列表
            </p>
          </div>

          <div style={{ overflowY: "auto", padding: "6px" }}
            className="playlist-scroll flex-1 min-h-0"
            data-lenis-prevent>
            {songs.map((song, i) => {
              const active = i === currentIndex;
              return (
                <div key={`${song.id}-${i}`}
                  onClick={() => selectSong(i)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer select-none"
                  style={{
                    backgroundColor: active ? "#EFF7F2" : "transparent",
                    transition: "background-color 0.15s ease",
                  }}
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "#F5F0E8";
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  <span style={{ width: 24, fontSize: "11px", color: active ? "#3D7A5F" : "#C0B0A0",
                    fontFamily: "var(--inter)", textAlign: "right", flexShrink: 0, fontWeight: active ? 600 : 400 }}>
                    {active && isPlaying ? (
                      <span className="flex items-end justify-end gap-px" style={{ height: 14 }}>
                        {[1, 2, 3].map((bar) => (
                          <span key={bar} style={{
                            display: "inline-block", width: 3, borderRadius: 2, backgroundColor: "#3D7A5F",
                            animation: `equalizer-bar-${bar} ${0.5 + bar * 0.15}s ease-in-out infinite alternate`,
                            height: bar === 2 ? "100%" : "60%",
                          }} />
                        ))}
                      </span>
                    ) : (
                      i + 1
                    )}
                  </span>

                  <div className="flex-shrink-0 overflow-hidden" style={{
                    width: 32, height: 32, borderRadius: "5px",
                    boxShadow: active ? "0 0 0 1.5px rgba(61,122,95,0.4)" : "0 1px 2px rgba(0,0,0,0.06)",
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={song.pic} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-tight truncate"
                      style={{ fontFamily: "var(--inter)", color: active ? "#3D7A5F" : "#2A2020",
                        fontWeight: active ? 600 : 400 }}>
                      {song.name}
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "#9A8A72", fontFamily: "var(--inter)" }}>
                      {song.artist}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
