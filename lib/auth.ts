import {betterAuth} from 'better-auth'
import {Pool} from 'pg'

// Initialize the auth module with a PostgreSQL pool
export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.NEON_DB_CONNECTION_STRING,
  }),
  emailAndPassword: {
    enabled: true,
  },
})
