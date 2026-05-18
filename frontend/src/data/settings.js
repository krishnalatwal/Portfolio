/**
 * SITE SETTINGS & FEATURE TOGGLES
 * ────────────────────────────────
 * Control global feature flags and site-wide metadata here.
 * No UI components need to be edited to toggle features.
 */

export const siteSettings = {
  // ── Site Identity ───────────────────────────────────────
  siteName: 'PORTFOLIO',
  siteTitle: 'Krishna Latwal | Portfolio',
  siteDescription: 'Cinematic engineering portfolio and technical journal by Krishna Latwal — Cloud & DevOps Engineer.',
  siteUrl: 'https://krishnalatwal.dev',
  siteLocale: 'en_IN',
  githubUsername: 'krishnalatwal',

  // ── Feature Flags ───────────────────────────────────────
  features: {
    threeJsBackground: true,      // Enable Three.js star field background on Hero
    telemetryTracking: true,      // Enable async user interaction telemetry
    githubActivityFeed: true,     // Show GitHub repos & commits on homepage
    readingModeToggle: true,      // Show Focus Read button on devlog articles
    contactForm: true,            // Show contact form section
    devlogSection: true,          // Show devlog navigation link and pages
  },

  // ── Navigation ──────────────────────────────────────────
  nav: {
    showAbout: true,
    showSkills: true,
    showProjects: true,
    showActivity: true,
    showContact: true,
    showDevlogs: true,
  },

  // ── Hero Visual ─────────────────────────────────────────
  hero: {
    // Japanese tagline displayed in the manga panel
    taglineJP: '未来をデザインすることだ。',
    taglineEN: '"DESIGN THE FUTURE"',
    // Path to the hero manga panel image
    heroImage: '/manga/hero-coding.jpg',
    ctaPrimary: { label: 'View Projects →', href: '#projects' },
    ctaSecondary: { label: 'Contact Me', href: '#contact' },
  },

  // ── About Visual Panels ─────────────────────────────────
  about: {
    subtitle: 'My role is to turn ideas into scalable digital solutions.',
    panels: [
      { image: '/manga/about-city.jpg', text: 'EVERY PROJECT BEGINS WITH A PROBLEM.', span: 2, aspect: 'aspect-[21/9]' },
      { image: '/manga/about-focus.jpg', text: null, span: 1, aspect: 'aspect-[4/5]' },
      { image: null, text: 'SIMPLE. PRACTICAL. IMPACTFUL.', span: null, aspect: 'aspect-[4/3]' },
      { image: '/manga/about-code.jpg', text: null, span: null, aspect: 'aspect-[16/9]' },
    ]
  },

  // ── GitHub Activity ─────────────────────────────────────
  github: {
    cacheMinutes: 10,           // sessionStorage cache duration in minutes
    reposToShow: 4,             // Max number of repos to display
    eventsToShow: 5,            // Max number of commit events to display
  },

  // ── Footer ──────────────────────────────────────────────
  footer: {
    copyrightName: 'KRISHNA',
  }
}
