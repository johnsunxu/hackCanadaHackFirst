"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import AddTaskButton from "./components/AddTaskButton"
import TaskList from "./components/TaskList"

export default function App() {
  const [tasks, setTasks] = useState([])

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/toDo") // Adjust the URL as needed
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks()
  }, [])

  // Function to refresh tasks after adding a new task
  const handleTaskAdded = () => {
    fetchTasks()
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">📝 To-Do List</h1>
      <div className="flex justify-center">
        <AddTaskButton onTaskAdded={handleTaskAdded} />
      </div>
      <TaskList tasks={tasks} />
    </div>
  )
}
