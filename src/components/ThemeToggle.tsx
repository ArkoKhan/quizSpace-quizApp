import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { loadTheme, saveTheme } from '../utils/localStorage'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => loadTheme())

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    saveTheme(theme)
  }, [theme])

  return (
    <button className="icon-button" type="button" onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}
