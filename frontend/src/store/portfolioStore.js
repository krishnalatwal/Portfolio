import { create } from 'zustand'
import { profileData as localProfile } from '../data/profile'
import { projectsData as localProjects } from '../data/projects'
import { skillsData as localSkills } from '../data/skills'

const API_BASE_URL = 'http://localhost:5000/api'

export const usePortfolioStore = create((set) => ({
  profile: localProfile,
  projects: localProjects,
  skills: localSkills,
  isLoading: false,
  error: null,
  
  fetchPortfolioData: async () => {
    set({ isLoading: true, error: null })
    try {
      const [profileRes, projectsRes, skillsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/profile`),
        fetch(`${API_BASE_URL}/projects`),
        fetch(`${API_BASE_URL}/skills`)
      ])
      
      if (!profileRes.ok || !projectsRes.ok || !skillsRes.ok) {
        throw new Error('API request failed')
      }
      
      const profile = await profileRes.json()
      const projects = await projectsRes.json()
      const skillsRaw = await skillsRes.json()
      
      // We need to map string icon names back to Lucide icon components on the frontend
      // For this, we can import necessary Lucide icons dynamically or map them
      // We'll map them during component rendering or in the store
      
      set({ profile, projects, skills: skillsRaw, isLoading: false })
      console.log('Portfolio data successfully fetched from dynamic APIs.')
    } catch (err) {
      console.warn('Backend API offline. Falling back seamlessly to local static data.', err.message)
      set({ 
        profile: localProfile, 
        projects: localProjects, 
        skills: localSkills, 
        isLoading: false, 
        error: 'Backend offline, using fallback' 
      })
    }
  }
}))
