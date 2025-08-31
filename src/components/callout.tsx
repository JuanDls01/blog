import React from 'react'
import { 
  AlertTriangle, 
  CheckCircle, 
  Info as InfoIcon, 
  AlertCircle, 
  Lightbulb,
  Zap
} from 'lucide-react'
import { cn } from 'src/lib/utils'

type CalloutType = 'note' | 'tip' | 'warning' | 'danger' | 'info' | 'success'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
  className?: string
}

const calloutConfig = {
  note: {
    icon: InfoIcon,
    className: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30',
    titleClassName: 'text-blue-900 dark:text-blue-100',
    iconClassName: 'text-blue-600 dark:text-blue-400',
    contentClassName: 'text-blue-800 dark:text-blue-200'
  },
  tip: {
    icon: Lightbulb,
    className: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30',
    titleClassName: 'text-green-900 dark:text-green-100',
    iconClassName: 'text-green-600 dark:text-green-400',
    contentClassName: 'text-green-800 dark:text-green-200'
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30',
    titleClassName: 'text-yellow-900 dark:text-yellow-100',
    iconClassName: 'text-yellow-600 dark:text-yellow-400',
    contentClassName: 'text-yellow-800 dark:text-yellow-200'
  },
  danger: {
    icon: AlertCircle,
    className: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30',
    titleClassName: 'text-red-900 dark:text-red-100',
    iconClassName: 'text-red-600 dark:text-red-400',
    contentClassName: 'text-red-800 dark:text-red-200'
  },
  info: {
    icon: InfoIcon,
    className: 'border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/30',
    titleClassName: 'text-cyan-900 dark:text-cyan-100',
    iconClassName: 'text-cyan-600 dark:text-cyan-400',
    contentClassName: 'text-cyan-800 dark:text-cyan-200'
  },
  success: {
    icon: CheckCircle,
    className: 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30',
    titleClassName: 'text-emerald-900 dark:text-emerald-100',
    iconClassName: 'text-emerald-600 dark:text-emerald-400',
    contentClassName: 'text-emerald-800 dark:text-emerald-200'
  }
}

export function Callout({ type = 'note', title, children, className }: CalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon

  const defaultTitle = type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <div 
      className={cn(
        'my-6 flex gap-3 rounded-lg border p-4',
        config.className,
        className
      )}
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', config.iconClassName)} />
      <div className="flex-1 min-w-0">
        <div className={cn('font-semibold mb-2', config.titleClassName)}>
          {title || defaultTitle}
        </div>
        <div className={cn('prose prose-sm dark:prose-invert', config.contentClassName)}>
          {children}
        </div>
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