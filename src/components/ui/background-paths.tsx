"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

function FloatingPaths({ position, color = "currentColor" }: { position: number; color?: string }) {
    // Optimization: Use useMemo to prevent recalculating paths on every render
    // Reduction from 36 to 20 paths for significantly better FPS
    const paths = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 8 * position} -${189 + i * 10}C-${
            380 - i * 8 * position
        } -${189 + i * 10} -${312 - i * 8 * position} ${216 - i * 10} ${
            152 - i * 8 * position
        } ${343 - i * 10}C${616 - i * 8 * position} ${470 - i * 10} ${
            684 - i * 8 * position
        } ${875 - i * 10} ${684 - i * 8 * position} ${875 - i * 10}`,
        width: 0.4 + i * 0.04,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 2,
    })), [position]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
                style={{ willChange: "transform" }}
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={color}
                        strokeWidth={path.width}
                        strokeOpacity={0.05 + path.id * 0.02}
                        initial={{ pathLength: 0.3, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0, 0.3, 0],
                        }}
                        transition={{
                            duration: path.duration,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: path.delay,
                        }}
                        // Hardware acceleration force
                        style={{ willChange: "pathLength, opacity" }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <FloatingPaths position={1} color="hsl(220, 90%, 55%)" />
            <FloatingPaths position={-1} color="hsl(220, 90%, 55%)" />
            {/* Gradient mask for smooth blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
        </div>
    );
}
