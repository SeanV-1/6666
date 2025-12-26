import { memo } from "react"
import {
    RadialBarChart,
    RadialBar,
    ResponsiveContainer,
    PolarAngleAxis
} from "recharts"
import { Download, Share2, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const data = [
    { name: "Project", value: 80, fill: "#1a1a1e" },
    { name: "Study", value: 65, fill: "#a1a1aa" },
    { name: "Sport", value: 50, fill: "#d4d4d8" },
]

export const MonthProgressChart = memo(function MonthProgressChart() {
    return (
        <Card className="col-span-1 flex flex-col justify-between rounded-none bg-transparent border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                <CardTitle className="text-lg font-bold text-white/90">Month progress</CardTitle>
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <BarChart3 className="h-5 w-5 text-white/40" />
                </div>
            </CardHeader>
            <CardContent className="px-6 py-0">
                <p className="text-xs font-semibold text-white/30 mb-6">
                    <span className="text-white font-bold">+20%</span> compared to last month*
                </p>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-4 text-[10px] font-bold text-white/30 w-24">
                        <div className="flex items-center gap-3 transition-colors hover:text-white cursor-pointer group">
                            <motion.div whileHover={{ scale: 1.5 }} className="w-2 h-2 rounded-full bg-white" /> Sport
                        </div>
                        <div className="flex items-center gap-3 transition-colors hover:text-white cursor-pointer group">
                            <motion.div whileHover={{ scale: 1.5 }} className="w-2 h-2 rounded-full bg-white/40" /> Study
                        </div>
                        <div className="flex items-center gap-3 transition-colors hover:text-white cursor-pointer group">
                            <motion.div whileHover={{ scale: 1.5 }} className="w-2 h-2 rounded-full bg-white/10 border border-white/20" /> Project
                        </div>
                    </div>

                    <div className="h-[180px] w-full relative">
                        <div className="absolute inset-0 flex items-center justify-center flex-col z-10 pointer-events-none">
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-2xl font-black tracking-tight text-white"
                            >
                                120%
                            </motion.span>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                                innerRadius="40%"
                                outerRadius="100%"
                                data={data.map(d => ({
                                    ...d,
                                    fill: d.name === "Project" ? "#fff" : d.name === "Study" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"
                                }))}
                                startAngle={90}
                                endAngle={-270}
                                barSize={8}
                            >
                                <RadialBar
                                    background={{ fill: 'rgba(255,255,255,0.03)' }}
                                    dataKey="value"
                                    cornerRadius={10}
                                    animationDuration={2000}
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex gap-3">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white hover:text-black shadow-lg transition-all">
                    <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="flex-1 rounded-full h-10 border-white/10 bg-white/5 text-white gap-2 font-bold text-[10px] uppercase tracking-wider hover:bg-white hover:text-black transition-all">
                    Download Report
                    <Download className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
})
