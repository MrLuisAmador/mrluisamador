import {NextRequest, NextResponse} from 'next/server'
import {auth} from '@/lib/auth'
import {Pool} from 'pg'

const pool = new Pool({
  connectionString: process.env.NEON_DB_CONNECTION_STRING,
})

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
  try {
    const session = await auth.api.getSession({headers: request.headers})

    if (!session) {
      return NextResponse.json({error: 'Authentication required'}, {status: 401})
    }

    const client = await pool.connect()

    try {
      const result = await client.query(`DELETE FROM "comment" WHERE id = $1`, [params.id])

      if (result.rowCount === 0) {
        return NextResponse.json({error: 'Comment not found'}, {status: 404})
      }

      return NextResponse.json({message: 'Comment rejected successfully'})
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error rejecting comment:', error)
    return NextResponse.json({error: 'Failed to reject comment'}, {status: 500})
  }
}
