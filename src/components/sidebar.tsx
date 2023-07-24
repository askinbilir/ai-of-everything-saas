'use client'

import React from 'react'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ROUTES } from '@/constants/menus'
import { cn } from '@/lib/utils'
import FreeTrialCounter from '@/components/free-trial-counter'

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] })

interface SidebarProps {
  apiLimitCount: number
  isPro: boolean
}

export default function Sidebar({ apiLimitCount, isPro }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col gap-y-4 bg-secondary py-4 text-primary">
      <div className="fill flex-1 px-3 py-2 pr-10">
        <Link href="/dashboard" className="mb-14 flex items-center pl-3">
          <div className="relative mr-2 h-10 w-10">
            <Image fill alt="logo" src="/logo.png" />
          </div>
          <p className={cn('mt-1 text-xl font-bold', montserrat.className)}>
            AI Of Everything
          </p>
        </Link>

        <div className="space-y-1">
          {ROUTES.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium text-primary/70 transition hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/10',
                pathname === route.href && `${route.active} text-primary`
              )}
            >
              <div className="flex flex-1 items-center">
                <route.icon className={cn('mr-3 h-5 w-5', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      {!isPro && <FreeTrialCounter apiLimitCount={apiLimitCount} />}
    </div>
  )
}
