import {NextRequest, NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import {Pool} from 'pg'

const pool = new Pool({
  connectionString: process.env.NEON_DB_CONNECTION_STRING,
})

export async function POST(request: NextRequest) {
  try {
    const {email, password} = await request.json()

    if (!email || !password) {
      return NextResponse.json({error: 'Email and password are required'}, {status: 400})
    }

    const client = await pool.connect()

    try {
      const result = await client.query(
        `SELECT u.id, u.name, u.email, a.password
         FROM "user" u
         JOIN "account" a ON u.id = a."userId"
         WHERE u.email = $1 AND a."providerId" = 'email'`,
        [email]
      )

      if (result.rows.length === 0) {
        return NextResponse.json({error: 'Invalid email or password'}, {status: 401})
      }

      const user = result.rows[0]

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        return NextResponse.json({error: 'Invalid email or password'}, {status: 401})
      }

      const response = NextResponse.json(
        {
          message: 'Signed in successfully',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
        {status: 200}
      )

      response.cookies.set(
        'user-session',
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          signedIn: true,
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        }
      )

      return response
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Failed to sign in:', error)
    return NextResponse.json({error: 'Failed to sign in'}, {status: 500})
  }
}
