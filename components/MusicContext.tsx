"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ── Song data (shared) ─────────────────────────────────────────────────────
export const SONGS = [
  {
    file: "/music/Black Country, New Road - The Place Where He Inserted the Blade.mp3",
    cover: "/pic/The Place Where He Inserted the Blade.jpg",
    artist: "Black Country, New Road",
    title: "The Place Where He Inserted the Blade",
    genre: "Post-Rock",
    labelLine1: "POST", labelLine2: "ROCK",
    labelColor: "#5A7A6A", labelDark: "#3E5A4A",
    tags: ["后摇", "前卫", "戏剧", "弦乐"],
    description: "BC,NR 最戏剧化的一面——弦乐与噪音交织，像一场尚未落幕的仪式。小提琴攀升到顶点的那一刻，所有情绪同时涌来，然后突然被噪墙吞没。Isaac 的歌词像一把刀，精准地插进某个你以为已经愈合的地方。每次听都像第一次。",
    vibe: "戏剧性的仪式感",
    accentColor: "#6B5A4A",
    accentColor2: "#8B7355",
  },
  {
    file: "/music/Current Joys - A Different Age.mp3",
    cover: "/pic/A Different Age.jpg",
    artist: "Current Joys",
    title: "A Different Age",
    genre: "Indie Rock",
    labelLine1: "INDIE", labelLine2: "ROCK",
    labelColor: "#E8A87C", labelDark: "#B07848",
    tags: ["独立摇滚", "公路", "颗粒感", "忧郁"],
    description: "在公路上听最合适。吉他的颗粒感像砂砾，却有一种奇怪的温柔在里面。Nick Rattigan 的声音永远带着一层薄雾——你说不清那是忧郁还是怀旧，但就是想一直听下去。开到哪算哪，窗外的风景都变成了配乐。",
    vibe: "公路电影的质感",
    accentColor: "#C44A4A",
    accentColor2: "#B83C3C",
  },
  {
    file: "/music/Death Cab for Cutie - Transatlanticism.mp3",
    cover: "/pic/Transatlanticism.jpg",
    artist: "Death Cab for Cutie",
    title: "Transatlanticism",
    genre: "Indie Rock",
    labelLine1: "INDIE", labelLine2: "ROCK",
    labelColor: "#E8A87C", labelDark: "#B07848",
    tags: ["思念", "距离", "史诗", "八分钟"],
    description: "八分钟把思念写成了史诗。开头安静得像凌晨三点的房间，然后那句「I need you so much closer」不断重复，一层一层叠加，直到鼓点和吉他同时爆发。整首歌就是一场从压抑到释放的完整旅程，听过一次就忘不了。",
    vibe: "距离压缩成的声音",
    accentColor: "#B89A6A",
    accentColor2: "#C45A4A",
  },
  {
    file: "/music/Pink Floyd - Another Brick in the Wall, Pt. 2.mp3",
    cover: "/pic/The_Wall.jpg",
    artist: "Pink Floyd",
    title: "Another Brick in the Wall, Pt. 2",
    genre: "Prog Rock",
    labelLine1: "PROG", labelLine2: "ROCK",
    labelColor: "#7A6A5A", labelDark: "#4A3A2A",
    tags: ["经典", "反叛", "迷幻", "教育"],
    description: "小孩齐唱「We don't need no education」——这首歌本身就是对体制最优雅的嘲讽。Gilmour 的吉他 solo 温暖而锋利，跟整首歌冰冷的基调形成绝妙的张力。四十多年过去，这面墙依然没有被推倒。放到今天听，竟然比当年还贴切。",
    vibe: "最优雅的反叛",
    accentColor: "#C44A4A",
    accentColor2: "#9A8A7A",
  },
  {
    file: "/music/Racing Mount Pleasant - Racing Mount Pleasant.mp3",
    cover: "/pic/Racing Mount Pleasant.jpg",
    artist: "Racing Mount Pleasant",
    title: "Racing Mount Pleasant",
    genre: "Indie Rock",
    labelLine1: "INDIE", labelLine2: "ROCK",
    labelColor: "#E8A87C", labelDark: "#B07848",
    tags: ["流动", "即兴", "温暖", "漫游"],
    description: "旋律像流水一样自然，没有刻意的安排，却能把人带到某个遥远而温暖的地方。吉他的音色像午后阳光穿过树叶的那种温度——不灼热，但确实存在。整首歌有一种即兴演奏的松弛感，像是乐手们彼此心照不宣的对话。",
    vibe: "旋律的自由流动",
    accentColor: "#A89A80",
    accentColor2: "#C44A4A",
  },
  {
    file: "/music/The Strokes - Eternal Summer.mp3",
    cover: "/pic/the_stroke.jpg",
    artist: "The Strokes",
    title: "Eternal Summer",
    genre: "Indie Rock",
    labelLine1: "INDIE", labelLine2: "ROCK",
    labelColor: "#E8A87C", labelDark: "#B07848",
    tags: ["夏日", "纽约", "躁动", "慵懒"],
    description: "Julian 的嗓音永远带着一种慵懒的紧张感，像第三杯啤酒之后说出的真心话。鼓点和贝斯线条利落干脆，却不失车库摇滚特有的粗糙质感。这首歌就是一个永恒的夏天——躁动、慵懒、自由，听完想立刻出门。",
    vibe: "纽约地下室的夏天",
    accentColor: "#2A9A9A",
    accentColor2: "#D4B83A",
  },
  {
    file: "/music/张悬 - 关于我爱你.mp3",
    cover: "/pic/张悬.jpg",
    artist: "张悬",
    title: "关于我爱你",
    genre: "华语独立",
    labelLine1: "华语", labelLine2: "独立",
    labelColor: "#C8A090", labelDark: "#906050",
    tags: ["民谣", "温柔", "清醒", "台湾"],
    description: "把爱情唱得像哲学，温柔又清醒。张悬的声音里有种不动声色的力量，不煽情却直抵人心。吉他简单到极致，反而给了歌词最大的空间。适合深夜独处时听，也适合坐在阳台上发呆，什么都不想，就让旋律流过去。",
    vibe: "温柔而清醒的爱意",
    accentColor: "#ED8AB6",
    accentColor2: "#4A9A9A",
  },
  {
    file: "/music/shenyicheng-jackie.mp3",
    cover: "/pic/沈以诚.jpg",
    artist: "沈以诚",
    title: "杰克的酒窝",
    genre: "中国独立",
    labelLine1: "华语", labelLine2: "独立",
    labelColor: "#C8A090", labelDark: "#906050",
    tags: ["都市", "浪漫", "软摇滚", "城市"],
    description: "沈以诚的声音里有种独特的城市疏离感——像深夜便利店的灯光，明亮但冷清。『杰克的酒窝』像一个关于某人的小故事，旋律在软摇滚的温柔和电子音色的冷感之间游走。整首歌营造出一种都市夜归人的浪漫氛围。",
    vibe: "都市里的小浪漫",
    accentColor: "#00CED1",
    accentColor2: "#FF8C42",
  },
];

