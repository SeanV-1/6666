"use client"

import { Header } from "@/components/layout/Header"
import { motion } from "framer-motion"
import { FileText, Search, MoreVertical, File, Clock, Star, Folder } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const documents = [
    { title: "Project Brief - Q1", type: "PDF", date: "2h ago", size: "1.2 MB", starred: true },
    { title: "Design System Guidelines", type: "DOCX", date: "5h ago", size: "3.4 MB", starred: false },
    { title: "Marketing Strategy 2025", type: "PDF", date: "Yesterday", size: "5.1 MB", starred: true },
    { title: "Team Meeting Notes", type: "TXT", date: "Dec 20, 2025", size: "12 KB", starred: false },
    { title: "API Documentation", type: "PDF", date: "Dec 18, 2025", size: "2.8 MB", starred: false },
]

export default function DocsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <Header title="Documents" />
            <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
                <div className="max-w-6xl mx-auto space-y-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-bold text-white tracking-tight">Your Documents</h2>
                            <p className="text-sm text-white/40">Manage and organize your project files.</p>
                        </div>
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                            <Input
                                placeholder="Search documents..."
                                className="pl-11 bg-white/5 border-white/10 text-white rounded-2xl h-12 focus:ring-1 focus:ring-white/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: "All Files", icon: FileText, count: 124, active: true },
                            { label: "Recent", icon: Clock, count: 12, active: false },
                            { label: "Starred", icon: Star, count: 8, active: false },
                            { label: "Folders", icon: Folder, count: 5, active: false },
                        ].map((item) => (
                            <motion.div
                                key={item.label}
                                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
                                className={cn(
                                    "p-6 rounded-[2rem] border transition-all cursor-pointer space-y-4",
                                    item.active ? "bg-white/10 border-white/20 shadow-lg" : "bg-white/[0.02] border-white/5"
                                )}
                            >
                                <div className={cn(
                                    "h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg",
                                    item.active ? "bg-white text-black" : "bg-white/5 text-white/40"
                                )}>
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className={cn("font-bold text-sm", item.active ? "text-white" : "text-white/40")}>{item.label}</p>
                                    <p className="text-xs text-white/20">{item.count} items</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="glass-card rounded-[2.5rem] border border-white/10 overflow-hidden">
                        <div className="grid grid-cols-12 px-8 py-4 bg-white/5 border-b border-white/10 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                            <div className="col-span-6">Name</div>
                            <div className="col-span-2">Type</div>
                            <div className="col-span-2">Date</div>
                            <div className="col-span-2 text-right">Size</div>
                        </div>
                        <div className="divide-y divide-white/5">
                            {documents.map((doc, i) => (
                                <motion.div
                                    key={doc.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="grid grid-cols-12 px-8 py-5 hover:bg-white/[0.02] transition-colors cursor-pointer group"
                                >
                                    <div className="col-span-6 flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                                            <File className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm font-bold text-white group-hover:text-white transition-colors">{doc.title}</span>
                                        {doc.starred && <Star className="h-3 w-3 fill-white text-white opacity-40" />}
                                    </div>
                                    <div className="col-span-2 flex items-center text-xs font-bold text-white/20 uppercase tracking-widest">{doc.type}</div>
                                    <div className="col-span-2 flex items-center text-xs text-white/40">{doc.date}</div>
                                    <div className="col-span-2 flex items-center justify-end text-xs text-white/40 font-mono">{doc.size}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { cn } from "@/lib/utils"
