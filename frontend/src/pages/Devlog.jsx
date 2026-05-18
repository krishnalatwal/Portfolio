import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '../components/Container'
import { SectionTitle } from '../components/SectionTitle'
import { usePortfolioStore } from '../store/portfolioStore'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react'
import { trackEvent } from '../utils/telemetry'

export const Devlog = () => {
  const journals = usePortfolioStore((state) => state.journals)
  const loadJournals = usePortfolioStore((state) => state.loadJournals)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    loadJournals()
    trackEvent('visit', { path: '/devlog' })
  }, [loadJournals])

  const categories = ['All', 'Systems', 'Aesthetics', 'AI']

  // Filter and search
  const filteredJournals = journals.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <div className="py-32 min-h-screen relative bg-bg">
      <Container>
        {/* Title Header */}
        <div className="mb-16">
          <SectionTitle 
            chapter="07"
            title="Dev Logs."
            subtitle="Engineering archives, system design field notes, and technical build logs."
          />
        </div>

        {/* Search & Categories Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border/40 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 select-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  trackEvent('filter_devlogs', { category: cat })
                }}
                className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'border-accent bg-accent text-white font-medium' 
                    : 'border-border text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Monospace Search */}
          <div className="relative w-full md:max-w-xs">
            <input 
              type="text"
              placeholder="SEARCH SYSTEMS LOGS..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                trackEvent('search_devlogs', { query: e.target.value })
              }}
              className="w-full bg-panel/30 border border-border py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors text-xs font-mono uppercase tracking-wider text-secondary placeholder:text-muted/40"
            />
            <Search className="w-4 h-4 text-muted/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* List Grid */}
        <AnimatePresence mode="popLayout">
          {filteredJournals.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredJournals.map((item) => (
                <motion.article 
                  key={item.slug}
                  variants={cardVariants}
                  layout
                  className="group flex flex-col border border-border bg-panel/10 hover:border-accent transition-all duration-500 overflow-hidden relative"
                >
                  <div className="noise-overlay" />
                  
                  {/* Article Card Frame */}
                  <Link 
                    to={`/devlog/${item.slug}`}
                    onClick={() => trackEvent('devlog_click', { slug: item.slug, title: item.title })}
                    className="p-8 flex flex-col h-full justify-between gap-6"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Meta info */}
                      <div className="flex items-center justify-between text-xs font-mono tracking-widest text-muted/70 uppercase">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.publishedAt}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {item.readingTime}
                        </span>
                      </div>

                      {/* Header block */}
                      <div className="flex flex-col gap-2 mt-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-accent font-semibold">
                          // {item.category}
                        </span>
                        <h3 className="text-2xl font-serif text-secondary group-hover:text-accent transition-colors duration-300 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted/80 italic font-serif leading-snug">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Summary */}
                      <p className="text-sm text-muted font-light leading-relaxed mt-2 line-clamp-3">
                        {item.summary}
                      </p>
                    </div>

                    {/* Bottom Tags */}
                    <div className="flex flex-col gap-4 border-t border-border/20 pt-4 mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="text-[9px] font-mono tracking-widest px-2 py-0.5 border border-border/60 text-muted uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-secondary group-hover:text-accent transition-colors font-medium">
                        Read Transmission
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 border border-dashed border-border"
            >
              <p className="text-muted font-serif italic text-lg">// No transmissions match the search filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  )
}
