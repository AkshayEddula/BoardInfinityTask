'use client'

import React, { useState, ReactNode } from "react"
import Todos from "@/components/Todos"
import TaskModal from "@/components/TaskModal"
import { FaCirclePlus } from "react-icons/fa6"
import { RxCross1 } from "react-icons/rx"
import { useTodos } from "@/contexts/TodoContext"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
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
  status: 'todo' | 'in-progress' | 'done';
}


export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { todos, addTodo, loading } = useTodos()

  const handleCreateTask = async (newTask) => {
    await addTodo(newTask)
    setIsModalOpen(false)
  }

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
      <div>
        <Todos />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-x-2">
            <FaCirclePlus color="#8a31e5" className="text-xl" />
            <h2 className="text-2xl font-medium text-black">Create New Task</h2>
          </div>
          <button onClick={() => setIsModalOpen(false)} className="text-black hover:text-gray-700">
            <RxCross1 className="text-xl" />
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
