import {betterAuth} from 'better-auth'
import {Pool} from 'pg'

// Initialize the auth module with a PostgreSQL pool
export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.NEON_DB_CONNECTION_STRING,
    // Add connection pool optimizations
    max: 10, // Reduce max connections
    min: 2, // Add minimum connections
    idleTimeoutMillis: 10000, // Reduce idle timeout
    connectionTimeoutMillis: 5000, // Increase connection timeout
    // Add SSL configuration for Neon
    ssl: {
      rejectUnauthorized: false,
    },
  }),
  secret: process.env.AUTH_SECRET || 'fallback-secret-for-development',
  emailAndPassword: {
    enabled: true,
  },
  // Add session optimizations
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  // Add advanced optimizations
  advanced: {
    generateId: () => crypto.randomUUID(),
    crossSubDomainCookies: {
      enabled: false,
    },
  },
})
