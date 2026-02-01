import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

export function ForestTunnel() {
    const { scrollYProgress } = useScroll();

    // Create 3 depth layers of forest
    // Front layer (fastest, blurriest)
    // Middle layer
    // Back layer (slowest, clearest)

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-multiply">
            {/* Back Layer - Tall Trees */}
            <ForestLayer
                scrollY={scrollYProgress}
                speed={0.2}
                opacity={0.6}
                blur="1px"
                scaleRange={[1, 1.2]}
                color="#1a4435" // forest-900
            />

            {/* Middle Layer - Bushes/Small Trees */}
            <ForestLayer
                scrollY={scrollYProgress}
                speed={0.5}
                opacity={0.8}
                blur="2px"
                scaleRange={[1.1, 1.5]}
                color="#0d251d" // forest-950
            />

            {/* Front Layer - Passing Branches (Sides) */}
            <SideBranches scrollY={scrollYProgress} />
        </div>
    );
}

function ForestLayer({
    scrollY,
    speed,
    opacity,
    blur,
    scaleRange,
    color
}: {
    scrollY: MotionValue<number>;
    speed: number;
    opacity: number;
    blur: string;
    scaleRange: [number, number];
    color: string;
}) {
    const y = useTransform(scrollY, [0, 1], ["0%", `-${speed * 50}%`]);
    const scale = useTransform(scrollY, [0, 1], scaleRange);

    // Repeat the pattern to cover width

    return (
        <motion.div
            className="absolute bottom-0 left-0 w-[120%] -ml-[10%] h-[60vh] flex items-end"
            style={{ y, scale, opacity, filter: `blur(${blur})` }}
        >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0,100 L10,80 L20,100 L25,70 L30,100 L40,60 L50,100 L65,50 L80,100 L90,80 L100,100 Z" fill={color} />
                {/* Randomize trees */}
                <path d="M10,100 L30,20 L50,100 L70,30 L90,100 L110,40 L130,100 Z" fill={color} fillOpacity="0.7" transform="translate(0, 10)" />
            </svg>
        </motion.div>
    );
}

function SideBranches({ scrollY }: { scrollY: MotionValue<number> }) {
    // Parallax elements that are very close to camera
    // We simulate "passing" multiple sets of trees

    return (
        <div className="absolute inset-0">
            {/* Left Side Passing Trees */}
            {[0, 0.3, 0.6, 0.9].map((offset, i) => (
                <PassingTree key={`l-${i}`} scrollY={scrollY} offset={offset} side="left" />
            ))}
            {/* Right Side Passing Trees */}
            {[0.15, 0.45, 0.75].map((offset, i) => (
                <PassingTree key={`r-${i}`} scrollY={scrollY} offset={offset} side="right" />
            ))}
        </div>
    )
}

function PassingTree({ scrollY, offset, side }: { scrollY: MotionValue<number>, offset: number, side: "left" | "right" }) {
    // Logic: range [offset, offset + 0.3] -> scale 0.5 to 3, opacity 0 -> 1 -> 0
    // effectively "zooming past"

    // We want the tree to appear, get huge, and disappear
    // We map global scroll [0, 1] to a local cycle relative to offset

    // Map scrollY to a repeating 0-1 value based on offset? 
    // Easier: Defines specific lifecycle ranges.
    // However, for a *continuous* feel, we might want a repeating transform.
    // Let's us useTransform with a modulo-like logic if possible, or just huge range.
    // For simplicity in this LP (finite scroll), we'll hardcode ranges.
    // Assuming page is finite.

    // Input Input Range mapping:
    // [offset, offset + 0.1 (approach), offset + 0.3 (pass)]

    const start = offset;
    const peak = offset + 0.15;
    const end = offset + 0.3;

    const scale = useTransform(scrollY, [start, end], [0.5, 4]);
    const opacity = useTransform(scrollY, [start, peak, end], [0, 1, 0]);
    const x = side === "left" ? "-20%" : "20%";
    const originX = side === "left" ? 0 : 1;

    // Only render if within range (optimization)
    // Framer motion handles this well visually but we can't unmount easily without state.

    return (
        <motion.div
            className={`absolute top-1/2 w-[40vw] h-[80vh] ${side === "left" ? "left-0 origin-left" : "right-0 origin-right"}`}
            style={{
                scale,
                opacity,
                originX,
                x,
                translateY: "-50%"
            }}
        >
            {/* Silhouette of a branch/tree side */}
            <svg viewBox="0 0 100 200" preserveAspectRatio="none" className="w-full h-full text-forest-950 fill-current filter blur-sm">
                {side === "left"
                    ? <path d="M0,0 L60,100 L0,200 Z M-10,50 Q40,100 -10,150 Z" />
                    : <path d="M100,0 L40,100 L100,200 Z M110,50 Q60,100 110,150 Z" />
                }
            </svg>
        </motion.div>
    );
}
