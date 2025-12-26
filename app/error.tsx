"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCcw, Home } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-red-500/5 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full glass-card border border-white/10 p-12 rounded-[3rem] text-center space-y-8 backdrop-blur-3xl relative"
            >
                <div className="flex justify-center">
                    <div className="h-20 w-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <AlertCircle className="h-10 w-10 text-red-500/50" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-3xl font-black tracking-tight text-white uppercase">System Failure</h2>
                    <p className="text-white/40 text-sm leading-relaxed">
                        An unexpected error occurred while processing your request. The cinematic experience has encountered a technical limitation.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => reset()}
                        className="bg-white hover:bg-white/90 text-black font-bold h-12 rounded-2xl flex items-center gap-2 group"
                    >
                        <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
                        Retry Operation
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => window.location.href = "/"}
                        className="text-white/40 hover:text-white font-bold h-12 rounded-2xl flex items-center gap-2"
                    >
                        <Home className="h-4 w-4" />
                        Return Home
                    </Button>
                </div>

                {error.digest && (
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest pt-4">
                        Ref ID: {error.digest}
                    </p>
                )}
            </motion.div>
        </div>
    )
}
