import { motion } from 'framer-motion'
import { cn } from '../utils/cn'
import { useState } from 'react'

export const MangaPanel = ({ children, className, image, delay = 0, text }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Limit max rotation to 5 degrees for subtlety
    const rX = -(y / (rect.height / 2)) * 5
    const rY = (x / (rect.width / 2)) * 5
    setTilt({ x: rX, y: rY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
      className={cn(
        'relative overflow-hidden border-2 border-border bg-panel group shadow-premium hover:shadow-2xl transition-all duration-300',
        className
      )}
    >
      {image && (
        <img
          src={image}
          alt="Manga Panel"
          loading="lazy"
          className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
        />
      )}
      
      {text && (
        <div className="absolute top-4 right-4 bg-bg border-2 border-border p-4 max-w-[200px] shadow-[4px_4px_0px_0px_var(--color-border)]">
          <p className="font-serif italic text-sm md:text-base text-center leading-tight">
            {text}
          </p>
        </div>
      )}

      {children && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {children}
        </div>
      )}
      
      {/* Subtle halftone/grain overlay effect for manga feel */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
    </motion.div>
  )
}
