import { Outlet, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { ScrollProgress } from './ScrollProgress'

export const Layout = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="relative w-full min-h-screen selection:bg-accent selection:text-white bg-primary text-secondary transition-colors duration-300">
      {/* Dynamic Scroll Progress Bar */}
      <ScrollProgress />

      {/* Global Grain/Noise Overlay */}
      <div className="noise-overlay" />
      {/* Fixed Navigation / Header */}
      <header className={`fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 lg:px-24 xl:px-32 mix-blend-difference text-white pointer-events-none transition-all duration-300`}>
        <div className="flex justify-between items-center max-w-[1440px] mx-auto w-full pointer-events-auto">
          <a href="/" className="font-serif text-2xl md:text-3xl font-bold tracking-tighter hover:text-accent transition-colors">K.</a>
          
          <nav className="hidden lg:flex gap-8 xl:gap-12 text-xs md:text-sm uppercase tracking-widest font-light">
            {isHome ? (
              <>
                <a href="#about" className="hover:text-accent transition-colors">01 About</a>
                <a href="#skills" className="hover:text-accent transition-colors">02 Skills</a>
                <a href="#projects" className="hover:text-accent transition-colors">03 Projects</a>
                <a href="#contact" className="hover:text-accent transition-colors">04 Contact</a>
              </>
            ) : (
              <a href="/#projects" className="hover:text-accent transition-colors">Back to Projects</a>
            )}
          </nav>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="py-8 text-center text-muted text-sm tracking-widest uppercase border-t border-border mt-auto">
        &copy; {new Date().getFullYear()} KRISHNA. ALL RIGHTS RESERVED.
      </footer>
    </div>
  )
}
