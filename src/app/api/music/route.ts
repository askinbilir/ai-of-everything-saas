import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { StatusCodes } from 'http-status-codes'
import Replicate from 'replicate'

import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import { PromptSchema } from '@/validators/prompt'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', {
        status: StatusCodes.UNAUTHORIZED
      })
    }

    if (!replicate.auth) {
      return new NextResponse('Replicate API Key not configured', {
        status: StatusCodes.INTERNAL_SERVER_ERROR
      })
    }

    const body = await req.json()
    const { prompt } = PromptSchema.parse(body)

    if (!prompt) {
      return new NextResponse('Prompt is required', {
        status: StatusCodes.BAD_REQUEST
      })
    }

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) {
      return new NextResponse('Free trial has expired.', {
        status: StatusCodes.PAYMENT_REQUIRED
      })
    }

    const response = await replicate.run(
      'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
      {
        input: {
          prompt_a: prompt
        }
      }
    )

    if (!isPro) await increaseApiLimit()

    return NextResponse.json(response, { status: StatusCodes.CREATED })
  } catch (error) {
    console.log('[MUSIC_ERROR]', error)
    return new NextResponse('Internal error', {
      status: StatusCodes.INTERNAL_SERVER_ERROR
    })
  }
}
