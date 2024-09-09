import React from "react"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { IoCalendarOutline } from "react-icons/io5"
import todos from "@/contexts/TodoContext";
import TodoItem from "@/components/TodoItem";



export default function Todos() {
    const inProgressTodos = todos.filter(todo => todo.status === 'in progress')
    const pendingTodos = todos.filter(todo => todo.status === 'pending')

    return (
        <div className="mt-5 flex gap-x-5">
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
                <div className="bg-[#8A30E5] text-[#e6f7ff] p-3 rounded-t-lg">
                    <h2 className="text-xl font-medium text-center">TODO</h2>
                </div>
                <div className="p-3">
                    {inProgressTodos.length === 0 ? (
                        <p className="text-gray-600 text-center">No todos are currently in progress.</p>
                    ) : (
                        <div className="space-y-2">
                            {inProgressTodos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
                <div className="bg-[#FFC14E] text-[#313131] p-3 rounded-t-lg">
                    <h2 className="text-xl font-medium text-center">IN PROGRESS</h2>
                </div>
                <div className="p-3">
                    {pendingTodos.length === 0 ? (
                        <p className="text-gray-600 text-center">No todos are currently in Pending.</p>
                    ) : (
                        <div className="space-y-2">
                            {pendingTodos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
                <div className="bg-[#06c270] text-[#ffffff] p-3 rounded-t-lg">
                    <h2 className="text-xl font-medium text-center">COMPLETED</h2>
                </div>
                <div className="p-3">
                    {inProgressTodos.length === 0 ? (
                        <p className="text-gray-600 text-center">No todos are currently in progress.</p>
                    ) : (
                        <div className="space-y-2">
                            {inProgressTodos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}