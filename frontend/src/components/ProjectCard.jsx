import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { trackEvent } from '../utils/telemetry'

export const ProjectCard = ({ project }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rX = -(y / (rect.height / 2)) * 6
    const rY = (x / (rect.width / 2)) * 6
    setTilt({ x: rX, y: rY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const handleTrackClick = () => {
    trackEvent('project_click', { slug: project.slug, title: project.title })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col gap-6"
    >
      <Link 
        to={`/projects/${project.slug}`} 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleTrackClick}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className="relative aspect-[4/3] w-full overflow-hidden bg-panel block border-2 border-border shadow-premium hover:shadow-2xl transition-all duration-300"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted font-serif italic">
            Visual Data Missing
          </div>
        )}
      </Link>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Link to={`/projects/${project.slug}`} onClick={handleTrackClick}>
            <h3 className="text-2xl font-serif hover:text-accent transition-colors">{project.title}</h3>
          </Link>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
            title="Live URL"
          >
            <ArrowUpRight className="w-5 h-5 hover:text-accent" />
          </a>
        </div>
        <p className="text-sm text-muted">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs tracking-wider px-3 py-1 border border-border text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
