"use client"

import { useState } from "react"
import Navbar from "./components/Navbar"
import AddTaskButton from "./components/AddTaskButton"
import TaskList from "./components/TaskList"

export default function App() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">📝 To-Do List</h1>
      <div className="flex justify-center">
        <AddTaskButton />
      </div>
      <TaskList />
    </div>
  )
}