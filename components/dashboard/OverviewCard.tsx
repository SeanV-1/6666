"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Share2, MoreVertical } from "lucide-react"

export function OverviewCard() {
    return (
        <Card className="col-span-1 h-full bg-transparent border-none relative overflow-hidden flex flex-col justify-between rounded-none shadow-none">
            <div className="absolute top-0 right-0 p-6 opacity-30">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-48 h-48 bg-white/10 blur-3xl rounded-full translate-x-20 -translate-y-20"
                />
            </div>
            <CardContent className="p-6 relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white/90">Overall Information</h3>
                    <div className="flex items-center gap-3">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-white/40 hover:text-white cursor-pointer"><Share2 className="h-4 w-4" /></motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-white/40 hover:text-white cursor-pointer"><MoreVertical className="h-4 w-4" /></motion.div>
                    </div>
                </div>

                <div className="flex items-center gap-12 mt-8">
                    <div className="flex flex-col">
                        <motion.span
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-6xl font-bold tracking-tighter text-white"
                        >
                            43
                        </motion.span>
                        <span className="text-[13px] text-white/30 font-medium leading-tight mt-1 uppercase tracking-[0.1em]">Tasks done<br />for all time</span>
                    </div>
                    <div className="flex flex-col">
                        <motion.span
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl font-bold tracking-tighter text-white"
                        >
                            2
                        </motion.span>
                        <span className="text-[13px] text-white/30 font-medium leading-tight mt-1 uppercase tracking-[0.1em]">projects are<br />stopped</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8 pb-2">
                    {[
                        { label: "Projects", val: 28, icon: "◉" },
                        { label: "In Progress", val: 14, icon: "◌" },
                        { label: "Completed", val: 11, icon: "◎" }
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            whileHover={{ y: -5, scale: 1.05 }}
                            className="bg-white/95 rounded-[1.5rem] p-4 flex flex-col items-center justify-center gap-1 shadow-xl h-32"
                        >
                            <span className="text-black/80 text-2xl mb-1">{item.icon}</span>
                            <span className="text-2xl font-bold text-black">{item.val}</span>
                            <span className="text-[10px] text-black/40 font-bold uppercase tracking-[0.1em] text-center leading-tight">{item.label}</span>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
