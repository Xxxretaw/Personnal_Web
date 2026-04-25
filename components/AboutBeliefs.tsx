"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const legacyProjects = [
  {
    title: "三国的星空",
    subtitle: "动画电影 · 后期特效",
    link: "https://v.qq.com/x/cover/mzc00200pawrfhd/f4101qfx0vp.html",
    accent: "#3D7A5F",
  },
  {
    title: "剑来 第二季",
    subtitle: "动画剧集 · 制作统筹",
    link: "https://v.qq.com/x/cover/mzc00200xxpsogl/y4101oeqq9j.html",
    accent: "#C8763A",
  },
  {
    title: "诛仙",
    subtitle: "动画剧集 · 制作统筹",
    link: "https://v.qq.com/x/cover/mzc002003o7sldf/r4101sc41bd.html",
    accent: "#5B6FA8",
  },
];

function LegacyProjectItem({ project }: { project: typeof legacyProjects[0] }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="flex items-center rounded-xl overflow-hidden cursor-pointer select-none"
      style={{
        width: "200px",
        height: "80px",
        border: "1.5px solid #E0D4C0",
        backgroundColor: "#FEFCF7",
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      {/* Left accent bar */}
      <div
        className="h-full flex-shrink-0"
        style={{ width: "4px", backgroundColor: project.accent }}
      />
      {/* Content */}
      <div className="flex flex-col justify-center px-4 overflow-hidden">
        <p
          className="text-sm font-medium leading-tight truncate"
          style={{ fontFamily: "var(--dm-serif), serif", color: "#1C1C1C" }}
        >
          {project.title}
        </p>
        <p
          className="text-xs leading-tight truncate mt-1"
          style={{ fontFamily: "var(--inter), sans-serif", color: "#7A7060" }}
        >
          {project.subtitle}
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

        {/* ── Horizontal strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-4"
        >
          {legacyProjects.map((project) => (
            <LegacyProjectItem key={project.title} project={project} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}