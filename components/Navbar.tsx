"use client";

import { motion } from "framer-motion";
import { useLenis } from "@/components/LenisContext";

const navLinks = [
  { label: "work", href: "#work" },
  { label: "value", href: "#about" },
  { label: "music", href: "#music" },
  { label: "connect", href: "#connect" },
];

export default function Navbar() {
  const lenis = useLenis();

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

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center gap-6 sm:gap-8 py-2.5"
    >
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
    </motion.nav>
  );
}
