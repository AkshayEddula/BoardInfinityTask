'use client'

import React, { useState } from "react"
import TodoItem from "@/components/TodoItem"
import TaskModal from "@/components/TaskModal"
import { FaCirclePlus } from "react-icons/fa6"
import { RxCross1 } from "react-icons/rx"
import { useTodos } from "@/contexts/TodoContext"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-[700px]">
                {children}
            </div>
        </div>
    )
}

interface Todo {
    id: string;
    title: string;
    description: string;
    date: string;
    status: 'todo' | 'in progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    userId: string;
}

interface NewTask {
    title: string;
    description: string;
    date: string;
    status: 'todo' | 'in progress' | 'done';
    priority: 'low' | 'medium' | 'high';
}

export default function TodoPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { todos, addTodo, loading } = useTodos()

    const handleCreateTask = async (newTask: NewTask) => {
        await addTodo(newTask)
        setIsModalOpen(false)
    }

    const todoTasks = todos.filter((todo: Todo) => todo.status === 'todo')

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="p-6 flex flex-col">
            <div className="flex items-center justify-between bg-white px-5 py-2 rounded-lg">
                <h1 className="text-2xl text-gray-600 font-bold">
                    <span className="italic text-blue-400">Board Infinity</span> Task Management App
                </h1>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                    Create Task
                </button>
            </div>
            <div className="mt-5">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mx-auto">
                    <div className="bg-[#8A30E5] text-[#e6f7ff] p-3 rounded-t-lg">
                        <h2 className="text-xl font-medium text-center">TODO</h2>
                    </div>
                    <div className="p-3">
                        {todoTasks.length === 0 ? (
                            <p className="text-gray-600 text-center">No todos in this category.</p>
                        ) : (
                            <div className="space-y-2">
                                {todoTasks.map((todo: Todo) => (
                                    <TodoItem key={todo.id} todo={todo} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-x-2">
                        <FaCirclePlus color="#8a31e5" className="text-xl"/>
                        <h2 className="text-2xl font-medium text-black">Create New Task</h2>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="text-black hover:text-gray-700">
                        <RxCross1 className="text-xl"/>
                    </button>
                </div>
                <TaskModal
                    onSubmit={handleCreateTask}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    )
}
