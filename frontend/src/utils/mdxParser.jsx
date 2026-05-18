import React from 'react'
import { TransmissionQuote, CodeWindow, MangaPanel } from '../components/MdxComponents'

/**
 * Utility to parse MDX frontmatter metadata from raw file contents.
 */
export const parseMdxFrontmatter = (rawContent) => {
  if (!rawContent) return null
  
  const matches = rawContent.split(/---/g)
  if (matches.length < 3) return null
  
  const frontmatterText = matches[1].trim()
  const lines = frontmatterText.split('\n')
  const metadata = {}
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex !== -1) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()
      
      // Strip outer quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1)
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.substring(1, value.length - 1)
      }
      
      // Parse array fields (like tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          // Replace single quotes with double quotes for valid JSON
          const jsonString = value.replace(/'/g, '"')
          value = JSON.parse(jsonString)
        } catch (e) {
          value = value.replace(/[\[\]"]/g, '').split(',').map(s => s.trim())
        }
      }
      
      metadata[key] = value
    }
  })
  
  return metadata
}

/**
 * Utility to parse remaining body content of MDX files and map them to interactive React elements.
 */
export const renderMdxContent = (rawContent) => {
  if (!rawContent) return null
  
  const matches = rawContent.split(/---/g)
  if (matches.length < 3) return null
  
  const bodyText = matches.slice(2).join('---').trim()
  
  // Split body by double newlines or component tags to parse structural blocks
  const blocks = []
  
  // Custom Regex for embedded components and formatting
  const tokenRegex = /(<TransmissionQuote[^>]+>|<MangaPanel[^>]+>|```[a-zA-Z]*[\s\S]*?```|##\s+[^\n]+|#\s+[^\n]+|---\n)/g
  const tokens = bodyText.split(tokenRegex)
  
  tokens.forEach((token, index) => {
    const trimmed = token.trim()
    if (!trimmed) return
    
    // 1. Check Code Block
    if (trimmed.startsWith('```')) {
      const firstLineEnd = trimmed.indexOf('\n')
      const language = trimmed.substring(3, firstLineEnd).trim() || 'javascript'
      const code = trimmed.substring(firstLineEnd + 1, trimmed.length - 3).trim()
      blocks.push(
        <CodeWindow key={index} code={code} language={language} />
      )
      return
    }
    
    // 2. Check H1 Header
    if (trimmed.startsWith('# ')) {
      const title = trimmed.substring(2).trim()
      blocks.push(
        <h1 key={index} className="text-4xl md:text-5xl font-serif font-light text-secondary tracking-tight mt-12 mb-6">
          {title}
        </h1>
      )
      return
    }
    
    // 3. Check H2 Header
    if (trimmed.startsWith('## ')) {
      const subtitle = trimmed.substring(3).trim()
      blocks.push(
        <h2 key={index} className="text-2xl md:text-3xl font-serif font-light text-secondary tracking-tight mt-10 mb-4">
          {subtitle}
        </h2>
      )
      return
    }
    
    // 4. Check Horizontal Divider
    if (trimmed === '---') {
      blocks.push(
        <hr key={index} className="border-t border-border/40 my-10" />
      )
      return
    }
    
    // 5. Check TransmissionQuote Tag
    if (trimmed.startsWith('<TransmissionQuote')) {
      const quoteMatch = trimmed.match(/quote=["']([^"']+)["']/)
      const sourceMatch = trimmed.match(/source=["']([^"']+)["']/)
      const quote = quoteMatch ? quoteMatch[1] : ''
      const source = sourceMatch ? sourceMatch[1] : ''
      blocks.push(
        <TransmissionQuote key={index} quote={quote} source={source} />
      )
      return
    }
    
    // 6. Check MangaPanel Tag
    if (trimmed.startsWith('<MangaPanel')) {
      const imageMatch = trimmed.match(/image=["']([^"']+)["']/)
      const textMatch = trimmed.match(/text=["']([^"']+)["']/)
      const image = imageMatch ? imageMatch[1] : ''
      const text = textMatch ? textMatch[1] : ''
      blocks.push(
        <MangaPanel key={index} image={image} text={text} />
      )
      return
    }
    
    // 7. Render Standard Editorial Paragraphs (supporting bold markdown **text**)
    const paragraphs = trimmed.split('\n\n')
    paragraphs.forEach((p, pIdx) => {
      const cleanedParagraph = p.trim()
      if (!cleanedParagraph) return
      
      // Parse basic bold formatting
      const parts = cleanedParagraph.split(/\*\*([\s\S]*?)\*\*/g)
      const children = parts.map((part, pPartIdx) => {
        if (pPartIdx % 2 === 1) {
          return <strong key={pPartIdx} className="font-semibold text-secondary">{part}</strong>
        }
        return part
      })
      
      blocks.push(
        <p key={`${index}-${pIdx}`} className="text-lg text-muted font-light leading-relaxed mb-6 select-text">
          {children}
        </p>
      )
    })
  })
  
  return <div className="space-y-4 max-w-full">{blocks}</div>
}
