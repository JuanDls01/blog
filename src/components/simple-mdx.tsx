import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { createElement } from 'react'
import { SimpleCode, SimplePre } from './simple-code'
import { Callout, Note, Tip, Warning, Danger, Info, Success } from './callout'
import { extractTocFromContent } from './table-of-contents'
import { TocWrapper } from './toc-wrapper'
import { cn } from 'src/lib/utils'

// Types for better TypeScript support
interface CustomLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

interface CustomImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

interface TableData {
  headers: string[]
  rows: string[][]
}

interface TableProps {
  data: TableData
}

interface SimpleMDXProps {
  source: string
  components?: Record<string, React.ComponentType<any>>
  options?: {
    showTableOfContents?: boolean
    enableMath?: boolean
  }
}

function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

function CustomLink({ href, children, className, ...props }: CustomLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={className}
      {...props}
    >
      {children}
    </a>
  )
}

function RoundedImage({ alt, className, ...props }: CustomImageProps) {
  return (
    <Image 
      alt={alt} 
      className={cn("rounded-lg my-6 mx-auto", className)} 
      {...props} 
    />
  )
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

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children, ...props }: { children: React.ReactNode }) => {
    const slug = slugify(typeof children === 'string' ? children : children?.toString() || '')
    return createElement(
      `h${level}`,
      { 
        id: slug,
        className: cn(
          'scroll-mt-20',
          level === 1 && 'text-4xl font-bold mt-12 mb-4',
          level === 2 && 'text-2xl font-semibold mt-10 mb-4',
          level === 3 && 'text-xl font-semibold mt-8 mb-3',
          level === 4 && 'text-lg font-medium mt-6 mb-2',
          level >= 5 && 'text-base font-medium mt-4 mb-2'
        ),
        ...props
      },
      [
        createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
          'aria-label': `Link to ${children}`
        }),
        children
      ]
    )
  }

  Heading.displayName = `Heading${level}`
  return Heading
}

// Simple components that work during build
const components = {
  // Headings with proper anchor links
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  
  // Enhanced media
  Image: RoundedImage,
  img: RoundedImage,
  
  // Enhanced links
  a: CustomLink,
  
  // Simple code components
  code: SimpleCode,
  pre: SimplePre,
  
  // Tables
  Table,
  
  // Callout components
  Callout,
  Note,
  Tip,
  Warning,
  Danger,
  Info,
  Success,
  
  // Enhanced blockquote
  blockquote: ({ children, ...props }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-blue-50 dark:bg-blue-950/20 rounded-r italic" {...props}>
      {children}
    </blockquote>
  ),
  
  // Enhanced HR
  hr: ({ ...props }) => (
    <hr className="my-8 border-gray-300 dark:border-gray-600" {...props} />
  )
}

export function SimpleMDX({ source, components: customComponents, options = {} }: SimpleMDXProps) {
  const { showTableOfContents = false } = options
  const toc = showTableOfContents ? extractTocFromContent(source) : []
  
  return (
    <div className="relative">
      {showTableOfContents && toc.length > 0 && (
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <TocWrapper toc={toc} />
        </div>
      )}
      <MDXRemote
        source={source}
        components={{ ...components, ...(customComponents || {}) }}
      />
    </div>
  )
}

// Export individual components for direct use in MDX
export {
  Callout,
  Note,
  Tip,
  Warning,
  Danger,
  Info,
  Success
}