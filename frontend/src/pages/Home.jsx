import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Skills } from '../sections/Skills'
import { Projects } from '../sections/Projects'
import { Contact } from '../sections/Contact'

export const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  )
}
