import {Pool} from 'pg'
import {env} from '@/lib/env'

export const pool = new Pool({
  connectionString: env.NEON_DB_CONNECTION_STRING,
  max: 10,
  min: 2,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000,
})
