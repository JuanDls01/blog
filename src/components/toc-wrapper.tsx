'use client'

import { TableOfContents } from './table-of-contents'

interface TocItem {
  id: string
  title: string
  level: number
}

interface TocWrapperProps {
  toc: TocItem[]
  className?: string
}

export function TocWrapper({ toc, className }: TocWrapperProps) {
  return <TableOfContents toc={toc} className={className} />
}