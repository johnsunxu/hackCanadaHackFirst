// AddTaskButton.tsx
"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface AddTaskButtonProps {
  onTaskAdded: () => void; // Add this line to define the prop type
}

export default function AddTaskButton({ onTaskAdded }: AddTaskButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [taskInput, setTaskInput] = useState("")
  const [taskTitle, setTaskTitle] = useState("")
  const [dueDate, setDueDate] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (taskInput.trim() && taskTitle.trim()) {
      try {
        // Add your API call here to create a new task
        await fetch("http://localhost:5000/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "email": 'jasontran2134@gmail.com',
            "todo_item": taskInput
            // title: taskTitle,
            // description: taskInput,
            // due_date: dueDate,
            // status: "pending", // Set default status or modify as needed
          }),
        })
        // onTaskAdded(); // Call the onTaskAdded function after successfully adding the task
        setTaskInput("")
        setTaskTitle("")
        setDueDate("")
        setIsOpen(false)
      } catch (error) {
        console.error("Error adding task:", error)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your task description"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <Input 
            type="text"
            placeholder="Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <Input 
            type="date" // Changed to date for better UX
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Button type="submit">Add Task</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
