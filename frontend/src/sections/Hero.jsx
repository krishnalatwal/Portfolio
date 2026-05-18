import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Container } from '../components/Container'
import { useThemeStore } from '../store/themeStore'
import { usePortfolioStore } from '../store/portfolioStore'
import { Mail } from 'lucide-react'
import { trackEvent } from '../utils/telemetry'

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
)

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

export const Hero = () => {
  const isDark = useThemeStore((state) => state.isDark)
  const profileData = usePortfolioStore((state) => state.profile)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: false }}>
          <Stars 
            radius={100} 
            depth={50} 
            count={isDark ? 3000 : 800} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1} 
            color={isDark ? '#ffffff' : '#000000'}
          />
        </Canvas>
      </div>

      <Container className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-border"></div>
            <span className="text-sm tracking-[0.2em] text-muted font-medium uppercase">
              {profileData.title}
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light leading-tight tracking-tighter">
            Hi, I'm <br />
            <span className="italic text-accent">{profileData.name}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted max-w-md font-light leading-relaxed">
            {profileData.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 mt-8">
            <a 
              href="#projects"
              className="px-8 py-4 bg-secondary text-primary font-medium tracking-wide hover:scale-105 transition-transform duration-300"
            >
              View Projects &rarr;
            </a>
            <a 
              href="#contact"
              className="px-8 py-4 border border-border hover:border-accent transition-colors duration-300"
            >
              Contact Me
            </a>
          </div>

          {/* Premium Home/Hero Socials Option Row */}
          {profileData.contact && profileData.contact.socials && (
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border/40 w-fit">
              <a 
                href={profileData.contact.socials.github} 
                onClick={() => trackEvent('social_click', { platform: 'github', placement: 'hero' })}
                target="_blank" 
                rel="noreferrer" 
                className="text-muted hover:text-accent hover:scale-110 transition-all duration-300 p-2.5 border border-border bg-panel/20"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a 
                href={profileData.contact.socials.linkedin} 
                onClick={() => trackEvent('social_click', { platform: 'linkedin', placement: 'hero' })}
                target="_blank" 
                rel="noreferrer" 
                className="text-muted hover:text-accent hover:scale-110 transition-all duration-300 p-2.5 border border-border bg-panel/20"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              {profileData.contact.socials.instagram && (
                <a 
                  href={profileData.contact.socials.instagram} 
                  onClick={() => trackEvent('social_click', { platform: 'instagram', placement: 'hero' })}
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-muted hover:text-accent hover:scale-110 transition-all duration-300 p-2.5 border border-border bg-panel/20"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              )}
              <a 
                href={`mailto:${profileData.contact.email}`} 
                onClick={() => trackEvent('social_click', { platform: 'email', placement: 'hero' })}
                className="text-muted hover:text-accent hover:scale-110 transition-all duration-300 p-2.5 border border-border bg-panel/20"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          )}
        </motion.div>

        {/* Cinematic Manga Visual Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square lg:aspect-[4/5] w-full hidden lg:block"
        >
          <div className="absolute inset-0 border border-border bg-panel overflow-hidden group">
            {/* We'll use a placeholder image here for now, it should be a manga panel of coding */}
            <img 
              src="/manga/hero-coding.jpg" 
              alt="Cinematic Coding"
              loading="lazy"
              className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
            
            <div className="absolute top-8 right-8 bg-bg border border-border p-6 shadow-2xl">
              <p className="font-serif italic text-lg leading-snug write-vertical-right tracking-widest text-secondary">
                未来をデザインすることだ。
              </p>
              <p className="text-xs text-muted mt-4">"DESIGN THE FUTURE"</p>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-bg to-transparent"></div>
          </div>
        </motion.div>
      </Container>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-12 md:left-24 flex flex-col items-center gap-4 text-muted text-xs tracking-widest"
      >
        <span className="[writing-mode:vertical-lr]">SCROLL DOWN</span>
        <div className="w-[1px] h-12 bg-border relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="w-full h-1/2 bg-accent"
          />
        </div>
      </motion.div>
    </section>
  )
}
