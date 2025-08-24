import {NextRequest, NextResponse} from 'next/server'
import {Pool} from 'pg'

const pool = new Pool({
  connectionString: process.env.NEON_DB_CONNECTION_STRING,
})

export async function GET(request: NextRequest) {
  try {
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

      if (!user.id && !user.userId) {
        return NextResponse.json({error: 'Invalid user session'}, {status: 401})
      }

      if (!user.id && user.userId) {
        user.id = user.userId
      }
    } catch (error) {
      console.error('Error parsing user session:', error)
      return NextResponse.json({error: 'Invalid session'}, {status: 401})
    }

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
