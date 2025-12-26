"use client"

import { useStore, Task } from "@/store/useStore"
import { Header } from "@/components/layout/Header"
import { Plus, X } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const columns = [
    { id: "todo", title: "To Do", color: "bg-secondary" },
    { id: "in-progress", title: "In Progress", color: "bg-primary/20 text-primary" },
    { id: "done", title: "Done", color: "bg-green-500/20 text-green-500" },
]

export default function TasksPage() {
    const { tasks, moveTask, deleteTask } = useStore()

    const getTasksByStatus = (status: string) => tasks.filter((t) => t.status === status)

    return (
        <div className="flex flex-col h-full">
            <Header title="Tasks" />
            <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
                <div className="flex h-full gap-6 min-w-[1000px]">
                    {columns.map((col) => (
                        <div key={col.id} className="flex-1 flex flex-col gap-4 min-w-[300px]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-lg">{col.title}</h3>
                                    <Badge variant="secondary" className="rounded-full px-2">{getTasksByStatus(col.id).length}</Badge>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex-1 bg-muted/20 rounded-xl p-3 border border-dashed border-muted-foreground/25 overflow-y-auto space-y-3">
                                {getTasksByStatus(col.id).map((task) => (
                                    <motion.div
                                        layoutId={task.id}
                                        key={task.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="cursor-grab active:cursor-grabbing"
                                    >
                                        <Card className="hover:border-primary/50 transition-colors">
                                            <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                                                <Badge variant="outline" className="text-[10px] py-0 h-5">{task.priority}</Badge>
                                                <motion.button
                                                    whileHover={{ scale: 1.2, rotate: 90 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => deleteTask(task.id)}
                                                    className="h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
                                                >
                                                    <X className="h-3 w-3" />
                                                </motion.button>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-2">
                                                <h4 className="font-medium text-sm mb-2">{task.title}</h4>
                                                <div className="flex gap-1 flex-wrap">
                                                    {task.tags.map(tag => (
                                                        <span key={tag} className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-sm">{tag}</span>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                                {getTasksByStatus(col.id).length === 0 && (
                                    <div className="h-32 flex items-center justify-center text-muted-foreground text-sm border border-dashed rounded-lg">
                                        No tasks
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
