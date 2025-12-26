"use client"

import React, { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function CursorSpotlight() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth out the movement
    const springConfig = { damping: 25, stiffness: 150 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY, isVisible])

    return (
        <motion.div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 1s ease",
            }}
        >
            <motion.div
                className="absolute h-[600px] w-[600px] rounded-full"
                style={{
                    x: x,
                    y: y,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />
        </motion.div>
    )
}
