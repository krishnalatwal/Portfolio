import { Outlet, useLocation, Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { ScrollProgress } from './ScrollProgress'
import { siteSettings } from '../data/settings'

export const Layout = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="relative w-full min-h-screen selection:bg-accent selection:text-white bg-primary text-secondary transition-colors duration-300">
      {/* Dynamic Scroll Progress Bar */}
      <ScrollProgress />


      {/* Fixed Navigation / Header */}
      <header className={`fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 lg:px-24 xl:px-32 mix-blend-difference text-white pointer-events-none transition-all duration-300`}>
        <div className="flex justify-between items-center max-w-[1440px] mx-auto w-full pointer-events-auto">
          <Link to="/" className="font-serif text-2xl md:text-3xl font-bold tracking-tighter hover:text-accent transition-colors">Krishna Latwal.</Link>
          
          <nav className="hidden lg:flex gap-8 xl:gap-12 text-xs md:text-sm uppercase tracking-widest font-light">
            {isHome ? (
              <>
                {siteSettings.nav.showAbout && <a href="#hero" className="hover:text-accent transition-colors">01 Intro</a>}
                {siteSettings.nav.showAbout && <a href="#about" className="hover:text-accent transition-colors">02 About</a>}
                {siteSettings.nav.showSkills && <a href="#skills" className="hover:text-accent transition-colors">03 Skills</a>}
                {siteSettings.nav.showProjects && <a href="#projects" className="hover:text-accent transition-colors">04 Projects</a>}
                {siteSettings.nav.showActivity && <a href="#github-activity" className="hover:text-accent transition-colors">05 Activity</a>}
                {siteSettings.nav.showContact && <a href="#contact" className="hover:text-accent transition-colors">06 Contact</a>}
                {siteSettings.nav.showDevlogs && <Link to="/devlog" className="hover:text-accent transition-colors">07 Dev Logs</Link>}
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                <a href="/#projects" className="hover:text-accent transition-colors">Projects</a>
                {siteSettings.nav.showDevlogs && <Link to="/devlog" className={`hover:text-accent transition-colors ${location.pathname.startsWith('/devlog') ? 'font-medium text-accent' : ''}`}>Dev Logs</Link>}
              </>
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
        &copy; {new Date().getFullYear()} {siteSettings.footer.copyrightName}. ALL RIGHTS RESERVED.
      </footer>
    </div>
  )
}
