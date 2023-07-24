'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { CodeIcon } from 'lucide-react'
import type { ChatCompletionRequestMessage } from 'openai'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

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
        title="Code Generation"
        description="Generate code using descriptive text."
        icon={CodeIcon}
        iconColor="text-fuchsia-400 dark:text-fuchsia-600"
        bgColor="bg-fuchsia-400/10 dark:bg-fuchsia-600/10"
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
                        placeholder="Build a calculator using python."
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
              <Empty label="No conversation started." />
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
                    : 'bg-secondary/50'
                )}
              >
                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown
                  className="overflow-hidden text-sm leading-7"
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="my-2 w-full overflow-auto rounded-lg bg-primary/5 p-2">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code
                        className="rounded-lg bg-primary/5 p-1"
                        {...props}
                      />
                    )
                  }}
                >
                  {message.content || ''}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
