'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { saveAs } from 'file-saver'
import { StatusCodes } from 'http-status-codes'
import { DownloadIcon, ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { AMOUNT_OPTIONS, RESOLUTION_OPTIONS } from '@/constants/options'
import { ImageRequest, ImageSchema } from '@/validators/image'
import { useProModal } from '@/hooks/use-pro-modal'
import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import Empty from '@/components/empty'
import Heading from '@/components/heading'

export default function Page() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const proModal = useProModal()

  const form = useForm<ImageRequest>({
    resolver: zodResolver(ImageSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512'
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (payload: ImageRequest) => {
    try {
      setImages([])
      const { data } = await axios.post('/api/image', payload)

      const urls = data.map(
        (image: { b64_json: string }) =>
          'data:image/png;base64,' + image.b64_json
      )

      setImages(urls)
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
        title="Image Generation"
        description="Turn your prompt into an image"
        icon={ImageIcon}
        iconColor="text-pink-400 dark:text-pink-600"
        bgColor="bg-pink-400/10 dark:bg-pink-600/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isSubmitting}
                        placeholder="How world actually looks like?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {AMOUNT_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RESOLUTION_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
          {isSubmitting}
          {images.length === 0 && !isSubmitting && (
            <div>
              <Empty label="No images generated." imageUrl="empty-image.svg" />
            </div>
          )}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isSubmitting &&
              Array.from(
                Array(parseInt(form.getValues('amount'))),
                (_, i) => i + 1
              ).map(i => <Skeleton key={i} className="aspect-square" />)}
            {images.map((src, index) => (
              <Card key={index} className="overflow-hidden rounded-lg">
                <div className="relative aspect-square">
                  <Image alt="image" fill src={src} />
                </div>
                <CardFooter className="p-2">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() =>
                      saveAs(src, `aioe-${new Date().getTime()}.png`)
                    }
                  >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
