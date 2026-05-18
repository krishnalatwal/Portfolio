import express from 'express'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataDir = path.join(__dirname, '../data')

// Helper function to read json safely
const readJson = async (filename) => {
  const filePath = path.join(dataDir, filename)
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

router.get('/profile', async (req, res) => {
  try {
    const profile = await readJson('profile.json')
    res.json(profile)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve profile data' })
  }
})

router.get('/projects', async (req, res) => {
  try {
    const projects = await readJson('projects.json')
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve projects data' })
  }
})

router.get('/skills', async (req, res) => {
  try {
    const skills = await readJson('skills.json')
    res.json(skills)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve skills data' })
  }
})

export default router
