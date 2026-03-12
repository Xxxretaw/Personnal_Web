"use client";

// ── Left column icons (base set, rendered 3x for seamless loop) ──────────
const ICONS_LEFT_BASE = [
  { src: "/SVG/objects/guitar.svg",       label: "guitar",   size: 32, rotate: -12 },
  { src: "/SVG/misc/rocket.svg",          label: "rocket",   size: 28, rotate: 20  },
  { src: "/SVG/misc/coffee-cup-1.svg",    label: "coffee",   size: 28, rotate: -8  },
  { src: "/SVG/objects/crown.svg",        label: "crown",    size: 30, rotate: 6   },
  { src: "/SVG/misc/hot-air-balloon.svg", label: "balloon",  size: 28, rotate: -4  },
  { src: "/SVG/misc/fire.svg",            label: "fire",     size: 26, rotate: 0   },
  { src: "/SVG/objects/balloon.svg",      label: "balloon2", size: 26, rotate: 10  },
  { src: "/SVG/objects/paint-brush.svg",  label: "brush",    size: 32, rotate: -15 },
  { src: "/SVG/misc/bot.svg",             label: "bot",      size: 28, rotate: 0   },
  { src: "/SVG/misc/chip.svg",            label: "chip",     size: 28, rotate: 0   },
  { src: "/SVG/emojis/cool-emoji.svg",    label: "cool",     size: 30, rotate: 5   },
  { src: "/SVG/weather/sunny.svg",        label: "sunny",    size: 28, rotate: 15  },
];
const ICONS_LEFT = [...ICONS_LEFT_BASE, ...ICONS_LEFT_BASE, ...ICONS_LEFT_BASE].map((icon, i) => ({
  ...icon,
  label: `${icon.label}-${i}`,
}));

// ── Right column icons (base set, rendered 3x for seamless loop) ───────────
const ICONS_RIGHT_BASE = [
  { src: "/SVG/misc/trophy.svg",              label: "trophy",     size: 28, rotate: 5   },
  { src: "/SVG/interface/bulb.svg",           label: "bulb",       size: 28, rotate: -5  },
  { src: "/SVG/objects/anchor.svg",           label: "anchor",     size: 30, rotate: 10  },
  { src: "/SVG/weather/thunderstorm.svg",     label: "storm",      size: 28, rotate: -8  },
  { src: "/SVG/objects/movie-clapper.svg",    label: "clapper",    size: 30, rotate: 8   },
  { src: "/SVG/emojis/heart-eyes-emoji.svg",  label: "heartEyes",  size: 30, rotate: -5  },
  { src: "/SVG/misc/satellite.svg",           label: "satellite",  size: 28, rotate: 20  },
  { src: "/SVG/misc/plane.svg",               label: "plane",      size: 28, rotate: -20 },
  { src: "/SVG/interface/bookmark.svg",       label: "bookmark",   size: 26, rotate: 0   },
  { src: "/SVG/objects/balloon-2.svg",        label: "balloon2",   size: 28, rotate: 12  },
  { src: "/SVG/emojis/smiling-emoji.svg",     label: "smile",      size: 30, rotate: -3  },
  { src: "/SVG/objects/camera.svg",           label: "camera",     size: 28, rotate: 7   },
];
const ICONS_RIGHT = [...ICONS_RIGHT_BASE, ...ICONS_RIGHT_BASE, ...ICONS_RIGHT_BASE].map((icon, i) => ({
  ...icon,
  label: `${icon.label}-${i}`,
}));


function IconTile({ src, label, size, rotate, index }: {
  src: string; label: string; size: number; rotate: number; index: number;
}) {
  const isEven = index % 2 === 0;
  return (
    <div className="w-14 h-14 flex items-center justify-center border-b flex-shrink-0"
      style={{ backgroundColor: isEven ? "#EAE2D4" : "#DDD5C2", borderColor: "#C8B89A" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} width={size} height={size} draggable={false}
        style={{ transform: `rotate(${rotate}deg)`, filter: "brightness(0)",
          opacity: isEven ? 0.28 : 0.2, pointerEvents: "none", userSelect: "none", display: "block" }} />
    </div>
  );
}

export default function SideColumns() {
  return (
    <>
      {/* ── Left column ── */}
      <div className="fixed left-0 top-0 w-14 h-screen z-10 border-r hidden md:block"
        style={{ backgroundColor: "#E8E0D0", borderColor: "#C8B89A", overflow: "hidden" }}>
        {/* Scrolling tiles */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div className="animate-sidebar-down">
            {ICONS_LEFT.map((icon, i) => (
              <IconTile key={icon.label} {...icon} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right column ── */}
      <div className="fixed right-0 top-0 w-14 h-screen z-10 border-l hidden md:block"
        style={{ backgroundColor: "#E8E0D0", borderColor: "#C8B89A", overflow: "hidden" }}>
        {/* Scrolling tiles */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div className="animate-sidebar-up">
            {ICONS_RIGHT.map((icon, i) => (
              <IconTile key={icon.label} {...icon} index={i} />
            ))}
          </div>
        </div>
      </div>

    </>
  );
}
