import { Container } from '../components/Container'
import { MangaPanel } from '../components/MangaPanel'
import { SectionTitle } from '../components/SectionTitle'
import { profileData } from '../data/profile'

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div className="sticky top-24">
            <SectionTitle 
              chapter="02" 
              title={profileData.about.heading}
              subtitle="My role is to turn ideas into scalable digital solutions."
            />
            
            <div className="flex flex-col gap-6 text-lg text-muted font-light leading-relaxed max-w-md">
              {profileData.about.text.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              {profileData.about.stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="text-4xl font-serif">{stat.value}</span>
                  <span className="text-sm text-muted uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Manga Inspired Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grid-flow-row-dense">
            <MangaPanel 
              className="md:col-span-2 aspect-[21/9]"
              image="/manga/about-city.jpg"
              text="EVERY PROJECT BEGINS WITH A PROBLEM."
              delay={0.1}
            />
            
            <MangaPanel 
              className="aspect-square md:aspect-[4/5]"
              image="/manga/about-focus.jpg"
              delay={0.2}
            />
            
            <div className="flex flex-col gap-4">
              <MangaPanel 
                className="flex-1 aspect-[4/3]"
                text="SIMPLE. PRACTICAL. IMPACTFUL."
                delay={0.3}
              />
              <MangaPanel 
                className="flex-[1.5] aspect-[16/9]"
                image="/manga/about-code.jpg"
                delay={0.4}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
