"use client"

import { Search, Bell, Plus, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useStore } from '@/store/useStore'
import { useState } from "react"
import { SearchModal } from "@/components/SearchModal"
import { NotificationsPopover } from "@/components/NotificationsPopover"
import { TaskModal } from "@/components/task-modal"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const mainItems = [
    { icon: Search, label: "Search", onClick: (setSearchOpen: any) => setSearchOpen(true) },
    { label: "Dashboard", href: "/" },
    { label: "Calendar", href: "/calendar" },
    { label: "Tasks", href: "/tasks" },
    { label: "Statistics", href: "/stats" },
    { label: "Documents", href: "/docs" },
]

export function Header({ title }: { title?: string }) {
    const { user } = useStore()
    const pathname = usePathname()
    const [searchOpen, setSearchOpen] = useState(false)
    const [createOpen, setCreateOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 flex h-20 items-center justify-between px-4 md:px-8 bg-transparent">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-white/40 hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>

                {/* Mobile Logo */}
                <div className="md:hidden flex items-center gap-2" onClick={() => window.location.href = '/'}>
                    <div className="h-8 w-8 relative">
                        <Image src="/favicon.png" alt="6666" fill className="object-contain" />
                    </div>
                </div>

                <h1 className="text-xl font-bold tracking-tight text-white/90 hidden md:block">{title || "Dashboard"}</h1>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        className="bg-white hover:bg-white/90 text-black rounded-full px-4 md:px-6 flex items-center gap-2 h-10 border-0 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        onClick={() => setCreateOpen(true)}
                    >
                        <Plus className="h-4 w-4" />
                        <span className="font-bold text-xs uppercase tracking-wider hidden md:inline">Create</span>
                    </Button>
                </motion.div>

                <div className="hidden md:flex items-center gap-6">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="text-white/40 hover:text-white transition-all"
                        onClick={() => setSearchOpen(true)}
                    >
                        <Search className="h-5 w-5" />
                    </motion.button>

                    <NotificationsPopover>
                        <motion.button whileHover={{ scale: 1.1 }} className="relative text-white/40 hover:text-white transition-all">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] border-2 border-black" />
                        </motion.button>
                    </NotificationsPopover>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border border-white/10">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-black/90 border-white/10 backdrop-blur-xl text-white" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal text-white">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                <p className="text-xs leading-none text-white/40">
                                    {user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="hover:bg-white/10 cursor-pointer" onClick={() => window.location.href = '/settings'}>Profile</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-white/10 cursor-pointer" onClick={() => window.location.href = '/settings'}>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="text-destructive focus:text-destructive hover:bg-destructive/10 cursor-pointer">
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] md:hidden"
                    >
                        {/* Backdrop Blur Layer */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl" />

                        {/* Animated Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black/80 pointer-events-none" />

                        <div className="relative h-full flex flex-col p-8">
                            <div className="flex items-center justify-between mb-20">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-3 font-black text-2xl tracking-tighter text-white"
                                >
                                    <div className="h-10 w-10 relative">
                                        <Image src="/favicon.png" alt="6666" fill className="object-contain" />
                                    </div>
                                    <span className="tracking-[-0.05em] uppercase">6666</span>
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10"
                                >
                                    <X className="h-6 w-6 text-white" />
                                </motion.button>
                            </div>

                            <nav className="flex flex-col gap-4">
                                {mainItems.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.1 + (i * 0.08),
                                            duration: 0.8,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                    >
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={cn(
                                                    "text-5xl font-black transition-all block py-2",
                                                    pathname === item.href
                                                        ? "text-white scale-105 origin-left"
                                                        : "text-white/20 hover:text-white/40"
                                                )}
                                            >
                                                <span className="relative inline-block tracking-tighter">
                                                    {item.label}
                                                    {pathname === item.href && (
                                                        <motion.div
                                                            layoutId="mobile-active-nav"
                                                            className="absolute -bottom-1 left-0 right-0 h-1 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                                        />
                                                    )}
                                                </span>
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    item.onClick?.(setSearchOpen);
                                                    setMobileMenuOpen(false);
                                                }}
                                                className="text-5xl font-black text-white/20 tracking-tighter block py-2 active:text-white transition-colors"
                                            >
                                                {item.label}
                                            </button>
                                        )}
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-auto"
                            >
                                <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent mb-10" />
                                <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 p-4 rounded-[2rem] backdrop-blur-md">
                                    <Avatar className="h-14 w-14 border-2 border-white/10">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="bg-white/10 text-white font-bold">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="text-white font-bold text-lg tracking-tight leading-none mb-1">{user.name}</p>
                                        <p className="text-white/30 text-xs font-medium uppercase tracking-[0.2em]">{user.role || 'Member'}</p>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        className="h-10 w-10 flex items-center justify-center text-white/30 hover:text-white"
                                        onClick={() => window.location.href = '/settings'}
                                    >
                                        <div className="h-2 w-2 rounded-full bg-white/40" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
            <TaskModal open={createOpen} onOpenChange={setCreateOpen} />
        </header>
    )
}
