import {NextRequest, NextResponse} from 'next/server'
import {handleApiError} from '@/lib/api/errorHandler'
import {requireAuth} from '@/lib/api/requireAuth'
import {rejectComment} from '@/lib/db/comments'

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  try {
    const authResult = await requireAuth(request)
    if (authResult.response) return authResult.response

    const {id} = await params
    const deleted = await rejectComment(id)

    if (!deleted) {
      return NextResponse.json({error: 'Comment not found'}, {status: 404})
    }

    return NextResponse.json({message: 'Comment rejected successfully'})
  } catch (error) {
    return handleApiError(error, 'Error rejecting comment')
  }
}
