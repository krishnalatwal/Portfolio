import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import apiRoutes from './routes/api.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/antigravity'

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB Database.'))
  .catch((err) => console.error('MongoDB database connection error:', err.message))

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api', apiRoutes)

// Root fallback route
app.get('/', (req, res) => {
  res.json({ message: 'Antigravity Portfolio API Service is Running.' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
