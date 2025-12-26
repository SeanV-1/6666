"use client"

import * as React from "react"
import { Search, Command, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function SearchModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const [query, setQuery] = React.useState("")

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl bg-black/40 backdrop-blur-3xl border-white/10 p-0 overflow-hidden rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <DialogTitle className="sr-only">Search</DialogTitle>
                <DialogDescription className="sr-only">Search through your tasks, projects, and goals instantly.</DialogDescription>
                <div className="relative">
                    <div className="flex items-center px-6 py-6 border-b border-white/5">
                        <Search className="h-6 w-6 text-white/40 mr-4" />
                        <input
                            autoFocus
                            placeholder="Search everything..."
                            className="flex-1 bg-transparent border-none text-xl font-medium text-white focus:outline-none placeholder:text-white/20"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                            <Command className="h-3 w-3" />
                            <span>K</span>
                        </div>
                    </div>

                    <div className="p-4 max-h-[400px] overflow-y-auto no-scrollbar">
                        {query ? (
                            <div className="space-y-4 p-4">
                                <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4">Results</div>
                                <div className="text-sm text-white/40 italic">Searching for "{query}"...</div>
                            </div>
                        ) : (
                            <div className="p-8 text-center space-y-6">
                                <Search className="h-12 w-12 text-white/5 mx-auto" />
                                <div className="space-y-1">
                                    <p className="text-white/40 font-medium">Looking for something?</p>
                                    <p className="text-xs text-white/20">Search through your tasks, projects, and goals instantly.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 pt-4">
                                    {["Launch Q4", "Design Review", "API Integration", "Mobile App"].map((term) => (
                                        <button
                                            key={term}
                                            onClick={() => setQuery(term)}
                                            className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-white/40 hover:bg-white/10 hover:text-white transition-all text-left"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="px-6 py-4 bg-white/5 border-t border-white/5 flex items-center justify-between">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <span className="p-1 rounded bg-white/10 text-[10px] text-white/40">↑↓</span>
                                <span className="text-[10px] text-white/20 uppercase font-bold tracking-wider">Navigate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="p-1 rounded bg-white/10 text-[10px] text-white/40">Enter</span>
                                <span className="text-[10px] text-white/20 uppercase font-bold tracking-wider">Select</span>
                            </div>
                        </div>
                        <button onClick={() => onOpenChange(false)} className="text-[10px] text-white/20 uppercase font-bold tracking-wider hover:text-white transition-colors">Close</button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
