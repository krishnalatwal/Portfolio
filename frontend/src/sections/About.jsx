import { Container } from '../components/Container'
import { MangaPanel } from '../components/MangaPanel'
import { SectionTitle } from '../components/SectionTitle'
import { usePortfolioStore } from '../store/portfolioStore'
import { siteSettings } from '../data/settings'

export const About = () => {
  const profileData = usePortfolioStore((state) => state.profile)
  const { panels, subtitle } = siteSettings.about

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div className="sticky top-24">
            <SectionTitle 
              chapter="02" 
              title={profileData.about.heading}
              subtitle={profileData.about.subtitle || subtitle}
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
          
          {/* Manga Panel Grid — layout controlled by settings.js */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grid-flow-row-dense">
            {panels.map((panel, i) => (
              <MangaPanel 
                key={i}
                className={`${panel.span === 2 ? 'md:col-span-2' : ''} ${panel.aspect}`}
                image={panel.image}
                text={panel.text}
                delay={0.1 * (i + 1)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
