import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Container } from '../components/Container'
import { SectionTitle } from '../components/SectionTitle'
import { usePortfolioStore } from '../store/portfolioStore'
import { siteSettings } from '../data/settings'
import { GitPullRequest, Star, GitFork, ExternalLink, RefreshCw } from 'lucide-react'
import { trackEvent } from '../utils/telemetry'

export const GithubActivity = () => {
  const repos = usePortfolioStore((state) => state.githubRepos)
  const events = usePortfolioStore((state) => state.githubEvents)
  const isLoading = usePortfolioStore((state) => state.isGithubLoading)
  const fetchGithubActivity = usePortfolioStore((state) => state.fetchGithubActivity)

  useEffect(() => {
    fetchGithubActivity()
  }, [fetchGithubActivity])

  const formatRelativeTime = (dateStr) => {
    try {
      const date = new Date(dateStr)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      return `${diffDays}d ago`
    } catch (e) {
      return 'recent'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  }

  return (
    <section id="github-activity" className="py-24 md:py-32 border-t border-border/20 relative bg-bg">
      <Container>
        {/* Section Header */}
        <div className="mb-16">
          <SectionTitle 
            chapter="05"
            title="Active Streams."
            subtitle="Repository telemetry and recent commit feeds ingested in real time from the GitHub REST API."
          />
        </div>

        {isLoading && repos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 select-none">
            <RefreshCw className="w-8 h-8 text-accent animate-spin mb-4" />
            <p className="font-mono text-xs uppercase tracking-widest text-muted">// Fetching Git Logs...</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-start"
          >
            {/* Repositories Column */}
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-muted select-none">
                // SYSTEM REPOSITORIES
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                {repos.slice(0, siteSettings.github.reposToShow).map((repo) => (
                  <motion.div 
                    key={repo.id}
                    variants={itemVariants}
                    className="group border border-border bg-panel/10 hover:border-accent transition-all duration-500 p-6 flex flex-col justify-between h-[200px] relative overflow-hidden"
                  >
                    <div className="noise-overlay" />
                    
                    {/* Header */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-accent font-semibold">
                          {repo.language}
                        </span>
                        <a 
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => trackEvent('github_repo_click', { name: repo.name })}
                          className="text-muted hover:text-accent transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      
                      <h4 className="text-xl font-serif text-secondary leading-tight mt-1 group-hover:text-accent transition-colors">
                        {repo.name}
                      </h4>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted/95 leading-relaxed line-clamp-3 my-3 font-light">
                      {repo.description}
                    </p>

                    {/* Footer Stats */}
                    <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-muted/70 uppercase border-t border-border/20 pt-3 mt-auto select-none">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-accent" />
                        {repo.stargazers_count} Stars
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        {repo.forks_count} Forks
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Commits Feed Column */}
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-muted select-none">
                // ACTIVE COMMIT TELEMETRY
              </h3>

              <motion.div 
                variants={itemVariants}
                className="border border-border bg-panel shadow-premium p-6 font-mono text-xs overflow-hidden relative"
              >
                <div className="noise-overlay" />
                
                {/* Visual Header */}
                <div className="flex items-center gap-2 pb-4 border-b border-border/30 mb-6 select-none">
                  <GitPullRequest className="w-4 h-4 text-accent" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-secondary">
                    TRANSMISSION_STREAM.log
                  </span>
                </div>

                {/* Vertical Commit timeline */}
                <div className="space-y-6 relative pl-4 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border/40">
                  {events.map((event) => {
                    const commitMsg = event.payload?.commits?.[0]?.message || 'Routine codebase optimization'
                    const repoBaseName = event.repo.name.replace('krishnalatwal/', '')

                    return (
                      <div key={event.id} className="relative group/commit">
                        {/* Circle Indicator */}
                        <div className="absolute -left-[15px] top-1.5 w-2.5 h-2.5 rounded-full border border-border bg-bg group-hover/commit:border-accent transition-colors flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-accent opacity-0 group-hover/commit:opacity-100 transition-opacity" />
                        </div>

                        <div className="flex flex-col gap-1 pl-2">
                          {/* Metadata */}
                          <div className="flex items-center justify-between text-[9px] text-muted tracking-widest uppercase">
                            <span className="font-semibold text-secondary group-hover/commit:text-accent transition-colors">
                              {repoBaseName}
                            </span>
                            <span>{formatRelativeTime(event.created_at)}</span>
                          </div>

                          {/* Message */}
                          <p className="text-xs text-muted/95 leading-relaxed group-hover/commit:text-secondary transition-colors font-light select-text line-clamp-2">
                            {commitMsg}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Visual Footer */}
                <div className="mt-6 pt-4 border-t border-border/30 text-center select-none">
                  <span className="text-[9px] uppercase tracking-widest text-muted/50 font-semibold animate-pulse">
                    ● SYSTEMS IN OPERATION
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
