import { useEffect, useState } from "react"
import { Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Task {
  id: number
  title: string
  description: string
  due_date: string | null
  status: string
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])

  // Fetch tasks from the backend
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/toDo")
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }

  // Delete a task
  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://127.0.0.1:5000/toDo/${id}`, { method: "DELETE" })
      setTasks(tasks.filter((task) => task.id !== id)) // Remove from UI
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-6 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">📋 Task List</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center border p-3 rounded-lg shadow-sm">
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-400">
                  Due: {task.due_date ? task.due_date : "No due date"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => handleDelete(task.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
