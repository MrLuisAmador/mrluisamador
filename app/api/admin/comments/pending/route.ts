import {NextRequest, NextResponse} from 'next/server'
import {auth} from '@/lib/auth'
import {Pool} from 'pg'

const pool = new Pool({
  connectionString: process.env.NEON_DB_CONNECTION_STRING,
})

export async function GET(request: NextRequest) {
  try {
    // Get user session from our custom cookie
    const userSession = request.cookies.get('user-session')?.value

    if (!userSession) {
      return NextResponse.json({error: 'Authentication required'}, {status: 401})
    }

    let user
    try {
      user = JSON.parse(userSession)
      if (!user.signedIn) {
        return NextResponse.json({error: 'Authentication required'}, {status: 401})
      }

      // Ensure we have a valid user ID - check multiple possible field names
      if (!user.id && !user.userId) {
        return NextResponse.json({error: 'Invalid user session'}, {status: 401})
      }

      // Normalize the user ID field
      if (!user.id && user.userId) {
        user.id = user.userId
      }
    } catch (parseError) {
      return NextResponse.json({error: 'Invalid session'}, {status: 401})
    }

    // For now, allow any authenticated user to access admin
    // In production, you'd want to check for admin role
    const client = await pool.connect()

    try {
      const result = await client.query(
        `SELECT c.*, u.name, u.email
         FROM "comment" c
         JOIN "user" u ON c."userId" = u.id
         WHERE c."isApproved" = false
         ORDER BY c."createdAt" ASC`
      )

      return NextResponse.json(result.rows)
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error fetching pending comments:', error)
    return NextResponse.json({error: 'Failed to fetch pending comments'}, {status: 500})
  }
}
