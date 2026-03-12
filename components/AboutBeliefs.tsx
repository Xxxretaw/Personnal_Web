"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { assetUrl } from "@/lib/assets";

// ── Ink icon helper (shared pattern) ──────────────────────────────────────
function InkIcon({
  src, size, rotate = 0, opacity = 0.28,
  style,
}: { src: string; size: number; rotate?: number; opacity?: number; style?: React.CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={assetUrl(src)} alt="" width={size} height={size} draggable={false}
      style={{ display: "block", transform: `rotate(${rotate}deg)`, filter: "brightness(0)",
        opacity, pointerEvents: "none", userSelect: "none", ...style }} />
  );
}

// ── About doodles — small icons only (large ones are in sidebars) ─────────
function AboutDoodles() {
  return (
    <div className="relative w-full h-full" style={{ minHeight: "72px" }} aria-hidden="true">
      <InkIcon src="/SVG/misc/rocket.svg"    size={54} rotate={28}  opacity={0.22} style={{ position:"absolute", top:"10%", left:"18%"  }} />
      <InkIcon src="/SVG/misc/chip.svg"      size={50} rotate={0}   opacity={0.2}  style={{ position:"absolute", top:"45%", left:"38%"  }} />
      <InkIcon src="/SVG/misc/fire.svg"      size={46} rotate={5}   opacity={0.2}  style={{ position:"absolute", top:"15%", left:"56%"  }} />
      <InkIcon src="/SVG/misc/satellite.svg" size={54} rotate={-18} opacity={0.18} style={{ position:"absolute", top:"50%", left:"70%"  }} />
      <InkIcon src="/SVG/objects/crown.svg"  size={46} rotate={20}  opacity={0.18} style={{ position:"absolute", top:"8%",  left:"82%"  }} />
    </div>
  );
}

// ── Belief cards ──────────────────────────────────────────────────────────────
const BELIEFS = [
  {
    rotate: -2,
    title: "AI 应该服务于人",
    body: "技术的终点是让人更自由，而不是更依赖。好的 AI 系统应该增强人的能力，而不是取代人的判断。",
    color: "#FAF7EE",
    borderColor: "#D4C4A8",
  },
  {
    rotate: 1.5,
    title: "数据质量决定上限",
    body: "再强大的模型，也无法从垃圾数据中学到好知识。训练数据的质量是整个 AI 系统的天花板。",
    color: "#F5F0E8",
    borderColor: "#C8B89A",
  },
  {
    rotate: -1,
    title: "持续迭代，保持谦逊",
    body: "没有完美的模型，只有不断改进的过程。每一轮反馈都是一次学习机会，保持开放和好奇。",
    color: "#EFF7F2",
    borderColor: "#A8C8B8",
  },
];

function BeliefCard({ belief, index }: { belief: (typeof BELIEFS)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotate: belief.rotate }}
      animate={isInView ? { opacity: 1, y: 0, rotate: belief.rotate } : {}}
      whileHover={{ rotate: 0, scale: 1.03, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="lined-paper rounded-sm p-6 cursor-pointer"
      style={{
        backgroundColor: belief.color,
        border: `1px solid ${belief.borderColor}`,
        boxShadow: "2px 4px 12px rgba(0,0,0,0.08)",
        transformOrigin: "top center",
      }}
    >
      <h3 className="text-xl mb-3"
        style={{ fontFamily: "var(--caveat), cursive", color: "#1C1C1C", fontSize: "1.4rem" }}>
        {belief.title}
      </h3>
      <p className="text-sm leading-relaxed"
        style={{ color: "#5A5A5A", fontFamily: "var(--inter), sans-serif" }}>
        {belief.body}
      </p>
    </motion.div>
  );
}

export default function AboutBeliefs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section id="about" className="py-12 overflow-hidden">
      <div className="px-6">

        {/* ── Header row: label+title left, doodles right ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-stretch gap-6 mb-10">
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 w-full sm:w-56"
          >
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-sm tracking-widest uppercase" style={{ color: "#7A7060" }}>
                Values
              </p>
              <h2 className="text-4xl whitespace-nowrap"
                style={{ fontFamily: "var(--caveat), cursive", color: "#1C1C1C" }}>
                我深信的几件事
              </h2>
            </div>
          </motion.div>

          {/* Doodle fill area */}
          <div className="flex-1">
            <AboutDoodles />
          </div>
        </div>

        {/* ── Belief cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BELIEFS.map((belief, i) => (
            <BeliefCard key={i} belief={belief} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
