"use client";

import type { ChangeEvent, HTMLAttributes, MouseEvent, PropsWithChildren, Ref } from "react";
import { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Maximize01, Minimize01, VolumeMax, VolumeX } from "@opus2-platform/icons";
import type { Placement } from "react-aria";
import { Focusable as AriaFocusable, Tooltip as AriaTooltip, TooltipTrigger as AriaTooltipTrigger } from "react-aria-components";
import { cx } from "@/utils";
import { PauseIcon, PlayIcon } from "./icons";

export interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  readonly paused: boolean;
  readonly videoElement: HTMLVideoElement | null;
}

const SIZE_WIDTHS = {
  sm: "max-w-xs",
  md: "max-w-md",
  lg: "max-w-2xl",
} as const;

const CONTROL_BAR_PADDING: Record<keyof typeof SIZE_WIDTHS, string> = {
  sm: "px-1 pt-6 pb-1",
  md: "px-5 pt-10 pb-4",
  lg: "px-8 pt-12 pb-6",
};

const PLAYBACK_SPEEDS = [1, 1.25, 1.5, 1.75, 2] as const;

function formatTime(time: number): string {
  const minutes = Math.max(Math.floor(time / 60), 0);
  const seconds = Math.max(Math.floor(time % 60), 0);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export interface VideoPlayerProps {
  src: string;
  type?: string;
  autoPlay?: boolean;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  showThumbnailOverlay?: boolean;
  thumbnailButtonClassName?: string;
  size?: keyof typeof SIZE_WIDTHS;
  ref?: Ref<VideoPlayerRef>;
  className?: string;
}

function VolumeGlyph({ isMuted, volume, iconClassName }: { isMuted: boolean; volume: number; iconClassName?: string }) {
  const ic = cx("size-4", iconClassName);
  return isMuted || volume === 0 ? <VolumeX className={ic} /> : <VolumeMax className={ic} />;
}

export const VideoPlayer = ({
  src,
  type = "video/mp4",
  autoPlay = false,
  thumbnailUrl,
  thumbnailAlt,
  showThumbnailOverlay,
  className,
  thumbnailButtonClassName,
  size = "md",
  ref,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState<TimeRanges | null>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  /** Keeps keyboard handler stable without re-subscribing on every render. */
  const actionsRef = useRef({
    togglePlay: () => {},
    toggleFullscreen: () => {},
    toggleMute: () => {},
  });

  useImperativeHandle(ref, () => ({
    play: () => {
      void videoRef.current?.play();
      setIsPlaying(true);
      setShowThumbnail(false);
    },
    pause: () => {
      videoRef.current?.pause();
      setIsPlaying(false);
    },
    get paused() {
      return videoRef.current?.paused ?? true;
    },
    get videoElement() {
      return videoRef.current;
    },
  }));

  const togglePlay = useCallback(() => {
    setIsPlaying((prevPlaying) => {
      if (prevPlaying) {
        videoRef.current?.pause();
      } else {
        void videoRef.current?.play();
      }
      return !prevPlaying;
    });
    setShowThumbnail(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      void videoRef.current?.parentElement?.requestFullscreen();
    } else {
      void document.exitFullscreen();
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setVolume(previousVolume);
      if (videoRef.current) {
        videoRef.current.volume = previousVolume;
      }
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      if (videoRef.current) {
        videoRef.current.volume = 0;
      }
    }
    setIsMuted(!isMuted);
  }, [isMuted, previousVolume, volume]);

  const toggleSpeed = useCallback(() => {
    const currentIndex = PLAYBACK_SPEEDS.indexOf(playbackRate as (typeof PLAYBACK_SPEEDS)[number]);
    const nextIndex = (currentIndex + 1) % PLAYBACK_SPEEDS.length;
    const nextSpeed = PLAYBACK_SPEEDS[nextIndex] ?? 1;
    setPlaybackRate(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  }, [playbackRate]);

  actionsRef.current = { togglePlay, toggleFullscreen, toggleMute };

  const progressPointerInfo = (e: MouseEvent) => {
    const el = progressRef.current;
    if (!el || !duration) return null;
    const rect = el.getBoundingClientRect();
    const frac = (e.clientX - rect.left) / rect.width;
    return { frac, localX: e.clientX - rect.left };
  };

  const handleProgressClick = (e: MouseEvent) => {
    const info = progressPointerInfo(e);
    if (info && videoRef.current) {
      videoRef.current.currentTime = info.frac * duration;
    }
  };

  const handleProgressHover = (e: MouseEvent) => {
    const info = progressPointerInfo(e);
    if (info) {
      setHoverTime(info.frac * duration);
      setHoverPosition(info.localX);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      setBuffered(videoRef.current.buffered);
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(Number.isFinite(video.duration) ? video.duration : 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setShowThumbnail(true);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      const { togglePlay: tp, toggleFullscreen: tf, toggleMute: tm } = actionsRef.current;
      if (e.code === "Space" || e.code === "KeyK") {
        e.preventDefault();
        tp();
      }
      if (e.code === "KeyF") {
        e.preventDefault();
        tf();
      }
      if (e.code === "KeyM") {
        e.preventDefault();
        tm();
      }
      if (e.code === "ArrowUp") {
        e.preventDefault();
        const newVolume = Math.min(video.volume + 0.1, 1);
        video.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
      }
      if (e.code === "ArrowDown") {
        e.preventDefault();
        const newVolume = Math.max(video.volume - 0.1, 0);
        video.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
      }
      if (e.code === "ArrowLeft") {
        e.preventDefault();
        video.currentTime = Math.max(video.currentTime - 10, 0);
      }
      if (e.code === "ArrowRight") {
        e.preventDefault();
        video.currentTime = Math.min(video.currentTime + 10, video.duration);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("keydown", handleKeyDown);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const bufferedSegments =
    buffered && duration
      ? Array.from({ length: buffered.length }, (_, i) => {
          const start = (buffered.start(i) / duration) * 100;
          const end = (buffered.end(i) / duration) * 100;
          return (
            <div
              key={i}
              className="pointer-events-none absolute h-full min-w-2 rounded-full bg-fg-white/50"
              style={{
                left: `${start}%`,
                width: `${end - start}%`,
              }}
            />
          );
        })
      : null;

  const canShowTrickPlayTime = hoverTime !== null && hoverPosition !== null;

  return (
    <div className={cx("w-full", SIZE_WIDTHS[size])}>
      <div
        className={cx(
          "group/video relative aspect-video w-full overflow-hidden rounded-xl bg-black ring-1 ring-secondary ring-inset",
          "outline-focus-ring has-[video:focus-visible]:outline-2 has-[video:focus-visible]:outline-offset-4",
          className,
        )}
      >
        <div
          onClick={togglePlay}
          className={cx(
            "group absolute inset-0 z-10 cursor-pointer rounded-[inherit] transition-all duration-300 ease-in",
            thumbnailUrl && showThumbnail ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
          )}
        >
          {thumbnailUrl ? <img src={thumbnailUrl} alt={thumbnailAlt ?? ""} className="size-full object-cover" /> : null}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cx(
                "flex size-16 items-center justify-center",
                size !== "sm" &&
                  "rounded-full bg-alpha-white/30 backdrop-blur transition duration-100 ease-linear group-hover:bg-alpha-white/40 hover:bg-alpha-white/40",
                thumbnailUrl && showThumbnail ? "scale-100" : "scale-90 duration-500",
                thumbnailButtonClassName,
              )}
            >
              <PlayIcon className="size-5 text-fg-white" />
            </div>
          </div>

          {showThumbnailOverlay ? (
            <div className="absolute inset-0 rounded-[inherit] bg-black/10 outline-2 -outline-offset-1 outline-black/10" />
          ) : null}
        </div>

        <video
          ref={videoRef}
          tabIndex={0}
          autoPlay={autoPlay}
          className="h-full w-full cursor-pointer rounded-[inherit] bg-black outline-1 -outline-offset-1 outline-black/10"
          onClick={togglePlay}
          onDoubleClick={toggleFullscreen}
        >
          <source src={src} type={type} />
          Your browser does not support the video tag.
        </video>

        <div
          className={cx(
            "absolute right-0 bottom-0 left-0 translate-y-4 transform bg-linear-to-t from-black/20 to-transparent opacity-0 transition duration-150 ease-in will-change-transform",
            "group-hover/video:translate-y-0 group-hover/video:opacity-100 group-hover/video:duration-200 group-hover/video:ease-out",
            "group-has-[video:focus-visible]/video:translate-y-0 group-has-[video:focus-visible]/video:opacity-100 group-has-[video:focus-visible]/video:duration-200 group-has-[video:focus-visible]/video:ease-out",
            CONTROL_BAR_PADDING[size],
          )}
        >
          <div className={cx("flex items-center", size === "lg" ? "gap-1" : "gap-0.5")}>
            <VideoPlayerButton
              crossOffset={-12}
              tooltipPlacement="top start"
              tooltipTitle={isPlaying ? "Pause" : "Play"}
              tooltipDescription="Space"
              tabIndex={-1}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="group/play relative"
            >
              <PauseIcon
                className={cx(
                  "size-4 transition duration-100 ease-linear group-active/play:scale-[0.8]",
                  isPlaying ? "scale-100 opacity-100" : "pointer-events-none scale-[0.8] opacity-0",
                )}
              />
              <PlayIcon
                className={cx(
                  "absolute size-4 transition duration-100 ease-linear group-active/play:scale-[0.8]",
                  isPlaying ? "pointer-events-none scale-[0.8] opacity-0" : "scale-100 opacity-100",
                )}
              />
            </VideoPlayerButton>

            {size !== "lg" ? (
              <VideoPlayerButton
                tooltipPlacement="top"
                tooltipTitle={isMuted ? "Unmute" : "Mute"}
                tooltipDescription="M"
                tabIndex={-1}
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="group/play relative"
              >
                <VolumeGlyph isMuted={isMuted} volume={volume} />
              </VideoPlayerButton>
            ) : null}

            {size === "lg" ? (
              <div className="flex items-center rounded-md pr-2 outline-hidden transition duration-100 ease-linear hover:bg-alpha-white/20 hover:backdrop-blur-sm focus-visible:outline-offset-2 focus-visible:outline-white">
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="flex size-8 cursor-pointer items-center justify-center"
                >
                  <VolumeGlyph isMuted={isMuted} volume={volume} iconClassName="text-fg-white" />
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  tabIndex={-1}
                  onChange={handleVolumeChange}
                  className="h-1 w-11 cursor-pointer appearance-none rounded-full bg-alpha-white/30 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:translate-x-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fg-white"
                  style={{
                    backgroundImage: `linear-gradient(to right, white ${volume * 100}%, transparent ${volume * 100}%)`,
                  }}
                />
              </div>
            ) : null}

            <div
              className={cx(
                "flex min-w-0 flex-1 items-center gap-2 px-2",
                size === "sm" && "pointer-events-none invisible opacity-0",
              )}
            >
              <span className="pointer-events-none text-xs font-semibold text-white">{formatTime(currentTime)}</span>

              <div
                ref={progressRef}
                onClick={handleProgressClick}
                onMouseMove={handleProgressHover}
                className="group/progress -my-8 flex-1 cursor-pointer py-8"
              >
                <div className="relative h-2 flex-1 rounded-full bg-fg-white/30">
                  {bufferedSegments}
                  <div
                    className="pointer-events-none absolute h-full min-w-2 rounded-full bg-fg-white"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                  <div
                    className="pointer-events-none absolute top-1/2 h-8 w-px -translate-y-1/2 bg-fg-white/30 opacity-0 transition duration-100 ease-linear group-hover/progress:opacity-100"
                    style={{
                      left: hoverPosition ?? 0,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute bottom-6 -translate-x-1/2 translate-y-2 transform text-xs font-semibold text-fg-white opacity-0 group-hover/progress:translate-y-0 group-hover/progress:opacity-100 [transition:opacity_0.3s_cubic-bezier(0.4,0,0.6,1),transform_0.3s_cubic-bezier(0.4,0,0.6,1),translate_0.3s_cubic-bezier(0.4,0,0.6,1)]"
                    style={{ left: hoverPosition ?? 0 }}
                  >
                    {canShowTrickPlayTime ? formatTime(hoverTime ?? 0) : ""}
                  </div>
                </div>
              </div>

              <span className="pointer-events-none text-xs font-semibold text-white">-{formatTime(duration - currentTime)}</span>
            </div>

            {size === "lg" ? (
              <VideoPlayerButton
                tooltipPlacement="top"
                tooltipTitle="Playback speed"
                tooltipDescription="← →"
                tabIndex={-1}
                onClick={toggleSpeed}
                aria-label={`Change playback speed. Current speed: ${playbackRate}x`}
                className="flex items-center"
              >
                <span className="text-xs font-semibold">{playbackRate}</span>
                <svg viewBox="0 0 8 8" fill="none" className="mt-0.5 size-2" aria-hidden>
                  <path d="M6 2L2 6M2 2L6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </VideoPlayerButton>
            ) : null}

            <VideoPlayerButton
              tooltipPlacement="top end"
              crossOffset={16}
              tooltipTitle={isFullscreen ? "Minimize" : "Fullscreen"}
              tooltipDescription={isFullscreen ? "Escape" : "F"}
              tabIndex={-1}
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize01 className="size-4" /> : <Maximize01 className="size-4" />}
            </VideoPlayerButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoPlayerButton = ({
  children,
  tooltipPlacement = "top",
  tooltipTitle,
  tooltipDescription,
  crossOffset,
  ...props
}: PropsWithChildren<
  HTMLAttributes<HTMLButtonElement> & {
    tooltipPlacement?: Placement;
    tooltipTitle?: string;
    tooltipDescription?: string;
    crossOffset?: number;
  }
>) => {
  return (
    <AriaTooltipTrigger delay={350} closeDelay={0}>
      <AriaFocusable>
        <button
          type="button"
          {...props}
          className={cx(
            "flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-md p-2 text-white outline-hidden transition duration-100 ease-linear before:absolute before:size-6 hover:bg-alpha-white/20 hover:backdrop-blur-sm focus-visible:outline-offset-2 focus-visible:outline-white",
            props.className,
          )}
        >
          {children}
        </button>
      </AriaFocusable>
      <AriaTooltip
        offset={8}
        placement={tooltipPlacement}
        crossOffset={crossOffset}
        className={({ isEntering, isExiting }) =>
          cx(
            "dark-mode pointer-events-none flex gap-1.5 rounded-lg bg-alpha-white/20 p-1 pl-2 shadow-lg ring-1 ring-alpha-white/10 backdrop-blur-sm ring-inset",
            isEntering && "origin-bottom ease-out animate-in fade-in slide-in-from-bottom-0.5 zoom-in-95",
            isExiting && "origin-bottom ease-in animate-out fade-out slide-out-to-bottom-0.5 zoom-out-95",
          )
        }
      >
        <div className="text-sm font-semibold text-white">{tooltipTitle}</div>
        <div className="rounded bg-alpha-white/30 px-[3px] py-[1px] font-sans text-xs font-semibold text-white shadow-xs ring-1 ring-alpha-white/10 ring-inset">
          {tooltipDescription}
        </div>
      </AriaTooltip>
    </AriaTooltipTrigger>
  );
};

VideoPlayer.displayName = "VideoPlayer";
