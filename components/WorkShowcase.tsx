"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { assetUrl } from "@/lib/assets";

const projects = [
  {
    id: 1,
    title: "obs2feishu",
    subtitle: "Obsidian 插件",
    description:
      "Obsidian 是我私人的第二大脑，但当我想把这些笔记分享到飞书时，发现图片链接失效、Callout 样式丢失——格式迁移的摩擦让我干脆放弃了分享。\n\n于是我把这个流程做成了 Obsidian 内置插件：一键导出原生 HTML，图片 Base64 内嵌、Callout 原样保留，复制进飞书编辑器就是干净的一份文档。",
    tags: ["Obsidian", "HTML 导出", "知识管理", "飞书"],
    accent: "#3D7A5F",
    bgColor: "#E8F5EE",
    image: null,
    link: "https://github.com/Xxxretaw/obs2feishu",
  },
  {
    id: 2,
    title: "TodoList",
    subtitle: "桌面工具",
    description:
      "太多事情稍纵即逝，等我打开备忘录再打字，它早就被新的念头覆盖了。\n\nWin+H 唤出、打字、回车——手不需要离开键盘，也不需要\"关闭\"这个动作，点击窗口外任意位置自动最小化。数据完全本地，没有任何网络请求。",
    tags: ["PyQt6", "全局热键", "艾森豪威尔矩阵", "本地存储"],
    accent: "#C8763A",
    bgColor: "#FDF3E8",
    image: null,
    link: "https://github.com/Xxxretaw/TodoList",
  },
  {
    id: 3,
    title: "HSV 色彩识别",
    subtitle: "图像标注辅助",
    description:
      "人工判断色调容易受主观干扰，尤其是在大量图像标注工作中，标准不一会导致质量不稳定。\n\n通过 HSV 直方图分析，将图像的色彩分布量化输出，保证判断的一致性和可重复性。",
    tags: ["HSV", "图像处理", "色彩分析", "Python"],
    accent: "#5B6FA8",
    bgColor: "#EBF1FB",
    image: null,
    link: "https://github.com/Xxxretaw",
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
        {project.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetUrl(project.image)}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Subtle overlay for readability */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)" }} />
          </>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: project.bgColor }}
          >
            {/* Code bracket SVG icon */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={project.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
        )}
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
        <div className="text-sm leading-relaxed mb-4" style={{ color: "#7A7060" }}>
          {project.description.split('\n\n').map((para, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>{para}</p>
          ))}
        </div>
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
