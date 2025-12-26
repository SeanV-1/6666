import { memo, useState } from "react"
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    YAxis,
    CartesianGrid
} from "recharts"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const data = [
    { day: "M", sport: 40, study: 24 },
    { day: "T", sport: 30, study: 13 },
    { day: "W", sport: 20, study: 58 },
    { day: "T", sport: 27, study: 39 },
    { day: "F", sport: 18, study: 48 },
    { day: "S", sport: 23, study: 38 },
    { day: "S", sport: 34, study: 43 },
]

export const WeeklyProgressChart = memo(function WeeklyProgressChart() {
    const [selectedDayIndex, setSelectedDayIndex] = useState(5); // Default to Saturday

    return (
        <Card className="col-span-1 h-full rounded-none bg-transparent border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium text-white/90">Weekly progress</CardTitle>
                    <div className="flex items-center gap-4 text-xs font-medium text-white/40">
                        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-white" /> Sport</div>
                        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-white/30" /> Study</div>
                    </div>
                </div>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                >
                    <Badge variant="secondary" className="bg-white/10 text-white border-white/10">
                        +24%
                    </Badge>
                </motion.div>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                                    borderColor: "rgba(255, 255, 255, 0.1)",
                                    borderRadius: "16px",
                                    backdropFilter: "blur(12px)",
                                    color: "#fff"
                                }}
                                itemStyle={{ color: "#fff" }}
                                cursor={{ stroke: "rgba(255, 255, 255, 0.2)", strokeWidth: 1, strokeDasharray: "4 4" }}
                            />
                            <XAxis hide />
                            <YAxis
                                stroke="rgba(255, 255, 255, 0.2)"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}h`}
                            />
                            <Line
                                type="monotone"
                                dataKey="sport"
                                stroke="#fff"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 6, fill: "#fff", strokeWidth: 0 }}
                                animationDuration={2000}
                            />
                            <Line
                                type="monotone"
                                dataKey="study"
                                stroke="rgba(255, 255, 255, 0.3)"
                                strokeWidth={2}
                                strokeDasharray="6 6"
                                dot={false}
                                activeDot={{ r: 6, fill: "rgba(255, 255, 255, 0.3)", strokeWidth: 0 }}
                                animationDuration={2000}
                                animationBegin={300}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-between px-4 mt-2">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                        <div
                            key={i}
                            onClick={() => setSelectedDayIndex(i)}
                            className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 cursor-pointer",
                                i === selectedDayIndex ? "bg-white text-black scale-110 shadow-lg" : "text-white/20 hover:text-white/50"
                            )}>
                            {day}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
})
