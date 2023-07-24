'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { MessageSquareIcon } from 'lucide-react'
import type { ChatCompletionRequestMessage } from 'openai'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { cn } from '@/lib/utils'
import { PromptRequest, PromptSchema } from '@/validators/prompt'
import { useProModal } from '@/hooks/use-pro-modal'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import BotAvatar from '@/components/bot-avatar'
import Empty from '@/components/empty'
import Heading from '@/components/heading'
import UserAvatar from '@/components/user-avatar'

export default function Page() {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
  const proModal = useProModal()

  const form = useForm<PromptRequest>({
    resolver: zodResolver(PromptSchema),
    defaultValues: {
      prompt: ''
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async ({ prompt }: PromptRequest) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: prompt
      }
      const newMessages = [...messages, userMessage]

      setMessages(current => [...current, userMessage])

      const { data } = await axios.post('/api/conversation', {
        messages: newMessages
      })

      setMessages(current => [...current, data])

      form.reset()
    } catch (error: any) {
      setMessages(current => [...current.slice(0, -1)])
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
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquareIcon}
        iconColor="text-violet-400 dark:text-violet-600"
        bgColor="bg-violet-400/10 dark:bg-violet-600/10"
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
                        placeholder="How do I calculate the radius of a circle?"
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
          {isSubmitting && <Skeleton className="h-40" />}
          {isSubmitting}
          {messages.length === 0 && !isSubmitting && (
            <div>
              <Empty
                label="No conversation started."
                imageUrl="empty-chat.svg"
              />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex w-full items-start gap-x-8 rounded-lg p-8',
                  message.role === 'user'
                    ? 'border border-primary/10 bg-secondary/20'
                    : 'bg-secondary'
                )}
              >
                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
