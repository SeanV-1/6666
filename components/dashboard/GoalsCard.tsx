"use client"

import { Check, Plus, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useStore } from "@/store/useStore"
import { useState } from "react"

export function GoalsCard() {
    const { goals, toggleGoal, addGoal, removeGoal } = useStore()
    const [isAdding, setIsAdding] = useState(false)
    const [newGoal, setNewGoal] = useState("")

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newGoal.trim()) return
        addGoal(newGoal)
        setNewGoal("")
        setIsAdding(false)
    }

    return (
        <Card className="h-full flex flex-col rounded-none bg-transparent border-none shadow-none">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-medium text-white/90">Month Goals</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all" onClick={() => setIsAdding(!isAdding)}>
                    <Plus className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="flex-1 space-y-4 pt-2">
                {isAdding && (
                    <motion.form
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleAdd}
                        className="mb-4"
                    >
                        <input
                            autoFocus
                            className="w-full bg-white/5 border border-white/10 rounded-xl text-sm px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-all"
                            placeholder="Enter goal..."
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                            onBlur={() => setIsAdding(false)}
                        />
                    </motion.form>
                )}
                {goals.map((goal, i) => (
                    <motion.div
                        key={goal.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-4 group cursor-pointer"
                        onClick={() => toggleGoal(goal.id)}
                    >
                        <div
                            className={cn(
                                "mt-0.5 h-6 w-6 shrink-0 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300",
                                goal.completed ? "bg-white border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "group-hover:border-white/40"
                            )}
                        >
                            <Check className={cn("h-3.5 w-3.5 text-black opacity-0 transition-opacity", goal.completed && "opacity-100")} />
                        </div>
                        <span
                            className={cn(
                                "text-sm font-medium leading-tight pt-1 flex-1 transition-all duration-300",
                                goal.completed ? "text-white/20 line-through decoration-white/30" : "text-white/70 group-hover:text-white"
                            )}
                        >
                            {goal.title}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white/10 hover:text-destructive hover:bg-destructive/10 rounded-full opacity-0 group-hover:opacity-100 transition-all ml-auto"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeGoal(goal.id);
                            }}
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </motion.div>
                ))}
            </CardContent>
        </Card>
    )
}
