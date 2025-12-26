"use client"

import { Header } from "@/components/layout/Header"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const months = ["December 2025"]

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<number | null>(24)

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <Header title="Calendar" />
            <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-bold text-white tracking-tight">{months[0]}</h2>
                            <p className="text-sm text-white/40">You have 4 events scheduled for today.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1">
                                <Button variant="ghost" size="icon" className="h-10 w-10 text-white/40 hover:text-white rounded-xl"><ChevronLeft className="h-5 w-5" /></Button>
                                <Button variant="ghost" className="px-6 text-sm font-bold text-white uppercase tracking-wider">Today</Button>
                                <Button variant="ghost" size="icon" className="h-10 w-10 text-white/40 hover:text-white rounded-xl"><ChevronRight className="h-5 w-5" /></Button>
                            </div>
                            <Button className="bg-white text-black hover:bg-white/90 font-bold px-6 rounded-2xl h-12 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Event
                            </Button>
                        </div>
                    </div>

                    <div className="glass-card rounded-[2.5rem] border border-white/10 overflow-hidden">
                        <div className="grid grid-cols-7 border-b border-white/10 bg-white/5">
                            {days.map((day) => (
                                <div key={day} className="py-4 text-center text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 grid-rows-5 h-[600px]">
                            {Array.from({ length: 35 }).map((_, i) => {
                                const dayNum = i - 0 // Offset for Mon start
                                const isCurrentMonth = dayNum > 0 && dayNum <= 31
                                const isToday = dayNum === 24

                                return (
                                    <motion.div
                                        key={i}
                                        whileHover={isCurrentMonth ? { backgroundColor: "rgba(255,255,255,0.02)" } : {}}
                                        onClick={() => isCurrentMonth && setSelectedDate(dayNum)}
                                        className={cn(
                                            "relative p-4 border-r border-b border-white/5 last:border-r-0 cursor-pointer transition-colors",
                                            !isCurrentMonth && "opacity-20 pointer-events-none bg-black/20",
                                            selectedDate === dayNum && "bg-white/[0.03]"
                                        )}
                                    >
                                        <span className={cn(
                                            "text-sm font-bold",
                                            isToday ? "text-white flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]" : "text-white/40"
                                        )}>
                                            {isCurrentMonth ? dayNum : ""}
                                        </span>

                                        {dayNum === 24 && (
                                            <div className="mt-4 space-y-1">
                                                <div className="px-2 py-1 rounded-lg bg-white/10 border border-white/10 text-[9px] font-bold text-white truncate">
                                                    Sprint Planning
                                                </div>
                                                <div className="px-2 py-1 rounded-lg bg-blue-500/20 border border-blue-500/20 text-[9px] font-bold text-blue-400 truncate">
                                                    Design Sync
                                                </div>
                                            </div>
                                        )}
                                        {dayNum === 26 && (
                                            <div className="mt-4">
                                                <div className="px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-white/40 truncate">
                                                    Holiday
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { cn } from "@/lib/utils"
