import { Container } from '../components/Container'
import { ProjectCard } from '../components/ProjectCard'
import { SectionTitle } from '../components/SectionTitle'
import { usePortfolioStore } from '../store/portfolioStore'
import { ArrowRight } from 'lucide-react'

export const Projects = () => {
  const projectsData = usePortfolioStore((state) => state.projects)
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <SectionTitle 
            chapter="04" 
            title="Selected Works."
            subtitle="A selection of projects I've built across different domains."
            className="mb-0 md:mb-0"
          />
          
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="group flex items-center gap-2 text-sm uppercase tracking-widest text-muted hover:text-accent transition-colors pb-4"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  )
}
