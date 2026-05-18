import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col gap-6"
    >
      <Link to={`/projects/${project.slug}`} className="relative aspect-[4/3] w-full overflow-hidden bg-panel block">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted font-serif italic">
            Visual Data Missing
          </div>
        )}
        <div className="absolute inset-0 border border-border pointer-events-none transition-colors duration-300 group-hover:border-accent/50" />
      </Link>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Link to={`/projects/${project.slug}`}>
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
