'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./AuthContext";

export interface Todo {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'todo' | 'in progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  userId: string;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'userId'>) => Promise<void>;
  updateTodo: (id: string, todo: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  loading: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    const fetchTodos = async () => {
      try {
        const q = query(collection(db, "todos"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const todosArray: Todo[] = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ id: doc.id, ...doc.data() } as Todo);
        });
        setTodos(todosArray);
        console.log("Fetched todos:", todosArray);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();

    const q = query(collection(db, "todos"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArray: Todo[] = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ id: doc.id, ...doc.data() } as Todo);
      });
      setTodos(todosArray);
      console.log("Updated todos:", todosArray);
    }, (error) => {
      console.error("Error in onSnapshot:", error);
    });

    return () => unsubscribe();
  }, [user]);

  const addTodo = async (todo: Omit<Todo, 'id' | 'userId'>) => {
    if (!user) {
      console.error("No user logged in");
      throw new Error("User must be logged in to add a todo");
    }
    try {
      console.log("Adding todo:", todo);
      console.log("Current user:", user.uid);
      const docRef = await addDoc(collection(db, "todos"), {
        ...todo,
        userId: user.uid,
      });
      console.log("Document written with ID: ", docRef.id);

      const newDocSnap = await doc(db, "todos", docRef.id);
      console.log("Newly added document:", newDocSnap);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

  const updateTodo = async (id: string, updatedFields: Partial<Todo>) => {
    try {
      await updateDoc(doc(db, "todos", id), updatedFields);
      console.log("Document successfully updated");
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      console.log("Document successfully deleted");
    } catch (e) {
      console.error("Error removing document: ", e);
      throw e;
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, loading }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
