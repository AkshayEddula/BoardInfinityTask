import React, { useState, useRef, useEffect } from "react"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { IoCalendarOutline } from "react-icons/io5"

interface Todo {
    id: string
    title: string
    description?: string
    priority: 'high' | 'medium' | 'low'
    date: string
    status: 'todo' | 'in-progress' | 'completed'
}

export default function TodoItem({ todo, onStatusChange }: { todo: Todo; onStatusChange: (id: string, status: Todo['status']) => void }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)

    const priorityColors = {
        high: "bg-[#FFECE1] text-[#FF5C00]",
        medium: "bg-[#FFECE1] text-[#FF00B8]",
        low: "bg-[#F0FFDD] text-[#8A8A8A]"
    }

    const handleStatusChange = (status: Todo['status']) => {
        onStatusChange(todo.id, status)
        setIsDropdownOpen(false)
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
        <div className="bg-white rounded-lg shadow-sm border border-[#e3e3e3] overflow-hidden">
            <div className="p-4 space-y-4">
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
                                        onClick={() => handleStatusChange('in-progress')}
                                    >
                                        In Progress
                                    </button>
                                    <hr className="border-gray-200"/>
                                    <button
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => handleStatusChange('completed')}
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
                <div className="flex items-center text-sm text-gray-500">
                    <IoCalendarOutline className="h-4 w-4 mr-2" />
                    {new Date(todo.date).toLocaleDateString()}
                </div>
            </div>
        </div>
    )
}