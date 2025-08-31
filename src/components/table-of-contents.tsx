'use client'

import React, { useState, useEffect } from 'react'
import { cn } from 'src/lib/utils'

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  toc: TocItem[]
  className?: string
}

export function TableOfContents({ toc, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visibleEntry = entries.find(entry => entry.isIntersecting)
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id)
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px', // Trigger when heading is near the top
        threshold: 0
      }
    )

    // Observe all headings
    toc.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [toc])

  if (!toc || toc.length === 0) {
    return null
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Account for header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav className={cn('space-y-1', className)}>
      <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3">
        Table of Contents
      </div>
      <ul className="space-y-2 text-sm">
        {toc.map(({ id, title, level }) => (
          <li key={id}>
            <button
              onClick={() => scrollToHeading(id)}
              className={cn(
                'block w-full text-left transition-colors hover:text-gray-900 dark:hover:text-gray-100',
                level === 1 && 'font-medium',
                level === 2 && 'pl-4',
                level === 3 && 'pl-8 text-xs',
                level >= 4 && 'pl-12 text-xs',
                activeId === id
                  ? 'text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400'
              )}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Utility function to extract TOC from content
export function extractTocFromContent(content: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = slugify(title)
    
    toc.push({
      id,
      title,
      level
    })
  }

  return toc
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}