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
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          prompt
        }
      }
    )

    if (!isPro) await increaseApiLimit()

    return NextResponse.json(response, { status: StatusCodes.CREATED })
  } catch (error) {
    console.log('[VIDEO_ERROR]', error)
    return new NextResponse('Internal error', {
      status: StatusCodes.INTERNAL_SERVER_ERROR
    })
  }
}
