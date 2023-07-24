'use client'

import { useState } from 'react'
import axios from 'axios'
import { CheckIcon, ZapIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'

import { TOOLS } from '@/constants/menus'
import { cn } from '@/lib/utils'
import { useProModal } from '@/hooks/use-pro-modal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

export default function ProModal() {
  const proModal = useProModal()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubscribe = async () => {
    try {
      setIsLoading(true)

      const { data } = await axios.get('/api/stripe')

      window.location.href = data.url
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 py-1 font-bold">
              Upgrade to AI Of Everything
              <Badge variant="premium" className="py-1 text-sm uppercase">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <div className="space-y-2 pt-2">
            {TOOLS.map((tool, index) => (
              <Card
                key={index}
                className="flex items-center justify-between border-primary/10 p-3"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn('w-fit rounded-md p-2', tool.bg)}>
                    <tool.icon className={cn('h-6 w-6', tool.color)} />
                  </div>
                  <div className="text-sm font-semibold">{tool.label}</div>
                </div>
                <CheckIcon className="h-5 w-5 text-cyan-400 dark:text-cyan-500" />
              </Card>
            ))}
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            size="lg"
            variant="premium"
            className="mx-2.5 w-full"
            onClick={onSubscribe}
            isLoading={isLoading}
          >
            {!isLoading && (
              <>
                Upgrade
                <ZapIcon className="ml-2 h-4 w-4 fill-white" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
