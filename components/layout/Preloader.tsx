"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function Preloader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0b]"
        >
            {/* Background elements to match the theme */}
            <div className="absolute inset-0 bg-noise opacity-[0.03]" />
            <div className="absolute inset-0 bg-gradient-abstract opacity-50" />

            <div className="relative flex flex-col items-center gap-12">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: [0.8, 1.1, 1],
                        opacity: 1
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        times: [0, 0.7, 1]
                    }}
                    className="relative"
                >
                    {/* Glowing effect behind logo */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-[-20px] bg-white/10 blur-[40px] rounded-full"
                    />

                    <div className="h-32 w-32 relative grayscale brightness-150 contrast-125">
                        <Image
                            src="/favicon.png"
                            alt="6666 Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </motion.div>

                <div className="flex flex-col items-center gap-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-4xl font-black tracking-[0.5em] text-white uppercase ml-[0.5em]"
                    >
                        6666
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                            delay: 1,
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="flex items-center gap-2"
                    >
                        <span className="text-[10px] font-medium tracking-[0.3em] text-white/40 uppercase">
                            Initializing Systems
                        </span>
                        <span className="flex gap-1">
                            <span className="h-0.5 w-0.5 rounded-full bg-white/40" />
                            <span className="h-0.5 w-0.5 rounded-full bg-white/40" />
                            <span className="h-0.5 w-0.5 rounded-full bg-white/40" />
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Cinematic bar at the bottom */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
        </motion.div>
    )
}
