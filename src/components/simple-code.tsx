import React from 'react'
import { highlight } from 'sugar-high'
import { cn } from 'src/lib/utils'

interface SimpleCodeProps {
  children: string
  className?: string
  filename?: string
}

// Simple server-compatible code component using sugar-high
export function SimpleCode({ children, className, ...props }: SimpleCodeProps) {
  // Check if this is inline code (no language class)
  if (!className || !className.includes('language-')) {
    return (
      <code 
        className={cn(
          "relative rounded bg-gray-100 dark:bg-gray-800 px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-gray-900 dark:text-gray-100",
          className
        )}
        {...props}
      >
        {children}
      </code>
    )
  }

  // For code blocks, use sugar-high
  const codeHTML = highlight(children)
  
  return (
    <code 
      dangerouslySetInnerHTML={{ __html: codeHTML }} 
      className={cn("block", className)}
      {...props} 
    />
  )
}

// Simple pre component for code blocks
export function SimplePre({ children, ...props }: { children: React.ReactNode }) {
  return (
    <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto my-6 text-sm" {...props}>
      {children}
    </pre>
  )
}