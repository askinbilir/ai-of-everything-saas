import { z } from 'zod'

export const ImageSchema = z.object({
  prompt: z.string().min(1, { message: 'Image prompt is required' }),
  amount: z.enum(['1', '2', '3', '4', '5']),
  resolution: z.enum(['256x256', '512x512', '1024x1024'])
})

export type ImageRequest = z.infer<typeof ImageSchema>
