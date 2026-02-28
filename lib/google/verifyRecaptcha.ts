import {env} from '@/lib/env'

const RECAPTCHA_SCORE_THRESHOLD = 0.5

interface RecaptchaResponse {
  success: boolean
  score?: number
}

export async function verifyRecaptcha(token: string): Promise<boolean> {
  const {RECAPTCHA_SECRET_KEY} = env.recaptcha

  const body = new URLSearchParams({
    secret: RECAPTCHA_SECRET_KEY,
    response: token,
  })

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: body.toString(),
  })

  if (!response.ok) {
    throw new Error(`reCAPTCHA verification failed: ${response.status}`)
  }

  const data = (await response.json()) as RecaptchaResponse
  return Boolean(data.success && (data.score ?? 0) >= RECAPTCHA_SCORE_THRESHOLD)
}
