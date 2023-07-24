'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRightIcon } from 'lucide-react'

import { TOOLS } from '@/constants/menus'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

export default function Page() {
  const router = useRouter()

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h1 className="text-center text-2xl font-bold md:text-4xl">
          Explore the power of AI
        </h1>
        <p className="text-center text-sm font-light text-primary/80 md:text-lg">
          Chat with the genius AI - Discover the capabilities
        </p>
      </div>
      <div className="space-y-4 px-4 md:px-20 lg:px-32">
        {TOOLS.map(tool => (
          <Card
            key={tool.href}
            className={cn(
              'flex cursor-pointer items-center justify-between border-primary/10 p-4 transition hover:shadow-md',
              tool.hover
            )}
            onClick={() => router.push(tool.href)}
          >
            <div className="flex items-center gap-x-4">
              <div className={cn('w-fit rounded-md p-2', tool.bg)}>
                <tool.icon className={cn('h-8 w-8', tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRightIcon className="h-5 w-5" />
          </Card>
        ))}
      </div>
    </div>
  )
}
