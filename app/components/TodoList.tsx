"use client"

import { useState, useEffect } from "react"
import TodoItem from "./TodoItem"
import AddTodo from "./AddTodo"

interface Todo {
  id: number
  title: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
    const data = await response.json()
    setTodos(data)
  }

  const addTodo = async (title: string) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    }

    setTodos((prevTodos) => [...prevTodos, newTodo])

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      const data = await response.json()
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === newTodo.id ? { ...todo, id: data.id } : todo)))
    } catch (error) {
      console.error("Error adding todo:", error)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== newTodo.id))
    }
  }

  const deleteTodo = async (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))

    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      })
    } catch (error) {
      console.error("Error deleting todo:", error)
      fetchTodos()
    }
  }

  return (
    <div>
      <AddTodo onAdd={addTodo} />
      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
        ))}
      </ul>
    </div>
  )
}

