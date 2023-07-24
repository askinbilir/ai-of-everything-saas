'use client'

import React from 'react'

import CrispProvider from '@/components/crisp-provider'
import ModalProvider from '@/components/modal-provider'
import ThemeProvider from '@/components/theme-provider'
import ToasterProvider from '@/components/toaster-provider'

interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CrispProvider />
      <ToasterProvider />
      <ModalProvider />
      {children}
    </ThemeProvider>
  )
}

export default Providers
