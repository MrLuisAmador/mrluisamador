import {betterAuth} from 'better-auth'
import {pool} from '@/lib/db/pool'
import {env} from '@/lib/env'

const SESSION_EXPIRY_SECONDS = 60 * 60 * 24 * 7 // 7 days
const SESSION_UPDATE_AGE_SECONDS = 60 * 60 * 24 // 1 day
const COOKIE_CACHE_MAX_AGE_SECONDS = 60 * 5 // 5 minutes

export const auth = betterAuth({
  database: pool,
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: SESSION_EXPIRY_SECONDS,
    updateAge: SESSION_UPDATE_AGE_SECONDS,
    cookieCache: {
      enabled: true,
      maxAge: COOKIE_CACHE_MAX_AGE_SECONDS,
    },
  },
  advanced: {
    generateId: () => crypto.randomUUID(),
    crossSubDomainCookies: {
      enabled: false,
    },
  },
})
