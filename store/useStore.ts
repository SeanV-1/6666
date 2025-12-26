import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

export type Task = {
    id: string
    title: string
    status: 'todo' | 'in-progress' | 'done'
    priority: 'low' | 'medium' | 'high'
    dueDate: string
    tags: string[]
}

export type User = {
    name: string
    email: string
    avatar: string
    role: string
}

export type Project = {
    id: string
    title: string
    status: 'active' | 'completed' | 'on-hold'
    progress: number
}

export type Goal = {
    id: string
    title: string
    completed: boolean
}

interface StoreState {
    tasks: Task[]
    projects: Project[]
    goals: Goal[]
    user: User
    addTask: (task: Omit<Task, 'id'>) => void
    updateTask: (id: string, updates: Partial<Task>) => void
    deleteTask: (id: string) => void
    moveTask: (id: string, newStatus: Task['status']) => void
    toggleGoal: (id: string) => void
    addGoal: (title: string) => void
    removeGoal: (id: string) => void
    addProject: (project: Omit<Project, 'id'>) => void
    deleteProject: (id: string) => void
    updateUser: (updates: Partial<User>) => void
    optimizeTasks: () => void
    syncGoalsWithTasks: () => void
}

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            tasks: [
                {
                    id: '1',
                    title: 'Design System Update',
                    status: 'in-progress',
                    priority: 'high',
                    dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
                    tags: ['Design', 'Core']
                },
                {
                    id: '2',
                    title: 'Q4 Marketing Strategy',
                    status: 'todo',
                    priority: 'medium',
                    dueDate: new Date(Date.now() + 172800000).toISOString(),
                    tags: ['Marketing']
                },
                {
                    id: '3',
                    title: 'Fix Authentication Bug',
                    status: 'done',
                    priority: 'high',
                    dueDate: new Date(Date.now() - 86400000).toISOString(),
                    tags: ['Bug', 'Auth']
                },
            ],
            projects: [
                { id: '1', title: 'Mobile App Redesign', status: 'active', progress: 75 },
                { id: '2', title: 'Internal Dashboard', status: 'on-hold', progress: 30 },
                { id: '3', title: 'Client API Integration', status: 'completed', progress: 100 },
            ],
            goals: [
                { id: '1', title: 'Complete React Certification', completed: true },
                { id: '2', title: 'Launch 2 Personal Projects', completed: false },
                { id: '3', title: 'Read 5 Technical Books', completed: false },
                { id: '4', title: 'Contribute to Open Source', completed: false },
            ],
            user: {
                name: 'Dilan V.',
                email: 'dilan@example.com',
                avatar: 'https://github.com/shadcn.png',
                role: 'Senior Product Designer'
            },
            addTask: (task) =>
                set((state) => ({ tasks: [...state.tasks, { ...task, id: uuidv4() }] })),
            updateTask: (id, updates) =>
                set((state) => ({
                    tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
                })),
            deleteTask: (id) =>
                set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
            moveTask: (id, status) =>
                set((state) => ({
                    tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
                })),
            toggleGoal: (id) =>
                set((state) => ({
                    goals: state.goals.map((g) =>
                        g.id === id ? { ...g, completed: !g.completed } : g
                    ),
                })),
            addGoal: (title) =>
                set((state) => ({
                    goals: [...state.goals, { id: uuidv4(), title, completed: false }],
                })),
            removeGoal: (id) =>
                set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),
            addProject: (project) =>
                set((state) => ({ projects: [...state.projects, { ...project, id: uuidv4() }] })),
            deleteProject: (id) =>
                set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
            updateUser: (updates) =>
                set((state) => ({
                    user: { ...state.user, ...updates }
                })),
            optimizeTasks: () =>
                set((state) => {
                    const sortedTasks = [...state.tasks].sort((a, b) => {
                        // 1. Sort by Priority (High > Medium > Low)
                        const priorityOrder = { high: 3, medium: 2, low: 1 }
                        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                            return priorityOrder[b.priority] - priorityOrder[a.priority]
                        }
                        // 2. Sort by Due Date (Soonest first)
                        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                    })
                    return { tasks: sortedTasks }
                }),
            syncGoalsWithTasks: () =>
                set((state) => {
                    const completedTasks = state.tasks.filter(t => t.status === 'done').length
                    const updatedGoals = state.goals.map(goal => {
                        // Example: "Complete 3 tasks" logic
                        if (goal.title.toLowerCase().includes('tasks') && goal.title.includes('3') && completedTasks >= 3) {
                            return { ...goal, completed: true }
                        }
                        return goal
                    })
                    return { goals: updatedGoals }
                }),
        }),
        {
            name: 'saas-dashboard-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
