import { auth } from '@clerk/nextjs'

import { Config } from '@/constants/config'
import db from '@/lib/db'

export const increaseApiLimit = async () => {
  const { userId } = auth()

  if (!userId) return

  const userApiLimit = await db.userApiLimit.findUnique({
    where: { userId }
  })

  if (userApiLimit) {
    await db.userApiLimit.update({
      where: { userId },
      data: { count: userApiLimit.count + 1 }
    })
  } else {
    await db.userApiLimit.create({
      data: { userId: userId, count: 1 }
    })
  }
}

export const checkApiLimit = async () => {
  const { userId } = auth()

  if (!userId) return

  const userApiLimit = await db.userApiLimit.findUnique({
    where: { userId }
  })

  if (!userApiLimit || userApiLimit.count < Config.MAX_FREE_COUNTS) {
    return true
  } else {
    return false
  }
}

export const getApiLimitCount = async () => {
  const { userId } = auth()

  if (!userId) return

  const userApiLimit = await db.userApiLimit.findUnique({
    where: { userId }
  })

  if (!userApiLimit) return 0

  return userApiLimit.count
}
