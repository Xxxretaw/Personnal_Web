"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { assetUrl } from "@/lib/assets";

const legacyProjects = [
  {
    title: "三国的星空",
    subtitle: "动画电影 · 后期特效",
    description: "参与动画电影后期特效合成，将传统三国叙事融入星空奇幻美学。",
    link: "https://v.qq.com/x/cover/mzc00200pawrfhd/f4101qfx0vp.html",
    accent: "#3D7A5F",
    bgColor: "#E8F5EE",
    image: "/project/三国的星空.jpg",
  },
  {
    title: "剑来 第二季",
    subtitle: "动画剧集 · 制作统筹",
    description: "担任制片，负责全流程制作跟进与多部门统筹协调，推动高质量交付。",
    link: "https://v.qq.com/x/cover/mzc00200xxpsogl/y4101oeqq9j.html",
    accent: "#C8763A",
    bgColor: "#FDF3E8",
    image: "/project/剑来.jpg",
  },
  {
    title: "诛仙",
    subtitle: "动画剧集 · 制作统筹",
    description: "横向协调原画、动效、后期各环节进度，把控整体节奏与质量标准。",
    link: "https://v.qq.com/x/cover/mzc002003o7sldf/r4101sc41bd.html",
    accent: "#5B6FA8",
    bgColor: "#EBF1FB",
    image: "/project/诛仙.jpg",
  },
];

function LegacyProjectCard({ project }: { project: typeof legacyProjects[0] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-xl overflow-hidden cursor-pointer block"
      style={{
        border: "1.5px solid #E0D4C0",
        backgroundColor: "#FEFCF7",
        textDecoration: "none",
      }}
    >
      {/* Top image area */}
      <div className="relative overflow-hidden" style={{ height: "160px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetUrl(project.image)}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
        {/* Subtle bottom gradient for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.12) 0%, transparent 50%)",
          }}
        />
        {/* Colored top strip */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: "3px", backgroundColor: project.accent }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="text-base font-semibold mb-1"
          style={{ fontFamily: "var(--dm-serif), serif", color: "#1C1C1C" }}
        >
          {project.title}
        </h3>
        <p
          className="text-xs mb-2"
          style={{ fontFamily: "var(--inter), sans-serif", color: project.accent }}
        >
          {project.subtitle}
        </p>
        <p
          className="text-xs leading-relaxed"
          style={{ fontFamily: "var(--inter), sans-serif", color: "#7A7060" }}
        >
          {project.description}
        </p>
      </div>
    </motion.a>
  );
}

export default function AboutBeliefs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section id="about" className="py-12 overflow-hidden">
      <div className="px-6">

        {/* ── Title ── */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2
            className="text-4xl"
            style={{ fontFamily: "var(--caveat), cursive", color: "#1C1C1C" }}
          >
            过往作品
          </h2>
        </motion.div>

        {/* ── 3-column card grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {legacyProjects.map((project) => (
            <LegacyProjectCard key={project.title} project={project} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
