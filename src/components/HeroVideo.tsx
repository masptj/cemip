import * as React from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  className?: string;
  videoUrl?: string;
}

const DEFAULT_VIDEO_URL =
  "https://ielqn9vwwubgwx6h.public.blob.vercel-storage.com/apresentacao.mp4";

export function HeroVideo({
  className = "",
  videoUrl = DEFAULT_VIDEO_URL,
}: HeroVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Toggle play / pause
  const togglePlay = React.useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Toggle mute
  const toggleMute = React.useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);

    // If unmuting while paused, resume play
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = React.useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {});
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  }, []);

  // Handle time update for progress bar
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  // Fullscreen change listener
  React.useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-[270px] xs:max-w-[290px] sm:max-w-[350px] lg:max-w-[390px] mx-auto group select-none",
        isFullscreen && "max-w-none flex items-center justify-center bg-black h-screen",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient background glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[var(--sage)]/30 to-emerald-500/20 rounded-[2.5rem] blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

      {/* Main Video Frame (9:16 portrait ratio) */}
      <div
        onClick={togglePlay}
        className={cn(
          "relative w-full aspect-[9/16] overflow-hidden rounded-[2rem] sm:rounded-[2.25rem] border border-border/80 bg-neutral-950 shadow-2xl cursor-pointer transition-all duration-300",
          isFullscreen ? "aspect-auto max-h-[96vh] rounded-none border-none shadow-none" : "hover:border-[var(--sage)]/60"
        )}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          playsInline
          autoPlay
          muted={isMuted}
          loop
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover object-center"
        />

        {/* Subtle dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40 pointer-events-none" />

        {/* Top Header Controls / Badges */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-auto z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white border border-white/15 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Sparkles className="h-3 w-3 text-emerald-400" />
            Apresentação CEMIP
          </span>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
            className="grid h-8 w-8 place-items-center rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-all hover:scale-105"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        {/* Center Play/Pause state indicator when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 grid place-items-center bg-black/30 backdrop-blur-[2px] transition-all z-10">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-black/70 text-white border border-white/20 shadow-xl transition-transform hover:scale-110">
              <Play className="h-8 w-8 translate-x-0.5 fill-current text-white" />
            </div>
          </div>
        )}

        {/* Bottom Floating Unmute / Sound Banner */}
        <div className="absolute bottom-5 inset-x-4 flex flex-col gap-2.5 z-10">
          {/* Quick Sound Callout (prompts user to listen) */}
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium backdrop-blur-md transition-all border shadow-md",
                isMuted
                  ? "bg-emerald-500/90 hover:bg-emerald-500 text-white border-emerald-400/40 animate-pulse"
                  : "bg-black/60 hover:bg-black/80 text-white/90 border-white/15"
              )}
            >
              {isMuted ? (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-white" />
                  <span>Ativar som</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-emerald-300" />
                  <span>Som ativado</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="grid h-8 w-8 place-items-center rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-all hover:scale-105"
              aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
            >
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5 fill-current" />
              ) : (
                <Play className="h-3.5 w-3.5 translate-x-0.5 fill-current" />
              )}
            </button>
          </div>

          {/* Video Title / Description */}
          <div className="pointer-events-none text-left">
            <p className="font-serif text-base font-semibold text-white leading-tight drop-shadow-sm">
              Conheça a CEMIP Pacaembu
            </p>
            <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
              Tour em vídeo pelo espaço e consultórios
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
