import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.NEON_DB_CONNECTION_STRING,
})

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    const client = await pool.connect()

    try {
      // Check if user already exists
      const existingUser = await client.query(
        'SELECT id FROM "user" WHERE email = $1',
        [email]
      )

      if (existingUser.rows.length > 0) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        )
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Create user
      const result = await client.query(
        `INSERT INTO "user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, name, email, "createdAt"`,
        [
          crypto.randomUUID(),
          name,
          email,
          false, // Email not verified initially
          new Date(),
          new Date(),
        ]
      )

      // Create account record
      await client.query(
        `INSERT INTO "account" (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          crypto.randomUUID(),
          email,
          'email',
          result.rows[0].id,
          hashedPassword,
          new Date(),
          new Date(),
        ]
      )

      return NextResponse.json(
        { 
          message: 'User created successfully',
          user: {
            id: result.rows[0].id,
            name: result.rows[0].name,
            email: result.rows[0].email,
          }
        },
        { status: 201 }
      )
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
