import React, { useState, useRef, useEffect } from "react"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { IoCalendarOutline } from "react-icons/io5"
import { useTodos, Todo } from "@/contexts/TodoContext"

export default function TodoItem({ todo }: { todo: Todo }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
    const [editedTodo, setEditedTodo] = useState(todo)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)
    const { updateTodo, deleteTodo } = useTodos()

    const priorityColors = {
        high: "bg-[#FFECE1] text-[#FF5C00]",
        medium: "bg-[#FFECE1] text-[#FF00B8]",
        low: "bg-[#F0FFDD] text-[#8A8A8A]"
    }

    const statusColors = {
        'todo': 'bg-[#8A30E5]',
        'in progress': 'bg-[#FFC14E]',
        'done': 'bg-[#06c270]'
    }

    const handleStatusChange = async (status: Todo['status']) => {
        await updateTodo(todo.id, { status })
        setIsDropdownOpen(false)
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        await updateTodo(todo.id, editedTodo)
        setIsEditModalOpen(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setEditedTodo(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleDelete = async () => {
        await deleteTodo(todo.id)
        setIsDeleteConfirmOpen(false)
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", todo.id)
        setIsDragging(true)
    }

    const handleDragEnd = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                iconRef.current && !iconRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsDropdownOpen(false)
                setIsEditModalOpen(false)
                setIsDeleteConfirmOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [])

    return (
        <>
            <div
                className={`bg-white rounded-lg shadow-sm border border-[#e3e3e3] overflow-hidden ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                } flex`}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="w-1 flex flex-col justify-center">
                    <div className={`h-12 w-1 ${statusColors[todo.status]}`} aria-hidden="true"></div>
                </div>
                <div className="flex-grow p-4 space-y-4">
                    <div className="flex justify-between items-start">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityColors[todo.priority]}`}>
                            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                        </span>
                        <div className="relative">
                            <div
                                ref={iconRef}
                                className="text-black hover:text-gray-600 cursor-pointer"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                                aria-label="Change status"
                                aria-haspopup="true"
                                aria-expanded={isDropdownOpen}
                            >
                                <MdOutlineKeyboardArrowDown className="h-5 w-5" />
                            </div>
                            {isDropdownOpen && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                                >
                                    <div className="bg-[#e4ecff] p-1">
                                        <h1 className="text-lg text-center font-medium text-black">Change Status</h1>
                                    </div>
                                    <div className="p-2">
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleStatusChange('todo')}
                                        >
                                            To Do
                                        </button>
                                        <hr className="border-gray-200"/>
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleStatusChange('in progress')}
                                        >
                                            In Progress
                                        </button>
                                        <hr className="border-gray-200"/>
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleStatusChange('done')}
                                        >
                                            Completed
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-black">{todo.title}</h3>
                        {todo.description && (
                            <p className="text-[#787486] w-3/4 mt-1">{todo.description}</p>
                        )}
                    </div>
                    <hr className="w-full h-[2px] bg-gray-300" />
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                            <IoCalendarOutline className="h-4 w-4 mr-2" />
                            {new Date(todo.date).toLocaleDateString()}
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="px-4 py-2 border border-[#8a31e5] rounded-md text-sm font-medium text-[#8a31e5] hover:bg-gray-50 focus:outline-none"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setIsDeleteConfirmOpen(true)}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8a31e5] hover:bg-[#9250D6] focus:outline-none"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>
                        <form onSubmit={handleEdit} className="space-y-4 z-10">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={editedTodo.title}
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
                                    value={editedTodo.description}
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
                                    value={editedTodo.date}
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
                                    value={editedTodo.status}
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
                                    value={editedTodo.priority}
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
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 border border-[#8a31e5] rounded-md text-sm font-medium text-[#8a31e5] hover:bg-gray-50 focus:outline-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8a31e5] hover:bg-[#9250D6] focus:outline-none"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isDeleteConfirmOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-black">Confirm Delete</h2>
                        <p className="mb-4 text-black">Are you sure you want to delete this todo?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsDeleteConfirmOpen(false)}
                                className="px-4 py-2 border border-[#8a31e5] rounded-md text-sm font-medium text-[#8a31e5] hover:bg-gray-50 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-400 focus:outline-none"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
