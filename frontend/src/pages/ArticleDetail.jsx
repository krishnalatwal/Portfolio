import React, { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Container } from '../components/Container'
import { usePortfolioStore } from '../store/portfolioStore'
import { renderMdxContent } from '../utils/mdxParser'
import { ArrowLeft, Calendar, Clock, Share2, Check, Eye, EyeOff } from 'lucide-react'
import { trackEvent } from '../utils/telemetry'

export const ArticleDetail = () => {
  const { slug } = useParams()
  const journals = usePortfolioStore((state) => state.journals)
  const loadJournals = usePortfolioStore((state) => state.loadJournals)
  
  const [copied, setCopied] = useState(false)
  const [isReadingMode, setIsReadingMode] = useState(false)

  useEffect(() => {
    if (journals.length === 0) {
      loadJournals()
    }
    trackEvent('visit', { path: `/devlog/${slug}` })
  }, [slug, journals.length, loadJournals])

  // Reading Mode body class toggle
  useEffect(() => {
    if (isReadingMode) {
      document.body.classList.add('reading-mode-active')
    } else {
      document.body.classList.remove('reading-mode-active')
    }
    return () => document.body.classList.remove('reading-mode-active')
  }, [isReadingMode])

  const item = journals.find(j => j.slug === slug)

  // Reading progress scroll tracker
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    trackEvent('share_devlog', { slug })
    setTimeout(() => setCopied(false), 2000)
  }

  if (!item) {
    if (journals.length > 0) {
      return <Navigate to="/devlog" replace />
    }
    return <div className="min-h-screen flex items-center justify-center font-serif text-muted">Retrieving Transmission Archives...</div>
  }

  return (
    <div className={`transition-colors duration-500 py-32 min-h-screen relative bg-bg ${isReadingMode ? 'py-16 bg-bg/95' : ''}`}>
      {/* Dynamic Top Reading Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Floating Reading Mode Toggle */}
      <button
        onClick={() => {
          setIsReadingMode(!isReadingMode)
          trackEvent('toggle_reading_mode', { active: !isReadingMode, slug })
        }}
        className="fixed bottom-8 right-8 z-[70] px-4 py-3 bg-secondary text-primary font-mono text-xs uppercase tracking-widest border border-border hover:border-accent hover:scale-105 transition-all duration-300 shadow-premium flex items-center gap-2.5 select-none"
      >
        <div className={`w-2 h-2 rounded-full ${isReadingMode ? 'bg-accent animate-pulse' : 'bg-muted'}`} />
        {isReadingMode ? (
          <>
            <EyeOff className="w-3.5 h-3.5" />
            Exit Focus
          </>
        ) : (
          <>
            <Eye className="w-3.5 h-3.5" />
            Focus Read
          </>
        )}
      </button>

      <Container className={`transition-all duration-500 ease-in-out relative ${isReadingMode ? 'max-w-[880px] pt-12' : 'max-w-[800px]'}`}>
        
        {/* Navigation & Actions */}
        <motion.div 
          animate={{ opacity: isReadingMode ? 0 : 1, y: isReadingMode ? -15 : 0 }}
          transition={{ duration: 0.4 }}
          className={`flex items-center justify-between mb-16 select-none ${isReadingMode ? 'pointer-events-none' : ''}`}
        >
          <Link 
            to="/devlog" 
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors text-xs uppercase tracking-widest font-mono"
            onClick={() => trackEvent('back_to_devlogs', { from: slug })}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dev Logs
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors text-xs uppercase tracking-widest font-mono"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-accent" />
                Copied Link
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                Share Link
              </>
            )}
          </button>
        </motion.div>

        {/* Article Header block */}
        <motion.header 
          animate={{ opacity: isReadingMode ? 0.35 : 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-b border-border/40 pb-12"
        >
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-accent font-semibold mb-4 block">
            // {item.category}
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light leading-[1.1] text-secondary tracking-tight mb-4">
            {item.title}
          </h1>
          
          <p className="text-lg md:text-xl text-muted italic font-serif leading-relaxed mb-8">
            {item.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono tracking-widest text-muted/70 uppercase select-none">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {item.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {item.readingTime}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-6">
            {item.tags.map(tag => (
              <span 
                key={tag} 
                className="text-[9px] font-mono tracking-widest px-2 py-0.5 border border-border text-muted uppercase bg-panel/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Dynamic MDX Content Body */}
        <motion.article 
          layout="position"
          className={`prose prose-lg dark:prose-invert max-w-none text-secondary font-light transition-all duration-500 ${
            isReadingMode 
              ? 'leading-loose text-[19px] tracking-wide prose-p:mb-8' 
              : 'leading-relaxed text-[17px] prose-p:mb-6'
          }`}
        >
          {renderMdxContent(item.rawContent)}
        </motion.article>

        {/* End of Transmission Divider */}
        <motion.div 
          animate={{ opacity: isReadingMode ? 0.15 : 1, y: isReadingMode ? 15 : 0 }}
          transition={{ duration: 0.4 }}
          className={`mt-20 pt-10 border-t border-border/30 text-center select-none ${isReadingMode ? 'pointer-events-none' : ''}`}
        >
          <p className="text-[10px] font-mono tracking-[0.3em] text-muted/50 uppercase">
            // END OF TRANSMISSION LOG //
          </p>
          <Link 
            to="/devlog"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 border border-border text-xs uppercase tracking-widest text-secondary hover:border-accent hover:text-accent transition-colors duration-300 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Archives
          </Link>
        </motion.div>
      </Container>
    </div>
  )
}
