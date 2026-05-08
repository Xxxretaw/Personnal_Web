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

const PLAYLIST_ID = "649792716";
const CACHE_KEY = `netease-playlist-${PLAYLIST_ID}`;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

const API_ENDPOINTS = [
  `https://vercel-meting-api-bay.vercel.app/?server=netease&type=playlist&id=${PLAYLIST_ID}`,
  `https://api.injahow.cn/meting/?server=netease&type=playlist&id=${PLAYLIST_ID}`,
];

export interface Song {
  id: number;
  name: string;
  artist: string;
  album: string;
  pic: string;
  url: string;
}

function loadCache(): Song[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
}

function saveCache(data: Song[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch { /* quota exceeded — ignore */ }
}

async function fetchPlaylist(): Promise<Song[]> {
  for (const url of API_ENDPOINTS) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      // Response may contain PHP warnings before JSON — strip them
      const text = await res.text();
      const jsonStart = text.indexOf("[");
      if (jsonStart < 0) continue;
      const data = JSON.parse(text.slice(jsonStart));
      if (Array.isArray(data) && data.length > 0) {
        return data
          .filter((s: Song) => s.url)
          .map((s: Song) => ({
            ...s,
            // Ensure https for all URLs
            url: s.url.replace(/^http:\/\//, "https://"),
            pic: s.pic.replace(/^http:\/\//, "https://"),
          }));
      }
    } catch { /* try next endpoint */ }
  }
  return [];
}

export type PlayMode = "sequential" | "shuffle";

type MusicContextValue = {
  songs: Song[];
  loading: boolean;
  error: string | null;
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  current: Song | null;
  playMode: PlayMode;
  setPlayMode: (mode: PlayMode) => void;
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

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playMode, setPlayMode] = useState<PlayMode>("sequential");

  useEffect(() => {
    const cached = loadCache();
    if (cached && cached.length > 0) {
      setSongs(cached);
      setLoading(false);
      return;
    }

    fetchPlaylist().then((data) => {
      if (data.length > 0) {
        setSongs(data);
        saveCache(data);
      } else {
        setError("歌单加载失败，请稍后刷新重试");
      }
      setLoading(false);
    });
  }, []);

  const current = songs[currentIndex] ?? null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    setCurrentTime(0);
    setDuration(0);
    audio.src = current.url;
    audio.load();
    if (shouldPlayRef.current) {
      shouldPlayRef.current = false;
      audio.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, [currentIndex, current?.url]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio) setCurrentTime(audio.currentTime);
  }, []);
  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio) setDuration(audio.duration);
  }, []);
  const handleSeek = useCallback(
    (ratio: number) => {
      const audio = audioRef.current;
      if (!audio || !isFinite(duration) || duration <= 0) return;
      const t = Math.max(0, Math.min(1, ratio)) * duration;
      audio.currentTime = t;
      setCurrentTime(t);
    },
    [duration]
  );

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

  const selectSong = useCallback(
    (index: number) => {
      if (index === currentIndex) {
        togglePlay();
      } else {
        shouldPlayRef.current = true;
        setIsPlaying(false);
        setCurrentIndex(index);
      }
    },
    [currentIndex, togglePlay]
  );

  const handleEnded = useCallback(() => {
    if (songs.length === 0) return;
    let next: number;
    if (playMode === "shuffle") {
      next = Math.floor(Math.random() * songs.length);
      if (next === currentIndex && songs.length > 1) {
        next = (next + 1) % songs.length;
      }
    } else {
      next = (currentIndex + 1) % songs.length;
    }
    shouldPlayRef.current = true;
    setIsPlaying(false);
    setCurrentIndex(next);
  }, [currentIndex, songs.length, playMode]);

  const value: MusicContextValue = {
    songs,
    loading,
    error,
    currentIndex,
    setCurrentIndex,
    isPlaying,
    currentTime,
    duration,
    current,
    playMode,
    setPlayMode,
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
