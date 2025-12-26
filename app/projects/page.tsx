import { Header } from "@/components/layout/Header"

export default function ProjectsPage() {
    return (
        <div className="flex flex-col h-full">
            <Header title="Projects" />
            <div className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-4">All Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Re-use Project Cards here logic if needed, for now placeholder */}
                    <div className="h-64 rounded-xl border border-dashed flex items-center justify-center text-muted-foreground">
                        Project List
                    </div>
                </div>
            </div>
        </div>
    )
}
