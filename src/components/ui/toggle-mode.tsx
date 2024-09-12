"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button size="icon" className="rounded-xl bg-transparent hover:bg-white dark:hover:bg-black shadow-none" onClick={toggleTheme}>
      {theme === "light" ? (
        <MoonIcon className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all" />
      ) : (
        <SunIcon className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}