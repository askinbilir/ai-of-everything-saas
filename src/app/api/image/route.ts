import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { StatusCodes } from 'http-status-codes'
import { Configuration, OpenAIApi } from 'openai'
import { z } from 'zod'

import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import { ImageSchema } from '@/validators/image'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', {
        status: StatusCodes.UNAUTHORIZED
      })
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API Key not configured', {
        status: StatusCodes.INTERNAL_SERVER_ERROR
      })
    }

    const body = await req.json()
    const { prompt, amount, resolution } = ImageSchema.parse(body)

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) {
      return new NextResponse('Free trial has expired.', {
        status: StatusCodes.PAYMENT_REQUIRED
      })
    }

    const { data } = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
      response_format: 'b64_json'
    })

    if (!isPro) await increaseApiLimit()

    return NextResponse.json(data.data, { status: StatusCodes.CREATED })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, {
        status: StatusCodes.UNPROCESSABLE_ENTITY
      })
    }
    return new NextResponse('Internal error', {
      status: StatusCodes.INTERNAL_SERVER_ERROR
    })
  }
}
