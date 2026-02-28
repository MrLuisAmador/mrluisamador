import {NextRequest, NextResponse} from 'next/server'
import {handleApiError} from '@/lib/api/errorHandler'
import {requireAuth} from '@/lib/api/requireAuth'
import {approveComment} from '@/lib/db/comments'

export async function POST(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  try {
    const authResult = await requireAuth(request)
    if (authResult.response) return authResult.response

    const {id} = await params
    const comment = await approveComment(id)

    if (!comment) {
      return NextResponse.json({error: 'Comment not found'}, {status: 404})
    }

    return NextResponse.json(comment)
  } catch (error) {
    return handleApiError(error, 'Error approving comment')
  }
}
