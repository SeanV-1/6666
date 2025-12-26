"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useStore } from "@/store/useStore"
import { Folder, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

export function ProjectsRow() {
    const { projects, deleteProject } = useStore()

    return (
        <div className="col-span-1 md:col-span-3 space-y-4">
            <h2 className="text-lg font-medium text-white/90">Last Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        whileHover={{ y: -5 }}
                        className="group overflow-hidden relative card-glass rounded-[2.5rem] shadow-2xl min-h-[160px] flex flex-col justify-between p-6 cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="h-2 w-2 rounded-full bg-white transition-opacity group-hover:opacity-100 opacity-60"
                                    />
                                    <span className="text-xs font-bold text-white/40 group-hover:text-white/60 transition-colors capitalize">{project.status.replace('-', ' ')}</span>
                                </div>
                            </div>

                            <div className="relative h-12 w-12 flex items-center justify-center">
                                <svg className="h-full w-full rotate-[-90deg]">
                                    <circle
                                        cx="24"
                                        cy="24"
                                        r="20"
                                        fill="transparent"
                                        stroke="rgba(255,255,255,0.05)"
                                        strokeWidth="4"
                                    />
                                    <motion.circle
                                        cx="24"
                                        cy="24"
                                        r="20"
                                        fill="transparent"
                                        stroke="white"
                                        strokeWidth="4"
                                        strokeDasharray={125}
                                        initial={{ strokeDashoffset: 125 }}
                                        animate={{ strokeDashoffset: 125 - (125 * project.progress) / 100 }}
                                        transition={{ duration: 1.5, delay: 0.5 + (0.1 * i), ease: "easeOut" }}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="absolute text-[10px] font-bold text-white/50">{project.progress}%</span>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white/10 hover:text-destructive hover:bg-destructive/10 rounded-full opacity-0 group-hover:opacity-100 transition-all absolute top-2 right-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteProject(project.id);
                                }}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>

                        <p className="text-[11px] text-white/30 font-medium line-clamp-2 leading-relaxed">
                            Done: Develop a new plan for Alina's education; Print a new timetable; Buy...
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
