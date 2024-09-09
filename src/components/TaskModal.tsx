import React, { useState } from 'react'
import { Todo } from '@/contexts/TodoContext'

interface TaskFormData {
    title: string
    description: string
    date: string
    status: Todo['status']
    priority: Todo['priority']
}

interface TaskModalProps {
    onSubmit: (task: Omit<Todo, 'id' | 'userId'>) => void
    onCancel: () => void
    initialData?: Partial<Todo>
}

export default function TaskModal({ onSubmit, onCancel, initialData }: TaskModalProps) {
    const [formData, setFormData] = useState<TaskFormData>({
        title: initialData?.title || '',
        description: initialData?.description || '',
        date: initialData?.date || '',
        status: initialData?.status || 'todo',
        priority: initialData?.priority || 'low',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted with data:", formData)
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 z-10">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full text-gray-900 rounded p-1 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full text-gray-900 rounded p-1 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows={3}
                ></textarea>
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1 text-black block w-full rounded border p-1 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                />
            </div>
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 text-gray-400 block w-full rounded p-1 border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="todo">To Do</option>
                    <option value="in progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="mt-1 block w-full text-gray-400 rounded border p-1 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-[#8a31e5] rounded-md text-sm font-medium text-[#8a31e5] hover:bg-gray-50 focus:outline-none"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8a31e5] hover:bg-[#9250D6] focus:outline-none"
                >
                    {initialData ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
    )
}
