"use client"

import { useState } from "react"
import { useStore } from "@/store/useStore"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ProjectModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const { addProject } = useStore()
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState<'active' | 'on-hold'>('active')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title) return

        addProject({
            title,
            status,
            progress: 0
        })

        setTitle("")
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-black/90 border-white/10 backdrop-blur-3xl text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase tracking-widest">New Project</DialogTitle>
                    <DialogDescription className="text-white/40">
                        Define the vision for your next big thing.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-6 py-8">
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-white/40">Project Name</Label>
                        <Input
                            id="title"
                            placeholder="e.g. Phoenix Launch"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-white/5 border-white/10 h-12 rounded-2xl focus:ring-white/20 transition-all text-lg font-medium"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Initial Status</Label>
                        <select
                            className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 appearance-none"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as any)}
                        >
                            <option value="active" className="bg-black">Active</option>
                            <option value="on-hold" className="bg-black">On Hold</option>
                        </select>
                    </div>
                </form>
                <DialogFooter className="gap-3">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="rounded-2xl h-12 px-8 font-bold border-white/5 hover:bg-white/5"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-white text-black hover:bg-white/90 rounded-2xl h-12 px-10 font-black uppercase tracking-widest"
                    >
                        Create Project
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
