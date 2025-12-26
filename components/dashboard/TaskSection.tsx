"use client"

import { useState } from "react"
import { useStore } from "@/store/useStore"
import { motion, AnimatePresence } from "framer-motion"
import { MoreHorizontal, Calendar as CalendarIcon, ArrowUp, ArrowDown, Plus, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TaskModal } from "@/components/task-modal"
import { format } from "date-fns"

export function TaskSection() {
    const { tasks, deleteTask, moveTask } = useStore()
    const [modalOpen, setModalOpen] = useState(false)
    const [filter, setFilter] = useState("all")

    // Filter tasks that are not done
    const activeTasks = tasks.filter(t => t.status !== 'done')

    return (
        <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white/90">Task In Process</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-full px-4" onClick={() => setModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Task
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                        whileTap={{ scale: 0.98 }}
                        className="col-span-1 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-white transition-all cursor-pointer min-h-[180px] bg-transparent"
                        onClick={() => setModalOpen(true)}
                    >
                        <div className="flex items-center gap-3 text-lg font-medium opacity-40 group-hover:opacity-100 transition-opacity">
                            <Plus className="h-6 w-6 stroke-[3px]" />
                            <span>Add task</span>
                        </div>
                    </motion.div>

                    {activeTasks.map((task, i) => (
                        <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="relative group block"
                        >
                            <Card className="h-full rounded-[2.5rem] border-0 card-glass flex flex-col justify-between overflow-hidden relative min-h-[180px] cursor-pointer">
                                <CardHeader className="flex flex-row items-start justify-between p-6 pb-0">
                                    <motion.button
                                        whileHover={{ scale: 1.2, rotate: 135 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                                        className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-destructive/20 hover:text-destructive transition-colors group/delete"
                                    >
                                        <Plus className="h-5 w-5 rotate-45" />
                                    </motion.button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-white/20 hover:text-white hover:bg-transparent">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl text-white">
                                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); moveTask(task.id, 'done'); }}>Mark Done</DropdownMenuItem>
                                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold text-white/90 leading-tight mb-4 group-hover:text-white transition-colors">{task.title}</h3>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-[11px] text-white/30 font-bold uppercase tracking-wider">{format(new Date(task.dueDate), "dd.MM.yyyy")}</span>
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 10 }}
                                            className="h-10 w-10 rounded-2xl bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                        >
                                            <Bell className="h-4 w-4" />
                                        </motion.div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <TaskModal open={modalOpen} onOpenChange={setModalOpen} />
        </div>
    )
}
