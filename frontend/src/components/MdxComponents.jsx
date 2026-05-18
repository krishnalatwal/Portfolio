import React from 'react'
import { motion } from 'framer-motion'
import { Terminal, Copy, Check } from 'lucide-react'
import { useState } from 'react'

// 1. TransmissionQuote Component
export const TransmissionQuote = ({ quote, source }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="my-12 pl-6 border-l-2 border-accent py-2 relative bg-panel/10"
    >
      <div className="absolute top-0 left-0 w-2 h-[1px] bg-accent" />
      <div className="absolute bottom-0 left-0 w-2 h-[1px] bg-accent" />
      
      <p className="text-xl md:text-2xl font-serif italic text-secondary leading-relaxed tracking-wide">
        "{quote}"
      </p>
      {source && (
        <p className="text-xs uppercase tracking-widest text-muted mt-4 font-mono">
          // {source}
        </p>
      )}
    </motion.div>
  )
}

// 2. CodeWindow Component
export const CodeWindow = ({ code, language }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-8 border border-border bg-panel shadow-premium font-mono text-sm overflow-hidden w-full max-w-full">
      {/* Tab Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary border-b border-border select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-accent" />
          <span className="text-xs tracking-wider text-muted uppercase font-semibold">{language || 'code'}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-muted hover:text-accent transition-colors p-1"
          title="Copy Code"
        >
          {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Code Text Pane */}
      <pre className="p-5 overflow-x-auto text-secondary leading-relaxed select-text bg-[#0b0c10] text-[#c9d1d9] max-w-full">
        <code>{code.trim()}</code>
      </pre>
    </div>
  )
}

// 3. MangaPanel Component
export const MangaPanel = ({ image, text, className }) => {
  return (
    <div className={`relative border border-border bg-panel overflow-hidden group my-12 aspect-[16/9] ${className || ''}`}>

      {image ? (
        <img 
          src={image} 
          alt={text || "Blueprint Panel"} 
          loading="lazy"
          className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-102"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-muted font-serif italic">
          Blueprint Asset Missing
        </div>
      )}
      
      {text && (
        <div className="absolute top-6 right-6 bg-bg border border-border py-4 px-5 shadow-2xl select-none">
          <p className="font-serif italic text-md leading-snug write-vertical-right tracking-widest text-secondary">
            {text}
          </p>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-bg/40 to-transparent"></div>
    </div>
  )
}
