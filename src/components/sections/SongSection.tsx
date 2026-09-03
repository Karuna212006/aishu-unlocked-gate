import { useEffect, useRef, useState } from "react";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { Vinyl } from "@/components/three/Vinyl";
import { useReducedMotion } from "@/lib/reduced-motion";
import { SectionHeading } from "./SectionHeading";

/**
 * Official Spotify embed via the IFrame API (full player, not the 30s iframe).
 * Swap the URI below for a different track.
 */
const SPOTIFY_URI = "spotify:track:72zHuDxFQTjbL51qJQSA7j";
const SONG_TITLE = "Ranjha (From Shershaah)";
const SONG_ARTIST = "Jasleen Royal, B Praak, Romy";

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIFrameApi) => void;
    Spotify?: unknown;
  }
}

type SpotifyController = {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  addListener: (event: string, cb: (e: unknown) => void) => void;
  destroy: () => void;
};

type SpotifyIFrameApi = {
  createController: (
    el: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    cb: (controller: SpotifyController) => void,
  ) => void;
};

const API_SRC = "https://open.spotify.com/embed/iframe-api/v1";

function loadSpotifyApi(): Promise<SpotifyIFrameApi> {
  return new Promise((resolve) => {
    const existing = (window as { __spotifyIframeApi?: SpotifyIFrameApi }).__spotifyIframeApi;
    if (existing) return resolve(existing);

    const prev = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (api) => {
      (window as { __spotifyIframeApi?: SpotifyIFrameApi }).__spotifyIframeApi = api;
      prev?.(api);
      resolve(api);
    };

    if (!document.querySelector(`script[src="${API_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = API_SRC;
      s.async = true;
      document.body.appendChild(s);
    }
  });
}

export function SongSection() {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyController | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadSpotifyApi().then((api) => {
      if (cancelled || !hostRef.current) return;
      api.createController(
        hostRef.current,
        { uri: SPOTIFY_URI, width: "100%", height: 152 },
        (controller) => {
          if (cancelled) {
            controller.destroy();
            return;
          }
          controllerRef.current = controller;
          setReady(true);

          controller.addListener("playback_update", (e) => {
            const data = (e as { data?: { isPaused?: boolean } }).data;
            if (data) setPlaying(!data.isPaused);
          });

          // The PIN click that navigated here counts as the user gesture,
          // so the player can start on its own.
          controller.addListener("ready", () => {
            try {
              controller.play();
            } catch {
              /* user can press play instead */
            }
          });
          try {
            controller.play();
          } catch {
            /* ignored */
          }
        },
      );
    });

    return () => {
      cancelled = true;
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, []);

  const togglePlay = () => controllerRef.current?.togglePlay();

  return (
    <section className="relative overflow-hidden py-24">
      <SectionHeading
        kicker="press play"
        title="Our Song"
        subtitle="Turn the volume up. This one is yours."
      />

      <div className="relative mx-auto flex min-h-[420px] max-w-3xl items-center justify-center px-6">
        {/* Spinning vinyl backdrop */}
        <SceneCanvas camera={{ position: [0, 1.4, 6], fov: 50 }}>
          <Vinyl drift={!reduced && playing} />
        </SceneCanvas>

        {/* Song card */}
        <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl glass-panel shadow-[var(--shadow-portal)]">
          <div className="px-5 pb-3 pt-5">
            <p className="font-display text-lg leading-tight tracking-wide text-foreground">
              {SONG_TITLE}
            </p>
            <p className="mt-0.5 font-body text-xs text-muted-foreground">{SONG_ARTIST}</p>
          </div>

          {/* Official Spotify player mounts here */}
          <div className="px-3 pb-3">
            <div ref={hostRef} />
          </div>

          <div className="flex justify-center pb-5">
            <button
              id="song-play-pause"
              onClick={togglePlay}
              disabled={!ready}
              aria-label={playing ? "Pause" : "Play"}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-[var(--shadow-glow)] transition-transform hover:scale-110 active:scale-95 disabled:opacity-50"
            >
              {playing ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-primary-foreground">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5 text-primary-foreground">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
