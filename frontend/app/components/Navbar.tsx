import type React from "react"
import ThemeToggle from "./ThemeToggle"

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Daily Task Manager</h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {children}
        </div>
      </div>
    </nav>
  )
}