export type Song = (typeof SONGS)[number];

type MusicContextValue = {
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  current: Song;
  togglePlay: () => void;
  selectSong: (index: number) => void;
  handleSeek: (ratio: number) => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldPlayRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const current = SONGS[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(0);
    setDuration(0);
    audio.src = current.file;
    audio.load();
    if (shouldPlayRef.current) {
      shouldPlayRef.current = false;
      audio.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, [currentIndex, current.file]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio) setCurrentTime(audio.currentTime);
  }, []);
  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio) setDuration(audio.duration);
  }, []);
  const handleSeek = useCallback((ratio: number) => {
    const audio = audioRef.current;
    if (!audio || !isFinite(duration) || duration <= 0) return;
    const t = Math.max(0, Math.min(1, ratio)) * duration;
    audio.currentTime = t;
    setCurrentTime(t);
  }, [duration]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const selectSong = useCallback((index: number) => {
    if (index === currentIndex) {
      togglePlay();
    } else {
      shouldPlayRef.current = true;
      setIsPlaying(false);
      setCurrentIndex(index);
    }
  }, [currentIndex, togglePlay]);

  const handleEnded = useCallback(() => {
    const next = (currentIndex + 1) % SONGS.length;
    shouldPlayRef.current = true;
    setIsPlaying(false);
    setCurrentIndex(next);
  }, [currentIndex]);

  const value: MusicContextValue = {
    currentIndex,
    setCurrentIndex,
    isPlaying,
    currentTime,
    duration,
    current,
    togglePlay,
    selectSong,
    handleSeek,
  };

  return (
    <MusicContext.Provider value={value}>
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      />
      {children}
    </MusicContext.Provider>
  );
}
