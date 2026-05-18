import express from 'express'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import Message from '../models/Message.js'
import Telemetry from '../models/Telemetry.js'

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

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' })
  }

  // Basic email pattern check
  const emailRegex = /^\S+@\S+\.\S+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address format.' })
  }

  try {
    const newMessage = await Message.create({ name, email, message })
    res.status(201).json({ 
      success: true, 
      message: 'Transmission received and logged successfully.', 
      data: newMessage 
    })
  } catch (error) {
    console.error('Error logging transmission to MongoDB:', error)
    res.status(500).json({ error: 'Failed to process message transmission' })
  }
})

router.post('/telemetry', async (req, res) => {
  const { eventType, eventData } = req.body
  const userAgent = req.headers['user-agent'] || 'Unknown'

  if (!eventType) {
    return res.status(400).json({ error: 'Event type is required.' })
  }

  try {
    const log = await Telemetry.create({ eventType, eventData, userAgent })
    res.status(201).json({ success: true, message: 'Telemetry event logged.', data: log })
  } catch (error) {
    console.error('Error logging telemetry event:', error)
    res.status(500).json({ error: 'Failed to log telemetry.' })
  }
})

export default router
