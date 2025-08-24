import {NextRequest, NextResponse} from 'next/server'
import {auth} from '@/lib/auth'
import {approveComment} from '@/lib/db/comments'

export async function POST(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  try {
    const session = await auth.api.getSession({headers: request.headers})

    if (!session) {
      return NextResponse.json({error: 'Authentication required'}, {status: 401})
    }

    const {id} = await params
    const comment = await approveComment(id)

    if (!comment) {
      return NextResponse.json({error: 'Comment not found'}, {status: 404})
    }

    return NextResponse.json(comment)
  } catch (error) {
    console.error('Error approving comment:', error)
    return NextResponse.json({error: 'Failed to approve comment'}, {status: 500})
  }
}
