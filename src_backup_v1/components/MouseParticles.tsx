import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

export function MouseParticles() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse movement for "guide" light
    const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    useEffect(() => {
        // Initialize random particles
        const count = 25;
        const newParticles = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // %
            y: Math.random() * 100, // %
            size: Math.random() * 4 + 2, // px
            duration: Math.random() * 10 + 10, // s
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
            {/* Mouse Follower Light */}
            <motion.div
                style={{ x: smoothX, y: smoothY }}
                className="absolute w-[300px] h-[300px] bg-forest-300/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
            />

            {/* Floating Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-forest-200/60 blur-[1px]"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0.5],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Interactive Dust (Follows mouse slightly) */}
            <motion.div
                style={{ x: smoothX, y: smoothY }}
                className="absolute w-full h-full -top-1/2 -left-1/2"
            >
                {/* Can add more complex interactive particles here if needed, 
                     but keeping it simple for performance first */}
            </motion.div>
        </div>
    );
}
