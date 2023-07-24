import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

const CRISP_WEBSITE_ID = ''

export default function CrispChat() {
  useEffect(() => {
    Crisp.configure(CRISP_WEBSITE_ID)
  }, [])

  return null
}
