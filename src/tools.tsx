import { useState, useEffect } from "react"

export const useThemeToggle = (): [boolean, (arg0: boolean) => void] => {
  const [dark, setDark] = useState(true)
  const toggleTheme = (value: boolean) => {
    localStorage.setItem("theme", value.toString())
    setDark(value)
  }
  useEffect(() => {
    const localTheme = localStorage.getItem("theme")
    if (localTheme) {
      toggleTheme(localTheme === "true")
    }
  }, [])

  return [dark, toggleTheme]
}
