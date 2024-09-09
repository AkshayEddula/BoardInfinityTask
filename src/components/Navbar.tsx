'use client'

import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { LuListTodo } from "react-icons/lu";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import Image from "next/image";
import logo from "../app/public/images/logo.svg"
import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import TaskModal from "@/components/TaskModal";
import { useAuth } from "@/contexts/AuthContext";
import { useTodos } from "@/contexts/TodoContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
            <div className="bg-white rounded-lg p-6 w-full max-w-[700px]">
                {children}
            </div>
        </div>
    )
}

interface NewTask {
    title: string;
    description: string;
    date: string;
    status: 'todo' | 'in progress' | 'done';
    priority: 'low' | 'medium' | 'high';
}

interface NavItemProps {
  href: string;
  icon: React.ReactElement;
  text: string;
}

function NavItem({ href, icon, text }: NavItemProps) {
    return (
        <Link href={href} className="flex items-center gap-x-2 bg-gray-100 p-2 rounded border shadow-md">
            {React.cloneElement(icon, { color: "black" })}
            <p className="text-black">{text}</p>
        </Link>
    )
}

export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { logOut } = useAuth();
    const { addTodo } = useTodos()

    const handleCreateTask = async (newTask: NewTask) => {
        await addTodo(newTask)
        setIsModalOpen(false)
    }

    const handleLogout = async () => {
        try {
            await logOut();
            console.log("Logged out successfully")
        } catch (error) {
            console.log("Failed to log out", error)
        }
    }

    return (
        <div className="bg-white h-full flex flex-col justify-between p-3 rounde
d-lg">
            <div className="flex flex-col gap-y-3">
                <NavItem href="/dashboard" icon={<IoMdHome/>} text="Home"/>
                <NavItem href="/todos" icon={<LuListTodo/>} text="Todos"/>
                <NavItem href="/inprogress" icon={<MdOutlinePendingActions/>} text="In Progress"/>
                <NavItem href="/completed" icon={<IoCheckmarkDoneCircle/>} text="Completed"/>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 "
                >
                    Create Task
                </button>
            </div>

            <div className="flex flex-col gap-y-3">
                <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ">
                    Logout
                </button>
                <div className="flex items-center justify-center">
                    <Image width={70} height={70} src={logo} alt="logo"/>
                </div>
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
