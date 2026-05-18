/**
 * SocialIcons
 * ──────────────────────────────────────────
 * Single source of all brand/social SVG icons.
 * Renders a <SocialRow> or individual <SocialIcon> from socials.js data.
 * No icon definitions exist elsewhere in the codebase.
 */
import React from 'react'
import { Mail } from 'lucide-react'
import { socialsData } from '../data/socials'
import { trackEvent } from '../utils/telemetry'

// ── Individual Brand SVG Icons ───────────────────────────────────────
const GithubSvg = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedinSvg = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const InstagramSvg = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const TwitterSvg = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l16 16M4 20 20 4" />
  </svg>
)

// ── Icon Resolver ────────────────────────────────────────────────────
const iconMap = {
  github: GithubSvg,
  linkedin: LinkedinSvg,
  instagram: InstagramSvg,
  twitter: TwitterSvg,
  email: ({ className }) => <Mail width={20} height={20} className={className} />,
}

// ── Single Social Icon Button ────────────────────────────────────────
export const SocialIcon = ({ social, className = '', iconClassName = '', placement = 'default' }) => {
  const Icon = iconMap[social.icon]
  if (!Icon) return null

  return (
    <a
      href={social.url}
      target={social.icon !== 'email' ? '_blank' : undefined}
      rel={social.icon !== 'email' ? 'noreferrer' : undefined}
      onClick={() => trackEvent('social_click', { platform: social.id, placement })}
      aria-label={social.ariaLabel || social.label}
      className={`text-muted hover:text-accent hover:scale-110 transition-all duration-300 p-2.5 border border-border bg-panel/20 ${className}`}
    >
      <Icon className={`w-5 h-5 ${iconClassName}`} />
    </a>
  )
}

// ── Full Social Row (renders all socials from socials.js) ────────────
export const SocialRow = ({ placement = 'default', className = '' }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    {socialsData.map(social => (
      <SocialIcon key={social.id} social={social} placement={placement} />
    ))}
  </div>
)
