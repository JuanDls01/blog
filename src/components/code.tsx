'use client'

import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from 'src/lib/utils'

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
  highlightLines?: number[]
  className?: string
}

export function CodeBlock({ 
  children, 
  language = 'text', 
  filename, 
  highlightLines = [], 
  className 
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className={cn("relative group my-6", className)}>
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-200 text-sm font-medium rounded-t-lg border-b border-gray-700">
          <span>{filename}</span>
          <span className="text-xs text-gray-400 uppercase">{language}</span>
        </div>
      )}
      
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
          title={isCopied ? 'Copied!' : 'Copy code'}
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
        
        <pre 
          className={cn(
            "overflow-x-auto p-4 text-sm leading-6",
            filename ? "rounded-b-lg" : "rounded-lg",
            "bg-gray-900 text-gray-100"
          )}
        >
          <code className={`language-${language}`}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  )
}

interface InlineCodeProps {
  children: string
  className?: string
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code 
      className={cn(
        "relative rounded bg-gray-100 dark:bg-gray-800 px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-gray-900 dark:text-gray-100",
        className
      )}
    >
      {children}
    </code>
  )
}