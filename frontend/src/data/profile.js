/**
 * PROFILE CONFIGURATION
 * ─────────────────────
 * Edit all personal information here.
 * This is the single source of truth for:
 * Hero section, About section, Contact section, and SEO metadata.
 */
export const profileData = {
  name: 'Krishna.',
  fullName: 'Krishna Latwal',
  title: 'CLOUD & DEVOPS ENGINEER',
  description: 'I architect scalable cloud infrastructure and engineer seamless deployment pipelines.',
  resumeUrl: '#',              // Set to your actual resume PDF URL when ready
  openToWork: true,            // Toggles "Open to Work" badge on Hero if implemented

  about: {
    heading: 'About Me.',
    subtitle: 'My role is to turn ideas into scalable digital solutions.',
    text: [
      'I am a DevOps and Cloud Engineering specialist focused on designing automated, reliable systems.',
      'Currently completing my Computer Science degree at Lovely Professional University, I bridge the gap between software development and infrastructure. My role is to eliminate friction—turning manual deployments into automated, resilient pipelines.'
    ],
    stats: [
      { label: 'Problems Solved', value: '200+' },
      { label: 'Core Projects', value: '3+' },
      { label: 'Tools Mastered', value: '15+' }
    ]
  },

  contact: {
    email: 'krishnalatwal7560@gmail.com',
    phone: '+91 98765 43210',
    location: 'Punjab, India',
  }
}

