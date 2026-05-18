import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Container } from '../components/Container'
import { profileData } from '../data/profile'
import { useThemeStore } from '../store/themeStore'

export const Hero = () => {
  const isDark = useThemeStore((state) => state.isDark)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars 
            radius={100} 
            depth={50} 
            count={isDark ? 5000 : 1000} 
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
          
          <div className="flex items-center gap-6 mt-8">
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
