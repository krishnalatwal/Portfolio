import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'
import { ThemeToggle } from './components/ThemeToggle'
import { useThemeStore } from './store/themeStore'
import { useEffect } from 'react'

function App() {
  const initTheme = useThemeStore((state) => state.initTheme)

  useEffect(() => {
    initTheme()
  }, [initTheme])

  return (
    <div className="relative w-full min-h-screen selection:bg-accent selection:text-white">
      {/* Fixed Navigation / Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 md:px-12 mix-blend-difference text-white pointer-events-none">
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full pointer-events-auto">
          <div className="font-serif text-3xl font-bold tracking-tighter">K.</div>
          
          <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-light">
            <a href="#about" className="hover:text-accent transition-colors">01 About</a>
            <a href="#skills" className="hover:text-accent transition-colors">02 Skills</a>
            <a href="#projects" className="hover:text-accent transition-colors">03 Projects</a>
            <a href="#contact" className="hover:text-accent transition-colors">04 Contact</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <footer className="py-8 text-center text-muted text-sm tracking-widest uppercase border-t border-border">
        &copy; {new Date().getFullYear()} KRISHNA. ALL RIGHTS RESERVED.
      </footer>
    </div>
  )
}

export default App
