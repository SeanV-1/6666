"use client";

import { Header } from "@/components/layout/Header"
import { OverviewCard } from "@/components/dashboard/OverviewCard"
import { WeeklyProgressChart } from "@/components/dashboard/WeeklyProgressChart"
import { MonthProgressChart } from "@/components/dashboard/MonthProgressChart"
import { GoalsCard } from "@/components/dashboard/GoalsCard"
import { TaskSection } from "@/components/dashboard/TaskSection"
import { ProjectsRow } from "@/components/dashboard/ProjectsRow"
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore"
import Image from "next/image"
import { ProjectModal } from "@/components/ProjectModal"
import { useState } from "react"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const
        }
    }
};

export default function DashboardPage() {
    const { user } = useStore()
    const [projectModalOpen, setProjectModalOpen] = useState(false)

    return (
        <div className="flex flex-col h-full">
            <Header title={`Hi, ${user.name.split(' ')[0]}!`} />
            <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-6 no-scrollbar [will-change:transform]">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-[1600px] mx-auto pb-20"
                >
                    {/* Row 1 */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-12 md:col-span-4 lg:col-span-3 h-full"
                    >
                        <div className="card-glass h-full rounded-[2.5rem] overflow-hidden">
                            <OverviewCard />
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="col-span-12 md:col-span-8 lg:col-span-6 h-full min-h-[320px]"
                    >
                        <div className="card-glass h-full rounded-[2.5rem] overflow-hidden p-1">
                            <WeeklyProgressChart />
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="col-span-12 md:col-span-6 lg:col-span-3 h-full"
                    >
                        <div className="card-glass h-full rounded-[2.5rem] overflow-hidden">
                            <MonthProgressChart />
                        </div>
                    </motion.div>

                    {/* Row 2 */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-12 md:col-span-4 lg:col-span-3 h-full min-h-[300px]"
                    >
                        <div className="card-glass h-full rounded-[2.5rem] overflow-hidden">
                            <GoalsCard />
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="col-span-12 md:col-span-8 lg:col-span-6 h-full"
                    >
                        <div className="card-glass h-full rounded-[2.5rem] overflow-hidden">
                            <TaskSection />
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="col-span-12 md:col-span-6 lg:col-span-3 h-full flex flex-col gap-6"
                    >
                        <div
                            onClick={() => setProjectModalOpen(true)}
                            className="card-glass flex-1 rounded-[2.5rem] border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center p-6 text-muted-foreground cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                className="h-14 w-14 rounded-full bg-white shadow-lg flex items-center justify-center mb-4 transition-transform"
                            >
                                <span className="text-3xl text-black font-light">+</span>
                            </motion.div>
                            <span className="font-medium text-white/70">Create New Project</span>
                        </div>
                    </motion.div>

                    {/* Row 3 */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-12 pt-4"
                    >
                        <ProjectsRow />
                    </motion.div>

                    {/* Logo Footer */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-12 py-20 flex flex-col items-center justify-center gap-6 opacity-20 hover:opacity-100 transition-all duration-1000 cursor-pointer group/footer"
                        onClick={() => window.location.href = '/'}
                    >
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="flex flex-col items-center gap-4 transition-transform duration-500 group-hover/footer:scale-105">
                            <div className="h-20 w-20 relative grayscale brightness-150 contrast-125 transition-all duration-500 group-hover/footer:grayscale-0 group-hover/footer:brightness-100">
                                <Image
                                    src="/favicon.png"
                                    alt="6666 Brand Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-2xl font-black tracking-[0.5em] text-white uppercase transition-letter-spacing duration-500 group-hover/footer:tracking-[0.7em]">6666</span>
                                <span className="text-[10px] font-medium tracking-[0.3em] text-white/40 uppercase">Beyond Boundaries</span>
                            </div>
                        </div>
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </motion.div>
                </motion.div>
            </div>
            <ProjectModal open={projectModalOpen} onOpenChange={setProjectModalOpen} />
        </div>
    )
}
