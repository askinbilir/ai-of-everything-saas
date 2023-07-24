import React from 'react'

import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const apiLimitCount = (await getApiLimitCount()) || 0
  const isPro = (await checkSubscription()) || false

  return (
    <div className="relative h-full">
      <div className="z-50 hidden h-full bg-primary md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  )
}
