'use client'

import React from 'react'
import { MenuIcon } from 'lucide-react'

import { useWindowSize } from '@/hooks/use-window-size'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Sidebar from '@/components/sidebar'

interface MobileSidebarProps {
  apiLimitCount: number
  isPro: boolean
}

export default function MobileSidebar({
  apiLimitCount,
  isPro
}: MobileSidebarProps) {
  const windowSize = useWindowSize()

  if (windowSize.width && windowSize.width > 767) return null

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-fit p-0">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </SheetContent>
    </Sheet>
  )
}
