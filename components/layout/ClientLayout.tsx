"use client"

import React, { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { AnimatedLayout } from "@/components/AnimatedLayout"
import { CursorSpotlight } from "@/components/CursorSpotlight"
import { Preloader } from "@/components/layout/Preloader"
import { SmartAssistant } from "@/components/SmartAssistant"

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
            <AnimatePresence mode="wait">
                {loading && <Preloader key="preloader" />}
            </AnimatePresence>

            <div className="bg-noise" />
            <div className="bg-gradient-abstract" />
            <CursorSpotlight />

            <div className="flex h-screen w-full items-center justify-center p-0 md:p-8">
                {/* The Main "Screen" Container */}
                <div className="glass-container flex h-full w-full max-w-[1800px] overflow-hidden relative rounded-none md:rounded-[3rem]">
                    <AppSidebar />
                    <div className="flex flex-1 flex-col overflow-hidden relative z-10">
                        <AnimatedLayout>{children}</AnimatedLayout>
                    </div>
                </div>
            </div>
            <SmartAssistant />
        </ThemeProvider>
    )
}
