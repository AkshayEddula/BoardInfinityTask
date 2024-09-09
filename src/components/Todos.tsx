import React from "react"
import { useTodos } from "@/contexts/TodoContext"
import TodoItem from "@/components/TodoItem"

export default function Todos() {
    const { todos, loading, updateTodo } = useTodos()

    if (loading) {
        return <div>Loading todos...</div>
    }

    const todoTodos = todos.filter(todo => todo.status === 'todo')
    const inProgressTodos = todos.filter(todo => todo.status === 'in progress')
    const completedTodos = todos.filter(todo => todo.status === 'done')

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, status: 'todo' | 'in progress' | 'done') => {
        e.preventDefault()
        const todoId = e.dataTransfer.getData("text/plain")
        await updateTodo(todoId, { status })
    }

    const renderColumn = (title: string, todos: any[], status: 'todo' | 'in progress' | 'done', bgColor: string, textColor: string) => (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, status)}
        >
            <div className={`${bgColor} ${textColor} p-3 rounded-t-lg`}>
                <h2 className="text-xl font-medium text-center">{title}</h2>
            </div>
            <div className="p-3 h-[calc(100vh-200px)] overflow-y-auto">
                {todos.length === 0 ? (
                    <p className="text-gray-600 text-center">No todos in this category.</p>
                ) : (
                    <div className="space-y-2">
                        {todos.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )

    return (
        <div className="mt-5 flex gap-x-4 justify-center">
            {renderColumn("TODO", todoTodos, 'todo', 'bg-[#8A30E5]', 'text-[#e6f7ff]')}
            {renderColumn("IN PROGRESS", inProgressTodos, 'in progress', 'bg-[#FFC14E]', 'text-[#313131]')}
            {renderColumn("COMPLETED", completedTodos, 'done', 'bg-[#06c270]', 'text-[#ffffff]')}
        </div>
    )
}
