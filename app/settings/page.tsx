"use client"

import { Header } from "@/components/layout/Header"
import { useStore } from "@/store/useStore"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useRef, ChangeEvent } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
    const { user, updateUser } = useStore()
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [role, setRole] = useState(user.role)
    const [avatar, setAvatar] = useState(user.avatar)
    const [saved, setSaved] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSave = () => {
        updateUser({ name, email, role, avatar })
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const handleFileClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatar(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <Header title="Settings" />
            <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
                <div className="max-w-4xl mx-auto space-y-12 pb-20">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Profile Settings</h2>
                        <div className="glass-card p-8 rounded-[2rem] border border-white/10 space-y-8">
                            <div className="flex items-center gap-8">
                                <div className="relative group">
                                    <Avatar className="h-24 w-24 border-2 border-white/20">
                                        <AvatarImage src={avatar} />
                                        <AvatarFallback className="bg-white/5 text-2xl">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div
                                        onClick={handleFileClick}
                                        className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer text-[10px] font-bold text-white uppercase tracking-wider"
                                    >
                                        Change
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-white">{name}</h3>
                                    <p className="text-sm text-white/40">{role}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-white/40 px-1">Full Name</Label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-white/40 px-1">Email Address</Label>
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-white/40 px-1">Role</Label>
                                    <Input
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-white/40 px-1">Avatar URL</Label>
                                    <Input
                                        value={avatar}
                                        onChange={(e) => setAvatar(e.target.value)}
                                        className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        onClick={handleSave}
                                        disabled={saved}
                                        className={`${saved ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-white/90'} font-bold px-8 rounded-xl h-12 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-colors`}
                                    >
                                        {saved ? 'Changes Saved!' : 'Save Changes'}
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">App Preferences</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="glass-card p-6 rounded-[1.5rem] border border-white/10 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="font-bold text-white">Dark Mode</p>
                                    <p className="text-xs text-white/40">Use dark theme across the app</p>
                                </div>
                                <div className="w-12 h-6 bg-white rounded-full relative p-1 cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full shadow-lg" />
                                </div>
                            </div>
                            <div className="glass-card p-6 rounded-[1.5rem] border border-white/10 flex items-center justify-between opacity-50">
                                <div className="space-y-1">
                                    <p className="font-bold text-white">Notifications</p>
                                    <p className="text-xs text-white/40">Receive real-time updates</p>
                                </div>
                                <div className="w-12 h-6 bg-white/10 rounded-full relative p-1 cursor-not-allowed">
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full shadow-lg" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
