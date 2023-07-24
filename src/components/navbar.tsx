import React from 'react'
import { UserButton } from '@clerk/nextjs'

import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import MobileSidebar from '@/components/mobile-sidebar'
import ThemeToggle from '@/components/theme-toggle'

export default async function Navbar() {
  const apiLimitCount = (await getApiLimitCount()) || 0
  const isPro = (await checkSubscription()) || false

  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      <div className="flex w-full justify-end">
        <div className="flex gap-x-3">
          <div className="mt-[2px]">
            <UserButton afterSignOutUrl="/" />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
