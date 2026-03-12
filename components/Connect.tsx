"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const EMAIL = "1005526552@qq.com";

// ── Icon definitions ──────────────────────────────────────────────────────
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// 小红书 simplified book logo
const XiaohongshuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="2" width="13" height="18" rx="2" />
    <rect x="6" y="20" width="9" height="2" rx="1" />
    <path d="M7.5 7.5h7M7.5 11h7M7.5 14.5h4.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    <circle cx="16.5" cy="5" r="3.5" fill="#FF2442" />
    <text x="16.5" y="6.5" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" fontFamily="sans-serif">R</text>
  </svg>
);

// Bilibili classic mascot silhouette
const BilibiliIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    {/* Left antenna */}
    <path d="M7.5 3 L5.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Right antenna */}
    <path d="M16.5 3 L18.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Head/body */}
    <rect x="3" y="6" width="18" height="13" rx="4" />
    {/* Eyes */}
    <circle cx="9" cy="13" r="2" fill="white" />
    <circle cx="15" cy="13" r="2" fill="white" />
    <circle cx="9.6" cy="13.4" r="1" fill="currentColor" />
    <circle cx="15.6" cy="13.4" r="1" fill="currentColor" />
  </svg>
);

// ── Email popover card ────────────────────────────────────────────────────
function EmailPopover({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="absolute left-1/2 z-50"
      style={{
        transform: "translateX(-50%)",
        top: "calc(100% + 10px)",
        background: "#FEFCF7",
        border: "1.5px solid #C8B89A",
        borderRadius: "14px",
        boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
        padding: "16px 20px",
        minWidth: "240px",
        textAlign: "left",
      }}
    >
      {/* Arrow */}
      <div style={{
        position: "absolute", top: "-7px", left: "50%", transform: "translateX(-50%)",
        width: 0, height: 0,
        borderLeft: "7px solid transparent", borderRight: "7px solid transparent",
        borderBottom: "7px solid #C8B89A",
      }} />
      <div style={{
        position: "absolute", top: "-5.5px", left: "50%", transform: "translateX(-50%)",
        width: 0, height: 0,
        borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
        borderBottom: "6px solid #FEFCF7",
      }} />

      <p style={{ fontSize: "11px", color: "#9A8A72", marginBottom: "6px", letterSpacing: "0.06em", fontFamily: "var(--inter)" }}>
        邮件地址
      </p>
      <div className="flex items-center justify-between gap-3">
        <span style={{ fontSize: "14px", color: "#1C1C1C", fontFamily: "var(--inter)", fontWeight: 500 }}>
          {EMAIL}
        </span>
        <button
          onClick={handleCopy}
          style={{
            padding: "4px 10px",
            borderRadius: "8px",
            border: "1px solid #C8B89A",
            background: copied ? "#EFF7F2" : "#F5F0E8",
            color: copied ? "#3D7A5F" : "#5A5048",
            fontSize: "12px",
            cursor: "pointer",
            fontFamily: "var(--inter)",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {copied ? "已复制 ✓" : "复制"}
        </button>
      </div>
    </motion.div>
  );
}

// ── Social button ─────────────────────────────────────────────────────────
const SOCIALS = [
  {
    key: "email",
    label: "Email",
    icon: <EmailIcon />,
    href: null, // handled separately
  },
  {
    key: "github",
    label: "GitHub",
    icon: <GitHubIcon />,
    href: "https://github.com/Xxxretaw",
  },
  {
    key: "xiaohongshu",
    label: "小红书",
    icon: <XiaohongshuIcon />,
    href: "https://www.xiaohongshu.com/user/profile/6153b9e60000000002018825",
  },
  {
    key: "bilibili",
    label: "哔哩哔哩",
    icon: <BilibiliIcon />,
    href: "https://space.bilibili.com/323570207",
  },
] as const;

export default function Connect() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [emailOpen, setEmailOpen] = useState(false);

  return (
    <section id="connect" className="px-6 py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="rounded-3xl p-10 lg:p-16 text-center"
        style={{
          backgroundColor: "#FEFCF7",
          border: "2px solid #C8B89A",
          borderBottom: "6px solid #3D7A5F",
        }}
      >
        <p className="text-sm tracking-widest uppercase mb-4" style={{ color: "#7A7060" }}>
          Say Hello
        </p>

        <h2 className="text-5xl lg:text-6xl mb-4"
          style={{ fontFamily: "var(--caveat), cursive", color: "#1C1C1C" }}>
          一起聊聊？
        </h2>

        <p className="text-base max-w-md mx-auto mb-10 leading-relaxed" style={{ color: "#7A7060" }}>
          无论是项目合作、技术交流，还是只是打个招呼，我都很乐意和你聊聊。
        </p>

        {/* Social buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {SOCIALS.map((social) => {
            if (social.key === "email") {
              return (
                <div key="email" className="relative">
                  <motion.button
                    onClick={() => setEmailOpen((v) => !v)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: emailOpen ? "#EFF7F2" : "#F5F0E8",
                      border: `1.5px solid ${emailOpen ? "#3D7A5F" : "#C8B89A"}`,
                      color: "#1C1C1C",
                      fontFamily: "var(--inter), sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ color: "#3D7A5F" }}><EmailIcon /></span>
                    Email
                    <span style={{ fontSize: "10px", color: "#9A8A72", marginLeft: "-2px" }}>
                      {emailOpen ? "▲" : "▼"}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {emailOpen && (
                      <>
                        {/* Backdrop to close */}
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setEmailOpen(false)}
                        />
                        <EmailPopover onClose={() => setEmailOpen(false)} />
                      </>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <motion.a
                key={social.key}
                href={social.href!}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "#F5F0E8",
                  border: "1.5px solid #C8B89A",
                  color: "#1C1C1C",
                  fontFamily: "var(--inter), sans-serif",
                  textDecoration: "none",
                }}
              >
                <span style={{ color: "#3D7A5F" }}>{social.icon}</span>
                {social.label}
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      <div className="text-center mt-12">
        <p className="text-xs" style={{ color: "#C8B89A", fontFamily: "var(--inter), sans-serif" }}>
          Built with Next.js & Tailwind CSS · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
