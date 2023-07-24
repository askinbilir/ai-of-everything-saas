'use client'

import React from 'react'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/theme-toggle'

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin']
})

export default function LandingNavbar() {
  const { isSignedIn } = useAuth()

  return (
    <nav className="fixed top-0 mx-auto flex w-full max-w-screen-2xl items-center  justify-between bg-white p-4 dark:bg-slate-950">
      <Link href="/" className="flex items-center">
        <div className="relative mr-4 h-10 w-10">
          <Image fill alt="logo" src="/logo.png" />
        </div>
        <h1
          className={cn(
            'mt-1 text-xl font-bold text-primary',
            montserrat.className
          )}
        >
          AI Of Everything
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}
