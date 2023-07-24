import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function BotAvatar() {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="/logo.png" />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  )
}
