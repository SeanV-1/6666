"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import {
    LayoutDashboard,
    CalendarDays,
    CheckSquare,
    BarChart3,
    FileText,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Slack,
    Database,
    PlusCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const mainItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: CalendarDays, label: "Calendar", href: "/calendar" },
    { icon: CheckSquare, label: "My Tasks", href: "/tasks" },
    { icon: BarChart3, label: "Statistics", href: "/stats" },
    { icon: FileText, label: "Documents", href: "/docs" },
]

const integrations = [
    { icon: Slack, label: "Slack", href: "#" },
    { icon: Database, label: "Notion", href: "#" }, // Database icon as notion approx
]

const teams = [
    { label: "SEO", color: "bg-black" },
    { label: "Marketing", color: "bg-black/30" },
]


export function AppSidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = React.useState(false)

    return (
        <TooltipProvider delayDuration={0}>
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 90 : 280 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative z-20 hidden md:flex flex-col h-full my-4 ml-4 rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-white/10"
            >
                <div className="flex h-24 items-center justify-between px-8">
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 font-black text-2xl tracking-tighter text-white cursor-pointer group/logo"
                            onClick={() => window.location.href = '/'}
                        >
                            <div className="h-10 w-10 relative transition-transform duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-[360deg]">
                                <Image
                                    src="/favicon.png"
                                    alt="6666 Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            6666
                        </motion.div>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCollapsed(!collapsed)}
                        className="ml-auto text-white/40 hover:text-white hover:bg-white/10 rounded-full"
                    >
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </div>

                <ScrollArea className="flex-1 px-3 py-4 no-scrollbar">
                    <nav className="flex flex-col gap-2">
                        {mainItems.map((item) => (
                            <Tooltip key={item.label}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "group relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-300",
                                            pathname === item.href ? "text-black" : "text-white/40 hover:text-white"
                                        )}
                                    >
                                        {pathname === item.href && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute inset-0 z-0 rounded-2xl bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                                transition={{ type: "spring", stiffness: 300, damping: 35 }}
                                            />
                                        )}

                                        <item.icon className={cn("relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110", pathname === item.href ? "text-black" : "text-white/40 group-hover:text-white")} />

                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="relative z-10 font-bold tracking-tight"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </Link>
                                </TooltipTrigger>
                                {collapsed && <TooltipContent side="right" className="bg-white text-black font-bold">{item.label}</TooltipContent>}
                            </Tooltip>
                        ))}

                        {!collapsed && <div className="mt-8 mb-2 px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Integrations</div>}
                        {integrations.map((item) => (
                            <Tooltip key={item.label}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
                                            pathname === item.href ? "text-black" : "text-white/40 hover:text-white"
                                        )}
                                    >
                                        {pathname === item.href && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute inset-0 z-0 rounded-2xl bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                                transition={{ type: "spring", stiffness: 300, damping: 35 }}
                                            />
                                        )}

                                        <item.icon className={cn("relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110", pathname === item.href ? "text-black" : "text-white/40 group-hover:text-white")} />

                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="relative z-10 font-bold tracking-tight"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </Link>
                                </TooltipTrigger>
                                {collapsed && <TooltipContent side="right" className="bg-white text-black font-bold">{item.label}</TooltipContent>}
                            </Tooltip>
                        ))}

                        {!collapsed && (
                            <motion.div
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-white/20 hover:text-white cursor-pointer group transition-all"
                                onClick={() => alert("Plugin Marketplace coming soon!")}
                            >
                                <PlusCircle className="h-5 w-5 opacity-40 group-hover:opacity-100" />
                                <span className="tracking-tight">Add new plugin</span>
                            </motion.div>
                        )}

                        {!collapsed && <div className="mt-8 mb-2 px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Teams</div>}
                        {!collapsed && teams.map((team) => (
                            <motion.div
                                key={team.label}
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-white/30 hover:text-white cursor-pointer group transition-all"
                            >
                                <div className={cn("h-2.5 w-2.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)] bg-white/20 group-hover:bg-white")} />
                                <span className="tracking-tight">{team.label}</span>
                            </motion.div>
                        ))}
                    </nav>
                </ScrollArea>

                <div className="p-4 mt-auto">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/settings"
                                className={cn(
                                    "group relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-300",
                                    pathname === "/settings" ? "text-black" : "text-white/40 hover:text-white"
                                )}
                            >
                                {pathname === "/settings" && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 z-0 rounded-2xl bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                        transition={{ type: "spring", stiffness: 300, damping: 35 }}
                                    />
                                )}
                                <Settings className={cn("relative z-10 h-5 w-5 transition-transform duration-300 group-hover:rotate-90", pathname === "/settings" ? "text-black" : "text-white/40 group-hover:text-white")} />
                                {!collapsed && <span className="relative z-10 font-bold tracking-tight">Settings</span>}
                            </Link>
                        </TooltipTrigger>
                        {collapsed && <TooltipContent side="right" className="bg-white text-black font-bold">Settings</TooltipContent>}
                    </Tooltip>

                    {!collapsed && (
                        <div
                            className="mt-8 flex flex-col items-center justify-center gap-2 opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-pointer group/footer-logo"
                            onClick={() => window.location.href = '/'}
                        >
                            <div className="h-12 w-12 relative grayscale contrast-125 transition-all duration-300 group-hover/footer-logo:grayscale-0 group-hover/footer-logo:scale-110">
                                <Image
                                    src="/favicon.png"
                                    alt="Logo Footer"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-[10px] font-black tracking-[0.3em] uppercase marker:text-white">Est. 2025</span>
                        </div>
                    )}
                </div>
            </motion.aside>
        </TooltipProvider>
    )
}
