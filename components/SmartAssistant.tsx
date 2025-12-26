"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, TrendingUp, AlertCircle, CheckCircle2, Zap } from "lucide-react"
import { useStore } from "@/store/useStore"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function SmartAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const pathname = usePathname()
    const { tasks, projects, goals, user, optimizeTasks, syncGoalsWithTasks } = useStore()

    const insights = useMemo(() => {
        const list = []

        // Contextual Awareness
        if (pathname === '/tasks') {
            list.push({
                type: 'context',
                icon: Zap,
                title: 'Queue Analysis',
                description: 'Tasks are currently ordered by creation. Click "Optimize" to let me reorder them by priority.',
                color: 'text-white/60'
            })
        }

        // Task Insights
        const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'done')
        if (overdueTasks.length > 0) {
            list.push({
                type: 'alert',
                icon: AlertCircle,
                title: 'Urgent Attention',
                description: `You have ${overdueTasks.length} overdue tasks that need immediate focus.`,
                color: 'text-destructive'
            })
        }

        // Project Insights
        const lowProgressProjects = projects.filter(p => p.progress < 50 && p.status === 'active')
        if (lowProgressProjects.length > 0) {
            list.push({
                type: 'trending',
                icon: TrendingUp,
                title: 'Momentum Needed',
                description: `"${lowProgressProjects[0].title}" is falling behind. Consider dedicating some time today.`,
                color: 'text-white/60'
            })
        }

        // Goal Insights
        const completedGoals = goals.filter(g => g.completed).length
        if (completedGoals === goals.length && goals.length > 0) {
            list.push({
                type: 'success',
                icon: CheckCircle2,
                title: 'Major Milestone',
                description: "You've crushed all your monthly goals! Time to set some new challenges?",
                color: 'text-white'
            })
        }
        const tasksToSync = goals.some(g => g.title.toLowerCase().includes('tasks') && !g.completed)
        const canSync = tasks.filter(t => t.status === 'done').length >= 3
        if (tasksToSync && canSync) {
            list.push({
                type: 'sync',
                icon: Sparkles,
                title: 'Goal Synchronization',
                description: "You've completed enough tasks to satisfy a monthly goal. Sync now?",
                color: 'text-white/80'
            })
        }

        // Default Daily Briefing
        if (list.length === 0) {
            list.push({
                type: 'briefing',
                icon: Zap,
                title: 'Daily Briefing',
                description: `Morning ${user.name.split(' ')[0]}! You have a clear path today with ${tasks.filter(t => t.status !== 'done').length} active tasks.`,
                color: 'text-white/80'
            })
        }

        return list
    }, [tasks, projects, goals, user, pathname])

    const handleAction = async (type: 'optimize' | 'sync') => {
        setIsProcessing(true)
        // Simulate "Thinking"
        await new Promise(resolve => setTimeout(resolve, 1500))

        if (type === 'optimize') {
            optimizeTasks()
        } else {
            syncGoalsWithTasks()
        }

        setIsProcessing(false)
    }

    return (
        <>
            {/* The Floating Orb */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed bottom-8 right-8 z-[60]"
            >
                <div className="relative group">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 90, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-white/20 blur-2xl rounded-full group-hover:bg-white/40 transition-colors"
                    />

                    <motion.button
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="relative h-14 w-14 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center overflow-hidden border border-white/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20" />
                        <Sparkles className={cn("h-6 w-6 text-black z-10", isProcessing && "animate-pulse")} />
                    </motion.button>

                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform">
                        <span className="text-[10px] font-black text-black">{insights.length}</span>
                    </div>
                </div>
            </motion.div>

            {/* Intelligence Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
                        />
                        <motion.div
                            initial={{ opacity: 0, x: 400, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 400, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-4 bottom-4 top-4 w-[400px] z-[80] overflow-hidden"
                        >
                            <div className="h-full w-full bg-black/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col">
                                <div className="p-8 pb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                                            <Sparkles className={cn("h-4 w-4 text-black", isProcessing && "animate-spin")} />
                                        </div>
                                        <h2 className="text-xl font-black tracking-tight text-white uppercase">6666 Intelligence</h2>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="h-10 w-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                                    >
                                        <X className="h-5 w-5 text-white/40" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto px-8 py-4 no-scrollbar relative">
                                    {isProcessing && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 bg-black/60 backdrop-blur-md z-30 flex flex-col items-center justify-center gap-4"
                                        >
                                            <div className="h-12 w-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Analyzing & Processing</p>
                                        </motion.div>
                                    )}

                                    <div className="space-y-6">
                                        {insights.map((insight, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 + (i * 0.1) }}
                                                className="group p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all hover:bg-white/[0.05]"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className={cn(
                                                        "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                                                        insight.type === 'alert' ? 'bg-destructive/10' : 'bg-white/10'
                                                    )}>
                                                        <insight.icon className={cn("h-5 w-5", insight.color)} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h3 className="font-bold text-white tracking-tight">{insight.title}</h3>
                                                        <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                                                            {insight.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="mt-12">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-[10px] font-black tracking-[0.2em] text-white/20 uppercase">Actions Available</h4>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => handleAction('optimize')}
                                                disabled={isProcessing}
                                                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-[11px] font-bold text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-50"
                                            >
                                                <Zap className="h-3 w-3" />
                                                Optimize Schedule
                                            </button>
                                            <button
                                                onClick={() => handleAction('sync')}
                                                disabled={isProcessing}
                                                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-[11px] font-bold text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-50"
                                            >
                                                <Sparkles className="h-3 w-3" />
                                                Review Goals
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 pt-4">
                                    <div className="p-6 rounded-[1.5rem] bg-white text-black">
                                        <p className="text-[11px] font-black uppercase tracking-wider mb-2 opacity-40">Intelligence Status</p>
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-lg">{isProcessing ? 'Processing...' : 'System Optimal'}</span>
                                            <div className="flex gap-1">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className={cn("h-1 w-4 rounded-full", isProcessing ? "bg-black/10 animate-pulse" : "bg-black/20")} />
                                                ))}
                                                <div className={cn("h-1 w-4 rounded-full bg-black", isProcessing && "animate-bounce")} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
