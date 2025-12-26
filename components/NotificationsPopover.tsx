"use client"

import * as React from "react"
import { Bell, Check, Info, AlertTriangle, UserPlus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const notifications = [
    {
        id: 1,
        type: "info",
        icon: UserPlus,
        title: "New Team Member",
        message: "Alex M. joined the SEO team.",
        time: "2m ago",
        unread: true
    },
    {
        id: 2,
        type: "success",
        icon: Check,
        title: "Task Completed",
        message: "Design System Update is now done.",
        time: "1h ago",
        unread: true
    },
    {
        id: 3,
        type: "warning",
        icon: AlertTriangle,
        title: "Deadline Approaching",
        message: "Marketing Strategy due tomorrow.",
        time: "3h ago",
        unread: false
    }
]

export function NotificationsPopover({ children }: { children: React.ReactNode }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                className="w-80 bg-black/40 backdrop-blur-3xl border-white/10 p-0 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50"
                align="end"
                sideOffset={20}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">Notifications</span>
                        <span className="px-1.5 py-0.5 rounded-full bg-white text-[10px] text-black font-black">2</span>
                    </div>
                    <button className="text-[10px] font-bold text-white/40 uppercase tracking-wider hover:text-white transition-colors">Mark all as read</button>
                </div>

                <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                    {notifications.map((notification, i) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "p-5 border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer group relative",
                                notification.unread && "bg-white/[0.02]"
                            )}
                        >
                            {notification.unread && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                            )}
                            <div className="flex gap-4">
                                <div className={cn(
                                    "h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                                    notification.type === "info" && "bg-blue-500/20 text-blue-400",
                                    notification.type === "success" && "bg-green-500/20 text-green-400",
                                    notification.type === "warning" && "bg-yellow-500/20 text-yellow-400"
                                )}>
                                    <notification.icon className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-xs font-bold text-white group-hover:text-white transition-colors">{notification.title}</p>
                                        <span className="text-[10px] text-white/20 font-medium">{notification.time}</span>
                                    </div>
                                    <p className="text-xs text-white/40 leading-relaxed font-medium">{notification.message}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="p-4 bg-white/5 text-center border-t border-white/5">
                    <button className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] hover:text-white hover:tracking-[0.3em] transition-all">View all notifications</button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
