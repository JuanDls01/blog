import React from 'react'
import {
  AlertTriangle,
  CheckCircle,
  Info as InfoIcon,
  AlertCircle,
  Lightbulb,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type CalloutType = 'note' | 'tip' | 'warning' | 'danger' | 'info' | 'success'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
  className?: string
}

// Neutral surface from the site tokens; only the icon carries the semantic hue
const calloutConfig = {
  note: {
    icon: InfoIcon,
    iconClassName: 'text-blue-600 dark:text-blue-400',
  },
  tip: {
    icon: Lightbulb,
    iconClassName: 'text-accent',
  },
  warning: {
    icon: AlertTriangle,
    iconClassName: 'text-yellow-600 dark:text-yellow-400',
  },
  danger: {
    icon: AlertCircle,
    iconClassName: 'text-red-600 dark:text-red-400',
  },
  info: {
    icon: InfoIcon,
    iconClassName: 'text-cyan-600 dark:text-cyan-400',
  },
  success: {
    icon: CheckCircle,
    iconClassName: 'text-emerald-600 dark:text-emerald-400',
  },
}

export function Callout({ type = 'note', title, children, className }: CalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon

  const defaultTitle = type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <div
      className={cn(
        'my-6 flex gap-3 rounded-lg border border-line bg-surface p-4',
        className
      )}
    >
      <Icon className={cn('size-4 shrink-0 mt-0.5', config.iconClassName)} />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-fg mb-1">
          {title || defaultTitle}
        </div>
        <div className="callout-content text-muted">{children}</div>
      </div>
    </div>
  )
}

// Convenience components for each type
export const Note = (props: Omit<CalloutProps, 'type'>) => (
  <Callout {...props} type="note" />
)

export const Tip = (props: Omit<CalloutProps, 'type'>) => (
  <Callout {...props} type="tip" />
)

export const Warning = (props: Omit<CalloutProps, 'type'>) => (
  <Callout {...props} type="warning" />
)

export const Danger = (props: Omit<CalloutProps, 'type'>) => (
  <Callout {...props} type="danger" />
)

export const Info = (props: Omit<CalloutProps, 'type'>) => (
  <Callout {...props} type="info" />
)

export const Success = (props: Omit<CalloutProps, 'type'>) => (
  <Callout {...props} type="success" />
)
