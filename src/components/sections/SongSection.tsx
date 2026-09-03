import { useEffect, useRef, useState } from "react";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { Vinyl } from "@/components/three/Vinyl";
import { useReducedMotion } from "@/lib/reduced-motion";
import { SectionHeading } from "./SectionHeading";

/**
 * Drop your mp3 into public/ and set the filename below.
 * The cover image is also served from public/ — optional, leave "" to hide.
 *
 *   public/ranjha.mp3
 *   public/ranjha-cover.jpg   ← optional album art
 */
const AUDIO_SRC = "/ranjha.mp3";
const COVER_SRC = "/ranjha-cover.jpg"; // set to "" if you don't have a cover
const SONG_TITLE = "Ranjha";
const SONG_ARTIST = "B Praak";

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function SongSection() {
  const reduced = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

  // Autoplay as soon as this section mounts — it's always post-unlock,
  // so the preceding PIN button click satisfies the browser gesture requirement.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || reduced) return;
    audio.play().catch(() => {
      // Browser blocked autoplay — user can tap the play button instead.
    });
  }, [reduced]);

  // Sync state from native audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => { if (!seeking) setCurrent(audio.currentTime); };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => { setPlaying(false); setCurrent(0); };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [seeking]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    playing ? audio.pause() : audio.play();
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const val = Number(e.target.value);
    audio.currentTime = val;
    setCurrent(val);
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <section className="relative overflow-hidden py-24">
      {/* Hidden native audio element — we drive it ourselves */}
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

      <SectionHeading
        kicker="press play"
        title="Our Song"
        subtitle="Turn the volume up. This one is yours."
      />

      <div className="relative mx-auto flex h-[420px] max-w-3xl items-center justify-center px-6">
        {/* Spinning vinyl backdrop */}
        <SceneCanvas camera={{ position: [0, 1.4, 6], fov: 50 }}>
          <Vinyl drift={!reduced && playing} />
        </SceneCanvas>

        {/* Song card */}
        <div className="relative z-10 w-full max-w-sm glass-panel rounded-2xl shadow-[var(--shadow-portal)] overflow-hidden">

          {/* Cover art */}
          {COVER_SRC ? (
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={COVER_SRC}
                alt={`${SONG_TITLE} album cover`}
                className="h-full w-full object-cover"
                style={{ filter: playing ? "brightness(1)" : "brightness(0.6)" }}
              />
              {/* Gradient overlay so controls sit on a readable dark surface */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
            </div>
          ) : (
            // Placeholder gradient when no cover is set
            <div
              className="h-32 w-full"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.35 0.22 305), oklch(0.22 0.18 255))",
              }}
            />
          )}

          {/* Controls */}
          <div className="px-5 pb-5 pt-3">
            {/* Title + artist */}
            <div className="mb-3">
              <p className="font-display text-lg leading-tight text-foreground tracking-wide">
                {SONG_TITLE}
              </p>
              <p className="font-body text-xs text-muted-foreground mt-0.5">{SONG_ARTIST}</p>
            </div>

            {/* Seek bar */}
            <div className="mb-3 group">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={current}
                step={0.1}
                onChange={seek}
                onMouseDown={() => setSeeking(true)}
                onMouseUp={() => setSeeking(false)}
                onTouchStart={() => setSeeking(true)}
                onTouchEnd={() => setSeeking(false)}
                aria-label="Seek position"
                className="w-full cursor-pointer appearance-none h-1 rounded-full outline-none"
                style={{
                  background: `linear-gradient(to right, var(--color-primary) ${progress}%, var(--color-border) ${progress}%)`,
                }}
              />
              <div className="mt-1 flex justify-between font-body text-[10px] text-muted-foreground select-none">
                <span>{formatTime(current)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Play / Pause button */}
            <div className="flex justify-center">
              <button
                id="song-play-pause"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-[var(--shadow-glow)] transition-transform hover:scale-110 active:scale-95"
              >
                {playing ? (
                  /* Pause icon */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-primary-foreground">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  /* Play icon */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-primary-foreground translate-x-0.5">
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
