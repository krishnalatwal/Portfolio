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
    const rX = -(y / (rect.height / 2)) * 5
    const rY = (x / (rect.width / 2)) * 5
    setTilt({ x: rX, y: rY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  // If both image and text are provided, render text as a caption below — never overlapping
  const hasImageAndText = image && text

  return (
    <div className={hasImageAndText ? 'flex flex-col gap-0' : ''}>
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

        {/* Text inside panel — only when NO image (pure text panel) */}
        {text && !image && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <p className="font-serif italic text-lg md:text-xl text-center leading-snug text-secondary">
              {text}
            </p>
          </div>
        )}

        {children && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            {children}
          </div>
        )}
      </motion.div>

      {/* Caption below — only when image AND text both exist */}
      {hasImageAndText && (
        <div className="border-2 border-t-0 border-border bg-bg px-4 py-3">
          <p className="font-serif italic text-xs md:text-sm text-muted leading-snug tracking-wide">
            {text}
          </p>
        </div>
      )}
    </div>
  )
}
