import { Container } from '../components/Container'
import { MangaPanel } from '../components/MangaPanel'
import { SectionTitle } from '../components/SectionTitle'
import { SocialRow } from '../components/SocialIcons'
import { usePortfolioStore } from '../store/portfolioStore'
import { Mail, MapPin, Phone, ArrowRight, Check, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { trackEvent } from '../utils/telemetry'

export const Contact = () => {
  const profileData = usePortfolioStore((state) => state.profile)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
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

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Server error')
      }

      trackEvent('contact_submit', { email: formData.email })
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message.toUpperCase() || 'TRANSMISSION FAILED.')
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-panel/30">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
          {/* Left Column — contact info */}
          <div>
            <SectionTitle 
              chapter="06" 
              title="Let's Connect."
              subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
            />
            
            {/* Contact Details — driven by profile.js */}
            <div className="flex flex-col gap-8 mt-12">
              <a 
                href={`mailto:${profileData.contact.email}`} 
                onClick={() => trackEvent('social_click', { platform: 'email', placement: 'contact' })}
                className="flex items-center gap-4 text-muted hover:text-accent transition-colors group"
              >
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
            
            {/* Social Links — driven entirely by socials.js */}
            <SocialRow placement="contact" className="mt-12" />
          </div>
          
          {/* Right Column — contact form */}
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
