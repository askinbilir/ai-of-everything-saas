import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import Providers from '@/components/providers'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Of Everything',
  description: 'AI Platform for generating content.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className}>
          <Providers>
            <div className="mx-auto h-full max-w-screen-2xl">{children}</div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
