"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "三国的星空",
    subtitle: "动画电影 · 后期特效",
    description:
      "参与动画电影《三国的星空》后期特效制作，负责镜头级特效合成与视觉增效，将传统三国叙事融入星空奇幻美学，打造沉浸式大银幕体验。",
    tags: ["影视特效", "合成", "动画电影", "后期制作"],
    accent: "#3D7A5F",
    bgColor: "#E8F5EE",
    image: "/project/三国的星空.jpg",
    link: "https://v.qq.com/x/cover/mzc00200pawrfhd/f4101qfx0vp.html",
  },
  {
    id: 2,
    title: "剑来 第二季",
    subtitle: "动画剧集 · 制作统筹",
    description:
      "担任国漫《剑来》第二季制片，负责全流程制作跟进与多部门统筹协调，确保高强度排期下各环节高质量交付。",
    tags: ["动画制片", "制作管理", "统筹协调", "国漫"],
    accent: "#C8763A",
    bgColor: "#FDF3E8",
    image: "/project/剑来.jpg",
    link: "https://v.qq.com/x/cover/mzc00200xxpsogl/y4101oeqq9j.html",
  },
  {
    id: 3,
    title: "诛仙",
    subtitle: "动画剧集 · 制作统筹",
    description:
      "参与仙侠动画《诛仙》制作统筹工作，横向协调原画、动效、后期各环节进度，把控整体节奏与质量标准，推动项目按时交付。",
    tags: ["动画制片", "项目管理", "统筹协调", "仙侠"],
    accent: "#5B6FA8",
    bgColor: "#EBF1FB",
    image: "/project/诛仙.jpg",
    link: "https://v.qq.com/x/cover/mzc002003o7sldf/r4101sc41bd.html",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="rounded-2xl overflow-hidden cursor-pointer block"
      style={{
        border: "2px solid #C8B89A",
        backgroundColor: "#FEFCF7",
        textDecoration: "none",
      }}
    >
      {/* Colored top strip */}
      <div className="h-2 w-full" style={{ backgroundColor: project.accent }} />

      {/* Image area */}
      <div className="relative overflow-hidden aspect-[4/3] sm:aspect-video" style={{ backgroundColor: project.bgColor }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)" }} />
        {/* Subtitle badge */}
        <span className="absolute bottom-3 left-3 text-xs px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.88)",
            color: project.accent,
            fontFamily: "var(--inter)",
            fontSize: "10px",
            letterSpacing: "0.04em",
            border: `1px solid ${project.accent}40`,
          }}>
          {project.subtitle}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-xl font-semibold mb-2 flex items-center gap-2"
          style={{ fontFamily: "var(--dm-serif), serif", color: "#1C1C1C" }}
        >
          {project.title}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#7A7060" }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full"
              style={{
                backgroundColor: project.bgColor,
                color: project.accent,
                border: `1px solid ${project.accent}40`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function WorkShowcase() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="px-6 py-12">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="text-sm mb-2 tracking-widest uppercase" style={{ color: "#7A7060" }}>
          Selected Work
        </p>
        <h2 className="text-4xl" style={{ fontFamily: "var(--caveat), cursive", color: "#1C1C1C" }}>
          我做过的事
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
