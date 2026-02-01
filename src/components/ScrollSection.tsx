import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollSectionProps {
    children: React.ReactNode;
    className?: string;
    persistAtEnd?: boolean;
    customRanges?: [number, number, number, number];
}

export function ScrollSection({ children, className = "", persistAtEnd = false, customRanges }: ScrollSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    });

    // Z-Axis Animation Logic
    // Adjusted for "Warp" timing - EXTENDED READ TIME:
    // 0% -> 15%: Warp In (Invisible/Blurry)
    // 15% -> 30%: Arrival (Fade in, scale fast)
    // 30% -> 70%: READ (Static, clear) - DOUBLED DURATION
    // 70% -> 85%: Departure (Fade out, scale up)
    // 85% -> 100%: Warp Out (Invisible)

    // Default ranges:
    // 0.25 -> 0.35: Fade In (Starts LATER to avoid Warp)
    // 0.35 -> 0.8: Read (0.45 length - EXTENDED)
    // 0.8 -> 0.9: Fade Out (Ends before next Warp)
    const defaultRanges = [0.25, 0.35, 0.8, 0.9];

    // Use custom ranges if provided, otherwise use defaults
    // Note: persistAtEnd logic overrides the exit phase of the ranges if needed, 
    // but if customRanges are explicitly provided, we trust the caller to handle persistence or we apply persist on top.
    // For simplicity: if persistAtEnd is true, we force the last two values to keep opacity/scale high.

    const ranges = customRanges || defaultRanges;

    // Apply persistAtEnd overrides to the 'values' array, not the 'input' ranges.
    // However, the inputs must match the output array length.

    const scale = useTransform(
        scrollYProgress,
        ranges,
        persistAtEnd ? [0.8, 1, 1, 1] : [0.8, 1, 1, 1.5]
    );
    const opacity = useTransform(
        scrollYProgress,
        ranges,
        persistAtEnd ? [0, 1, 1, 1] : [0, 1, 1, 0]
    );
    const blur = useTransform(
        scrollYProgress,
        ranges,
        persistAtEnd ? ["20px", "0px", "0px", "0px"] : ["20px", "0px", "0px", "20px"]
    );
    const y = useTransform(
        scrollYProgress,
        ranges,
        persistAtEnd ? ["20%", "0%", "0%", "0%"] : ["20%", "0%", "0%", "-20%"]
    );

    return (
        <section ref={ref} className={`relative h-[300vh] ${className}`}>
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ scale, opacity, filter: useTransform(blur, (v) => `blur(${v})`), y }}
                    className="w-full max-w-4xl px-6 relative z-10"
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
