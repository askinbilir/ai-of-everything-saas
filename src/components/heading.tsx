import React from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface HeadingProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor?: string
  bgColor: string
}

export default function Heading({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor
}: HeadingProps) {
  return (
    <div className="mb-8 flex items-center gap-x-3 px-4 lg:px-8">
      <div className={cn('w-fit rounded-md p-2', bgColor)}>
        <Icon className={cn('h-10 w-10', iconColor)} />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm text-primary/50">{description}</p>
      </div>
    </div>
  )
}
