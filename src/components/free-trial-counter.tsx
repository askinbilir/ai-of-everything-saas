import React from 'react'
import { ZapIcon } from 'lucide-react'

import { Config } from '@/constants/config'
import { useProModal } from '@/hooks/use-pro-modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface FreeTrialCounterProps {
  apiLimitCount: number
}

export default function FreeTrialCounter({
  apiLimitCount = 0
}: FreeTrialCounterProps) {
  const proModal = useProModal()

  return (
    <div className="px-3">
      <Card className="border-0 bg-primary/10">
        <CardContent className="py-6">
          <div className="mb-4 space-y-2 text-center text-sm text-primary">
            <p>
              {apiLimitCount} / {Config.MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-3  "
              value={(apiLimitCount / Config.MAX_FREE_COUNTS) * 100}
              classNameIndicator="bg-indigo-400 dark:bg-indigo-600"
            />
          </div>
          <Button
            variant="premium"
            className="w-full"
            onClick={proModal.onOpen}
          >
            Upgrade <ZapIcon className="ml-2 h-4 w-4 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
