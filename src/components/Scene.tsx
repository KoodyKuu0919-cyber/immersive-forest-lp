import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function Scene() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Deep Forest Gradient */}
            {/* Deep Forest Gradient - Removed to show video */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950" /> */}

            {/* Comorebi (Sunlight) Beams */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 mix-blend-screen">
                <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[200%] bg-gradient-to-r from-transparent via-forest-100 to-transparent rotate-[-30deg] blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute top-[-50%] right-[-20%] w-[100%] h-[200%] bg-gradient-to-l from-transparent via-forest-200 to-transparent rotate-[20deg] blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
            </div>

            {/* Organic Particles (Spores) */}
            <Particles />

            {/* Fog Layers */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        </div>
    );
}

function Particles() {
    return (
        <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-forest-200 blur-[1px]"
                    style={{
                        width: Math.random() * 4 + 1 + 'px',
                        height: Math.random() * 4 + 1 + 'px',
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        opacity: Math.random() * 0.5 + 0.1,
                    }}
                    animate={{
                        y: [0, -100],
                        x: [0, Math.random() * 50 - 25],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 20,
                    }}
                />
            ))}
        </div>
    );
}
