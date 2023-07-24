import React from 'react'
import { SettingsIcon } from 'lucide-react'

import { checkSubscription } from '@/lib/subscription'
import Heading from '@/components/heading'
import SubscriptionButton from '@/components/subscription-button'

export default async function Page() {
  const isPro = await checkSubscription()

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={SettingsIcon}
        iconColor="text-red-400 dark:text-red-600"
        bgColor="bg-red-400/10 dark:bg-red-600/10"
      />
      <div className="space-y-4 px-4 lg:px-8">
        <div className="text-sm text-muted-foreground">
          You are currently on a {isPro ? 'pro' : 'free'} plan
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}
