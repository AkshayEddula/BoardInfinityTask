'use client'

import React from "react"
import Link from "next/link"
import { FaTasks, FaChartLine, FaUserCircle } from "react-icons/fa"
import { useTodos } from "@/contexts/TodoContext"

export default function HomePage() {
  const { todos, loading } = useTodos()

  const completedTasks = todos.filter(todo => todo.status === 'done').length
  const pendingTasks = todos.filter(todo => todo.status !== 'done').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-gray-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl w-full">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            <span className="italic text-purple-600">BoardInfinity</span> Task Manager
          </h1>
          <p className="text-gray-600 mt-2">Streamline your workflow and boost productivity</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-100 rounded-lg p-6 text-center">
            <FaTasks className="text-4xl text-purple-600 mx-auto mb-2" />
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Total Tasks</h2>
            <p className="text-3xl font-bold text-purple-600">{todos.length}</p>
          </div>
          <div className="bg-green-100 rounded-lg p-6 text-center">
            <FaChartLine className="text-4xl text-green-600 mx-auto mb-2" />
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Completed</h2>
            <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
          </div>
          <div className="bg-yellow-100 rounded-lg p-6 text-center">
            <FaUserCircle className="text-4xl text-yellow-600 mx-auto mb-2" />
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Pending</h2>
            <p className="text-3xl font-bold text-yellow-600">{pendingTasks}</p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Tasks</h2>
          {todos.length > 0 ? (
            <ul className="space-y-2">
              {todos.slice(0, 3).map((todo, index) => (
                <li key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow">
                  <span className="truncate text-gray-800">{todo.title}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    todo.status === 'done' ? 'bg-green-200 text-green-800' :
                    todo.status === 'in progress' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {todo.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No tasks available. Start by creating a new task!</p>
          )}
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 text-lg font-semibold"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
