import { Container } from '../components/Container'
import { MangaPanel } from '../components/MangaPanel'
import { SectionTitle } from '../components/SectionTitle'
import { usePortfolioStore } from '../store/portfolioStore'
import { Mail, MapPin, Phone, ArrowRight, Check, AlertCircle } from 'lucide-react'
import { useState } from 'react'

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
)

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

export const Contact = () => {
  const profileData = usePortfolioStore((state) => state.profile)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setErrorMessage('ALL FIELDS ARE REQUIRED.')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Transmission failed')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMessage(err.message.toUpperCase() || 'TRANSMISSION FAILED.')
    }
  }
  return (
    <section id="contact" className="py-24 md:py-32 relative bg-panel/30">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
          <div>
            <SectionTitle 
              chapter="05" 
              title="Let's Connect."
              subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
            />
            
            <div className="flex flex-col gap-8 mt-12">
              <a href={`mailto:${profileData.contact.email}`} className="flex items-center gap-4 text-muted hover:text-accent transition-colors group">
                <Mail className="w-5 h-5" />
                <span className="font-light tracking-wide">{profileData.contact.email}</span>
              </a>
              <div className="flex items-center gap-4 text-muted">
                <Phone className="w-5 h-5" />
                <span className="font-light tracking-wide">{profileData.contact.phone}</span>
              </div>
              <div className="flex items-center gap-4 text-muted">
                <MapPin className="w-5 h-5" />
                <span className="font-light tracking-wide">{profileData.contact.location}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 mt-12">
              <a href={profileData.contact.socials.github} target="_blank" rel="noreferrer" className="p-3 border border-border hover:border-accent hover:text-accent transition-all text-muted">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href={profileData.contact.socials.linkedin} target="_blank" rel="noreferrer" className="p-3 border border-border hover:border-accent hover:text-accent transition-all text-muted">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-8">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name" 
                disabled={status === 'sending' || status === 'success'}
                className="w-full bg-transparent border-b border-border py-4 px-2 focus:outline-none focus:border-accent transition-colors placeholder:text-muted/50 font-light disabled:opacity-50"
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email" 
                disabled={status === 'sending' || status === 'success'}
                className="w-full bg-transparent border-b border-border py-4 px-2 focus:outline-none focus:border-accent transition-colors placeholder:text-muted/50 font-light disabled:opacity-50"
              />
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message" 
                rows="4"
                disabled={status === 'sending' || status === 'success'}
                className="w-full bg-transparent border-b border-border py-4 px-2 focus:outline-none focus:border-accent transition-colors placeholder:text-muted/50 font-light resize-none disabled:opacity-50"
              ></textarea>
              
              {status === 'error' && (
                <div className="text-red-500 text-xs tracking-wider flex items-center gap-2 uppercase">
                  <AlertCircle className="w-4 h-4" />
                  {errorMessage}
                </div>
              )}

              <button 
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`group self-start flex items-center gap-4 px-8 py-4 font-medium tracking-widest uppercase text-sm transition-all duration-300 mt-4 disabled:scale-100 ${
                  status === 'sending' ? 'bg-muted/50 text-muted cursor-not-allowed' :
                  status === 'success' ? 'bg-accent/80 text-white cursor-default' :
                  status === 'error' ? 'bg-red-900 text-white hover:scale-105' :
                  'bg-secondary text-primary hover:scale-105'
                }`}
              >
                <span>
                  {status === 'sending' ? 'Transmitting...' :
                   status === 'success' ? 'Transmission Received.' :
                   status === 'error' ? 'Transmission Failed. Retry?' :
                   'Send Message'}
                </span>
                {status === 'sending' ? (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent animate-spin rounded-full" />
                ) : status === 'success' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </form>
            
            <MangaPanel 
              className="mt-8 aspect-[16/9] hidden md:block"
              image="/manga/contact-city.jpg"
              text="GOOD IDEAS START WITH A CONVERSATION."
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
