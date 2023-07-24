import React from 'react'
import Image from 'next/image'

interface EmptyProps {
  label: string
  imageUrl?: string
}

export default function Empty({ label, imageUrl }: EmptyProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-20">
      <div className="relative h-72 w-72">
        <Image alt="empty" fill src={imageUrl || 'empty.svg'} />
      </div>
      <p className="text-center text-sm text-primary/60">{label}</p>
    </div>
  )
}
