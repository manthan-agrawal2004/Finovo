"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    setIsDark(theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    if (isDark) {
      setTheme("light")
      setIsDark(false)
    } else {
      setTheme("dark")
      setIsDark(true)
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative h-9 w-16 rounded-full transition-colors duration-300 focus:outline-none 
        ${isDark ? "bg-slate-800" : "bg-yellow-400"}`}
    >
      {/* Thumb */}
      <span
        className={`absolute top-1 left-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 transform
          ${isDark ? "translate-x-7" : "translate-x-0"}`}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-slate-800" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-500" />
        )}
      </span>
    </button>
  )
}