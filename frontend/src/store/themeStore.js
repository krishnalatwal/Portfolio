import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: true, // Default to dark mode for cinematic feel
      toggleTheme: () => set((state) => {
        const newIsDark = !state.isDark
        if (newIsDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return { isDark: newIsDark }
      }),
      initTheme: () => set((state) => {
        if (state.isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return state
      })
    }),
    {
      name: 'antigravity-theme',
    }
  )
)
