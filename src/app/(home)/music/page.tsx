'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { MusicIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { PromptRequest, PromptSchema } from '@/validators/prompt'
import { useProModal } from '@/hooks/use-pro-modal'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import Empty from '@/components/empty'
import Heading from '@/components/heading'

export default function Page() {
  const router = useRouter()
  const [music, setMusic] = useState<string>()
  const proModal = useProModal()

  const form = useForm<PromptRequest>({
    resolver: zodResolver(PromptSchema),
    defaultValues: {
      prompt: ''
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (payload: PromptRequest) => {
    try {
      setMusic(undefined)

      const { data } = await axios.post('/api/music', payload)

      setMusic(data.audio)
    } catch (error: any) {
      if (error?.response?.status === StatusCodes.PAYMENT_REQUIRED) {
        proModal.onOpen()
      } else {
        toast.error('Something went wrong')
      }
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompt into music."
        icon={MusicIcon}
        iconColor="text-emerald-400 dark:text-emerald-600"
        bgColor="bg-emerald-400/10 dark:bg-emerald-600/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isSubmitting}
                        placeholder="Piano solo."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 w-full lg:col-span-2"
                isLoading={isSubmitting}
                disabled={!form.getValues('prompt')}
              >
                {isSubmitting ? 'Generating...' : 'Generate'}
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4">
          {isSubmitting && <Skeleton className="h-20" />}
          {isSubmitting}
          {!music && !isSubmitting && (
            <div>
              <Empty label="No music generated." imageUrl="empty-music.svg" />
            </div>
          )}
          <div>
            {music && (
              <audio controls className="mt-8 w-full">
                <source src={music} />
              </audio>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
