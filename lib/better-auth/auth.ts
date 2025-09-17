import {betterAuth} from 'better-auth'
import {Pool} from 'pg'

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.NEON_DB_CONNECTION_STRING,
    max: 10,
    min: 2,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000,
  }),
  secret: process.env.AUTH_SECRET || '',
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  advanced: {
    generateId: () => crypto.randomUUID(),
    crossSubDomainCookies: {
      enabled: false,
    },
  },
})
