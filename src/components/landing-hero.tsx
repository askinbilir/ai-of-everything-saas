'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import TypewriterComponent from 'typewriter-effect'

import { Button } from '@/components/ui/button'

export default function LandingHero() {
  const { isSignedIn } = useAuth()

  return (
    <div className="space-y-5 py-36 text-center font-bold text-primary">
      <div className="space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
        <h1>The Best AI Tool</h1>
        <h1>for</h1>
        <div className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          <TypewriterComponent
            options={{
              strings: [
                'Chatbot',
                'Photo Generation',
                'Music Generation',
                'Video Generation',
                'Code Generation'
              ],
              autoStart: true,
              loop: true
            }}
          />
        </div>
      </div>
      <p className="text-sm font-light text-muted-foreground md:text-base lg:text-xl">
        Create content using AI 10x faster.
      </p>
      <div>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button
            variant="premium"
            className="rounded-full p-4 font-semibold transition hover:scale-105 md:p-6 md:text-lg"
          >
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <p className="text-xs font-normal text-muted-foreground md:text-sm">
        No credit card required.
      </p>
    </div>
  )
}
