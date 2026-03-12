"use client";

import { motion } from "framer-motion";
import { useLenis } from "@/components/LenisContext";
import { useMusic, SONGS } from "@/components/MusicContext";

const navLinks = [
  { label: "work", href: "#work" },
  { label: "value", href: "#about" },
  { label: "music", href: "#music" },
  { label: "connect", href: "#connect" },
];

export default function Navbar() {
  const lenis = useLenis();
  const { current, currentIndex, isPlaying, togglePlay, selectSong } = useMusic();

  const scrollTo = (target: string | number) => {
    if (lenis) {
      lenis.scrollTo(target, { programmatic: true });
    } else {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const goPrev = () => {
    const prev = (currentIndex - 1 + SONGS.length) % SONGS.length;
    selectSong(prev);
  };
  const goNext = () => {
    const next = (currentIndex + 1) % SONGS.length;
    selectSong(next);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-between gap-4 sm:gap-6 py-2.5"
    >
      <div className="flex items-center gap-6 sm:gap-8">
        {/* Logo / Brand mark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollTo(0);
          }}
          className="text-xl flex items-center justify-center w-8 h-8 rounded-full border-2 flex-shrink-0"
          style={{
            borderColor: "#3D7A5F",
            color: "#3D7A5F",
            fontFamily: "var(--dm-serif), serif",
          }}
          aria-label="回到顶部"
        >
          ✦
        </a>

        {/* Nav links */}
        <div className="flex items-center gap-4 sm:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="text-xs sm:text-sm font-medium tracking-wider transition-colors duration-200"
              style={{
                color: "#7A7060",
                fontFamily: "var(--inter), sans-serif",
                letterSpacing: "0.06em",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#1C1C1C")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#7A7060")
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mini player */}
      <div
        className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-[#E0D4C0] min-w-0"
        style={{ flexShrink: 0 }}
      >
        <a
          href="#music"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#music");
          }}
          className="flex items-center gap-2 min-w-0 flex-1 sm:flex-initial"
        >
          {/* Cover */}
          <div className="flex-shrink-0 w-8 h-8 rounded overflow-hidden shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.cover} alt="" className="w-full h-full object-cover" />
          </div>
          {/* Title + artist (hidden on very small screens) */}
          <div className="hidden sm:block min-w-0 max-w-[120px] md:max-w-[160px]">
            <p className="text-xs font-medium truncate" style={{ color: "#1C1C1C", fontFamily: "var(--inter)" }}>
              {current.title}
            </p>
            <p className="text-[10px] truncate" style={{ color: "#7A7060", fontFamily: "var(--inter)" }}>
              {current.artist}
            </p>
          </div>
        </a>
        {/* Controls */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button
            onClick={goPrev}
            aria-label="上一首"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E0D4C0]/50 transition-colors hover:bg-[#E0D4C0]/80"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#7A7060">
              <path d="M10 12 L4 8 L10 4 Z" />
            </svg>
          </button>
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "暂停" : "播放"}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#3D7A5F] text-white transition-opacity hover:opacity-90"
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <rect x="4" y="3" width="3" height="10" rx="1" />
                <rect x="9" y="3" width="3" height="10" rx="1" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 3 L13 8 L5 13 Z" />
              </svg>
            )}
          </button>
          <button
            onClick={goNext}
            aria-label="下一首"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E0D4C0]/50 transition-colors hover:bg-[#E0D4C0]/80"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#7A7060">
              <path d="M6 4 L12 8 L6 12 Z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
