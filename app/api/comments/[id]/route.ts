import {NextRequest, NextResponse} from 'next/server'
import {handleApiError} from '@/lib/api/errorHandler'
import {requireAuth} from '@/lib/api/requireAuth'
import {deleteComment, updateComment} from '@/lib/db/comments'
import {UpdateCommentData} from '@/lib/types/comment'

export async function PUT(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  try {
    const authResult = await requireAuth(request)
    if (authResult.response) return authResult.response
    const {session} = authResult

    const body = (await request.json()) as UpdateCommentData

    if (!body.content) {
      return NextResponse.json({error: 'Content is required'}, {status: 400})
    }

    const {id} = await params
    const comment = await updateComment(id, body, session.user.id)

    if (!comment) {
      return NextResponse.json({error: 'Comment not found or unauthorized'}, {status: 404})
    }

    return NextResponse.json(comment)
  } catch (error) {
    return handleApiError(error, 'Error updating comment')
  }
}

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  try {
    const authResult = await requireAuth(request)
    if (authResult.response) return authResult.response
    const {session} = authResult

    const {id} = await params
    const success = await deleteComment(id, session.user.id)

    if (!success) {
      return NextResponse.json({error: 'Comment not found or unauthorized'}, {status: 404})
    }

    return NextResponse.json({message: 'Comment deleted successfully'})
  } catch (error) {
    return handleApiError(error, 'Error deleting comment')
  }
}
