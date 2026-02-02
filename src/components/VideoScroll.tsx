import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useAnimationFrame, useVelocity } from 'framer-motion';
import videoSrc from '../assets/forest.mp4';

interface VideoScrollProps {
    children?: React.ReactNode;
}

export function VideoScroll({ children }: VideoScrollProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState(0);

    // Track global window scroll progress
    // No target or offset needed for default global scroll
    const { scrollYProgress } = useScroll();

    // Velocity for dynamic blur
    const scrollVelocity = useVelocity(scrollYProgress);
    const blurAmount = useTransform(scrollVelocity, [-1, 0, 1], [5, 0, 5]);
    // Smooth blur to avoid flickering
    const smoothBlur = useSpring(blurAmount, { stiffness: 400, damping: 30 });
    const blurFilter = useTransform(smoothBlur, (v) => `blur(${v}px)`);

    // Smooth out the scroll value
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, mass: 0.5 });

    // Hybrid Control Loop
    useAnimationFrame(() => {
        const video = videoRef.current;
        // Allow running even if duration is 0? No, need duration.
        if (!video || !duration) return;

        const currentSmooth = smoothProgress.get();
        const targetTime = currentSmooth * (duration - 0.1);
        const diff = targetTime - video.currentTime;

        const SYNC_THRESHOLD = 0.05;
        const JUMP_THRESHOLD = 1.0;

        if (Math.abs(diff) < SYNC_THRESHOLD) {
            if (!video.paused) video.pause();
        } else if (diff > 0 && diff < JUMP_THRESHOLD) {
            const rate = Math.min(Math.max(diff * 15, 1), 16);
            video.playbackRate = rate;
            if (video.paused) video.play();
        } else {
            if (!video.paused) video.pause();
            if ('fastSeek' in video) {
                (video as HTMLVideoElement).fastSeek(targetTime);
            } else {
                (video as HTMLVideoElement).currentTime = targetTime;
            }
        }
    });

    // Handle video metadata load via callbacks
    const handleLoadedMetadata = () => {
        const video = videoRef.current;
        if (video) {
            setDuration(video.duration);
        }
    };

    const handleError = (e: any) => {
        console.error("Video load error:", e);
    };

    // Hybrid Control Loop
    useAnimationFrame(() => {
        const video = videoRef.current;
        if (!video || duration === 0) return;

        const currentSmooth = smoothProgress.get();
        // Calculate target time based on global scroll progress
        const targetTime = currentSmooth * (duration - 0.1);
        const diff = targetTime - video.currentTime;

        // Thresholds
        const SYNC_THRESHOLD = 0.05;
        const JUMP_THRESHOLD = 1.0;

        if (Math.abs(diff) < SYNC_THRESHOLD) {
            if (!video.paused) video.pause();
        } else if (diff > 0 && diff < JUMP_THRESHOLD) {
            // Forward scroll: Playback control
            const rate = Math.min(Math.max(diff * 15, 1), 16);
            video.playbackRate = rate;
            if (video.paused) video.play();
        } else {
            // Backward/Jump: Seek
            if (!video.paused) video.pause();

            if ('fastSeek' in video) {
                (video as HTMLVideoElement).fastSeek(targetTime);
            } else {
                (video as HTMLVideoElement).currentTime = targetTime;
            }
        }
    });

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden bg-black -z-10">
            <motion.div
                style={{ filter: blurFilter }}
                className="relative w-full h-full"
            >
                <video
                    ref={videoRef}
                    src={videoSrc}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                    autoPlay // key for mobile/initial frame
                    preload="auto"
                    loop={false}
                    onLoadedMetadata={handleLoadedMetadata}
                    onError={handleError}
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 z-10 flex items-center justify-center text-white pointer-events-none">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
