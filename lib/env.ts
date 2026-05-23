import {z} from 'zod'

const requiredEnvSchema = z.object({
  NEON_DB_CONNECTION_STRING: z.string().min(1, 'NEON_DB_CONNECTION_STRING is required'),
  BETTER_AUTH_SECRET: z.string().min(1, 'BETTER_AUTH_SECRET is required'),
})

const smtpEnvSchema = z.object({
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive(),
  EMAIL_USER: z.string().min(1),
  EMAIL_PASSWORD: z.string().min(1),
  SMTP_FROM: z.string().email().optional(),
})

const recaptchaEnvSchema = z.object({
  RECAPTCHA_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
})

const adminEnvSchema = z.object({
  ADMIN_EMAILS: z.string().optional(),
})

export type RequiredEnv = z.infer<typeof requiredEnvSchema>
type SmtpEnv = z.infer<typeof smtpEnvSchema>
type RecaptchaEnv = z.infer<typeof recaptchaEnvSchema>
type AdminEnv = {
  emails: string[]
}

function formatZodMessages(issues: Array<{path: unknown[]; message: string}>): string {
  return issues
    .map((issue) => {
      const pathStr = issue.path.filter((p): p is string => typeof p === 'string').join('.')
      return pathStr ? `${pathStr}: ${issue.message}` : issue.message
    })
    .join('\n')
}

function parseRequiredEnv(): RequiredEnv {
  const result = requiredEnvSchema.safeParse(process.env)
  if (!result.success) {
    throw new Error(`Invalid environment variables:\n${formatZodMessages(result.error.issues)}`)
  }
  return result.data
}

export const env = {
  ...parseRequiredEnv(),
  get smtp(): SmtpEnv {
    const result = smtpEnvSchema.safeParse(process.env)
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message).join(', ')
      throw new Error(`Invalid SMTP config: ${messages}`)
    }
    return result.data
  },
  get recaptcha(): RecaptchaEnv {
    const result = recaptchaEnvSchema.safeParse(process.env)
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message).join(', ')
      throw new Error(`Invalid reCAPTCHA config: ${messages}`)
    }
    return result.data
  },
  get gtmId(): string | undefined {
    return process.env.NEXT_PUBLIC_GTM_ID
  },
  get admin(): AdminEnv {
    const result = adminEnvSchema.safeParse(process.env)
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message).join(', ')
      throw new Error(`Invalid admin config: ${messages}`)
    }

    return {
      emails: (result.data.ADMIN_EMAILS ?? '')
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean),
    }
  },
}
