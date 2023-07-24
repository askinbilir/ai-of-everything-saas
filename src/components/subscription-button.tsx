'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { ZapIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/button'

interface SubscriptionButtonProps {
  isPro: boolean
}

export default function SubscriptionButton({
  isPro = false
}: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('/api/stripe')

      window.location.href = data.url
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(true)
    }
  }

  return isPro ? (
    <Button onClick={handleClick}>Manage Subscription</Button>
  ) : (
    <Button variant="premium" isLoading={isLoading} onClick={handleClick}>
      Upgrade <ZapIcon className="ml-2 h-4 w-4 fill-white" />
    </Button>
  )
}
