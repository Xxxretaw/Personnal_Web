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
    icon: "/SVG/interface/note.svg",
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
    icon: "/SVG/interface/checklist.svg",
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
    icon: "/SVG/objects/paint-bucket.svg",
    link: "https://github.com/Xxxretaw/Pic_HSV",
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="rounded-xl overflow-hidden cursor-pointer block"
      style={{
        border: "1.5px solid #E0D4C0",
        backgroundColor: "#FEFCF7",
        textDecoration: "none",
      }}
    >
      {/* Top accent bar — 6px */}
      <div style={{ height: "6px", backgroundColor: project.accent }} />

      {/* Content */}
      <div className="px-5 pt-3 pb-4">

        {/* Subtitle badge */}
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${project.accent}18`,
            color: project.accent,
            fontFamily: "var(--inter)",
            fontSize: "10px",
            letterSpacing: "0.04em",
            border: `1px solid ${project.accent}30`,
            display: "inline-block",
          }}
        >
          {project.subtitle}
        </span>

        {/* Title + icon */}
        <h3
          className="text-xl font-semibold flex items-center gap-2 mt-1"
          style={{ fontFamily: "var(--dm-serif), serif", color: "#1C1C1C" }}
        >
          <img
            src={assetUrl(project.icon!)}
            alt=""
            className="w-5 h-5 object-contain flex-shrink-0"
            style={{ opacity: 0.55, filter: "brightness(0)" }}
          />
          {project.title}
        </h3>

        {/* Description */}
        <div className="text-sm leading-relaxed mt-2" style={{ color: "#7A7060" }}>
          {project.description.split('\n\n').map((para, i) => (
            <p key={i} className={i > 0 ? "mt-1" : ""}>{para}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${project.accent}12`,
                color: project.accent,
                border: `1px solid ${project.accent}30`,
                fontFamily: "var(--inter)",
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

      <div className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
