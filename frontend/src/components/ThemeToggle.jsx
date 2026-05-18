import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'
import { motion } from 'framer-motion'

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeStore()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-full border border-border bg-panel text-secondary hover:bg-border transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </motion.button>
  )
}
