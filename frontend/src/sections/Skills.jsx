import { Container } from '../components/Container'
import { MangaPanel } from '../components/MangaPanel'
import { SectionTitle } from '../components/SectionTitle'
import { skillsData } from '../data/skills'
import { motion } from 'framer-motion'

export const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative bg-panel/30">
      <Container>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div className="sticky top-24">
            <SectionTitle 
              chapter="03" 
              title="Skills & Tools."
              subtitle="Technologies I use to build products and solve problems."
            />
            
            <MangaPanel 
              className="mt-12 aspect-[4/5] hidden lg:block"
              image="/manga/skills-tools.jpg"
              text="THE RIGHT TOOL MAKES THE CODE STRONGER."
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {skillsData.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex flex-col items-center justify-center gap-4 p-8 border border-border bg-bg hover:bg-panel transition-colors duration-300 group"
              >
                <skill.icon className="w-8 h-8 text-muted group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
                <span className="font-serif text-sm md:text-base text-center">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
