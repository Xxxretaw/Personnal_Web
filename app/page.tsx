import SideColumns from "@/components/SideColumns";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkShowcase from "@/components/WorkShowcase";
import AboutBeliefs from "@/components/AboutBeliefs";
import MusicSection from "@/components/MusicSection";
import Connect from "@/components/Connect";

// CSS filter chains to tint black SVGs to site accent colors (visible but subtle)
const F_GREEN   = "brightness(0) invert(1) sepia(1) hue-rotate(104deg) saturate(0.5) brightness(0.68)";
const F_APRICOT = "brightness(0) invert(1) sepia(1) hue-rotate(-17deg) saturate(1.1) brightness(1.25)";
const F_SAGE    = "brightness(0) invert(1) sepia(1) hue-rotate(90deg) saturate(0.48) brightness(0.82)";

const BASE: React.CSSProperties = {
  position: "absolute", pointerEvents: "none", userSelect: "none",
  zIndex: 5, opacity: 0.26, draggable: false,
} as React.CSSProperties;

export default function Home() {
  return (
    <div id="top" className="relative min-h-screen flex flex-col">
      <SideColumns />

      {/* Fixed navbar */}
      <div
        className="fixed inset-x-0 top-0 z-50 w-full"
        style={{
          backgroundColor: "rgba(245, 240, 232, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(200, 184, 154, 0.35)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-14">
          <Navbar />
        </div>
      </div>

      {/* Main content */}
      <main
        className="relative z-10 flex-1 w-full"
      >
        <div className="max-w-5xl mx-auto px-6 pt-14 md:px-14">
          <Hero />
          <WorkShowcase />
          <AboutBeliefs />
          <MusicSection />
          <Connect />
        </div>
      </main>

      {/* ── Large accent icons — absolute, scroll with page, covered by content (z-5 < z-6) ── */}
      {/* Left side */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/SVG/objects/guitar.svg" alt="" aria-hidden="true" width={220}
        className="hidden md:block"
        style={{ ...BASE, top: 300, left: 56, transform: "rotate(-12deg)", transformOrigin: "left center", filter: F_GREEN }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/SVG/misc/hot-air-balloon.svg" alt="" aria-hidden="true" width={200}
        className="hidden md:block"
        style={{ ...BASE, opacity: 0.4, top: 1600, left: 56, transform: "rotate(-6deg)", transformOrigin: "left center", filter: F_APRICOT }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/SVG/objects/paint-brush.svg" alt="" aria-hidden="true" width={185}
        className="hidden md:block"
        style={{ ...BASE, top: 2900, left: 56, transform: "rotate(10deg)", transformOrigin: "left center", filter: F_SAGE }} />

      {/* Right side */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/SVG/interface/bulb.svg" alt="" aria-hidden="true" width={215}
        className="hidden md:block"
        style={{ ...BASE, top: 780, right: 56, transform: "rotate(14deg)", transformOrigin: "right center", filter: F_GREEN }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/SVG/misc/trophy.svg" alt="" aria-hidden="true" width={195}
        className="hidden md:block"
        style={{ ...BASE, opacity: 0.4, top: 2100, right: 56, transform: "rotate(-8deg)", transformOrigin: "right center", filter: F_APRICOT }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/SVG/misc/rocket.svg" alt="" aria-hidden="true" width={175}
        className="hidden md:block"
        style={{ ...BASE, top: 3500, right: 56, transform: "rotate(20deg)", transformOrigin: "right center", filter: F_SAGE }} />
    </div>
  );
}
