'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { VideoIcon } from 'lucide-react'
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
  const [video, setVideo] = useState<string>()
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
      setVideo(undefined)

      const { data } = await axios.post('/api/video', payload)

      setVideo(data[0])
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
        title="Video Generation"
        description="Turn your prompt into video."
        icon={VideoIcon}
        iconColor="text-orange-400 dark:text-orange-600"
        bgColor="bg-orange-400/10 dark:bg-orange-600/10"
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
                        placeholder="Clown fish swimming around a coral reef."
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
          {isSubmitting && (
            <Skeleton className="mt-8 aspect-video max-h-80 rounded-lg" />
          )}
          {isSubmitting}
          {!video && !isSubmitting && (
            <div>
              <Empty label="No video generated." imageUrl="empty-video.svg" />
            </div>
          )}
          <div>
            {video && (
              <video
                controls
                className="mt-8 aspect-video max-h-80 rounded-lg border"
              >
                <source src={video} />
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
