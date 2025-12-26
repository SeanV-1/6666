"use client"

import { motion } from "framer-motion"

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full animate-pulse [animation-delay:1s]" />
            </div>

            <div className="relative flex flex-col items-center gap-8">
                {/* Logo Indicator */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative"
                >
                    <div className="h-24 w-24 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-3xl overflow-hidden glass-card">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-white/10"
                        />
                        <span className="text-2xl font-black tracking-tighter text-white z-10">6666</span>
                    </div>

                    {/* Pulsing Ring */}
                    <motion.div
                        animate={{
                            scale: [1, 1.5],
                            opacity: [1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                        className="absolute inset-0 rounded-full border border-white/20"
                    />
                </motion.div>

                {/* Progress Bar Container */}
                <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    />
                </div>

                {/* Status Text */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.4, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-[10px] uppercase font-bold tracking-[0.4em] text-white"
                >
                    Initializing System
                </motion.p>
            </div>
        </div>
    )
}
