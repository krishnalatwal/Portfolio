import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { usePortfolioStore } from '../store/portfolioStore'
import { Container } from '../components/Container'
import { MangaPanel } from '../components/MangaPanel'

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
)

export const ProjectDetail = () => {
  const { slug } = useParams()
  const projectsData = usePortfolioStore((state) => state.projects)
  const project = projectsData.find(p => p.slug === slug)

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="pt-32 pb-24 min-h-screen"
    >
      <Container>
        {/* Header */}
        <div className="mb-16">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-4">{project.title}</h1>
          <p className="text-xl text-muted font-light max-w-2xl">{project.subtitle}</p>
          
          <div className="flex flex-wrap gap-3 mt-8">
            {project.tags.map((tag) => (
              <span key={tag} className="text-sm tracking-wider px-4 py-2 border border-border text-muted">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-6 mt-12">
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-secondary text-primary hover:scale-105 transition-transform">
              <span className="uppercase tracking-widest text-sm font-medium">Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-border hover:border-accent hover:text-accent transition-colors">
              <GithubIcon className="w-4 h-4" />
              <span className="uppercase tracking-widest text-sm">Source</span>
            </a>
          </div>
        </div>

        {/* Hero Manga Panel */}
        <MangaPanel 
          className="w-full aspect-[16/9] md:aspect-[21/9] mb-24"
          image={project.image}
          text="CASE STUDY INITIATED."
        />

        {/* Content Details */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 md:gap-24">
          <div className="sticky top-32 h-fit">
            <div className="w-12 h-[1px] bg-border mb-8"></div>
            <h3 className="font-serif text-2xl mb-4">Project Case Study</h3>
            <p className="text-muted font-light leading-relaxed">
              A deep-dive investigation into the architecture, challenges, and implementation of <span className="text-accent">{project.title}</span>.
            </p>
          </div>

          <div className="flex flex-col gap-20">
            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-serif mb-6">01 / Executive Overview</h2>
              <p className="text-lg font-light leading-relaxed text-secondary/90">
                {project.details.overview}
              </p>
            </motion.div>

            {/* Tech Stack */}
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-serif mb-6">02 / Technical Arsenal</h2>
              <p className="text-lg font-light leading-relaxed text-secondary/90 mb-6">
                {project.details.techStack}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs uppercase tracking-widest px-3 py-1.5 bg-panel border border-border text-muted font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Architecture */}
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-serif mb-6">03 / System Architecture</h2>
              <p className="text-lg font-light leading-relaxed text-secondary/90 mb-8">
                {project.details.architecture}
              </p>
              <MangaPanel 
                className="w-full aspect-video"
                image={project.image}
                text="TOPOLOGY MAP."
              />
            </motion.div>

            {/* Implementation */}
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-serif mb-6">04 / Engineering Implementation</h2>
              <p className="text-lg font-light leading-relaxed text-secondary/90">
                {project.details.implementation}
              </p>
            </motion.div>

            {/* Challenges */}
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-serif mb-6">05 / Major Challenges Faced</h2>
              <p className="text-lg font-light leading-relaxed text-secondary/90 font-light">
                {project.details.challenges}
              </p>
            </motion.div>

            {/* Outcomes */}
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-serif mb-6">06 / Outcomes & Telemetry Metrics</h2>
              <p className="text-lg font-light leading-relaxed text-secondary/90 font-light">
                {project.details.outcomes}
              </p>
            </motion.div>

            {/* Staggered Manga Gallery */}
            {project.details.gallery && project.details.gallery.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-8">
                <h2 className="text-3xl font-serif mb-8">07 / Blueprint & Asset Frames</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.details.gallery.map((img, i) => (
                    <MangaPanel
                      key={img}
                      className={`aspect-[4/3] ${i === 0 ? 'md:col-span-2 aspect-[21/9]' : ''}`}
                      image={img}
                      text={`ASSET PANEL 0${i + 1}`}
                      delay={0.1 * i}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Next Project Footer (Optional placeholder for future) */}
        <div className="mt-32 pt-16 border-t border-border flex justify-between items-center">
          <Link to="/#projects" className="font-serif text-3xl hover:text-accent transition-colors">
            Return to Directory
          </Link>
        </div>
      </Container>
    </motion.div>
  )
}
