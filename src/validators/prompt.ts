import { z } from 'zod'

export const PromptSchema = z.object({
  prompt: z.string().min(1, { message: 'Prompt is required' })
})

export type PromptRequest = z.infer<typeof PromptSchema>
