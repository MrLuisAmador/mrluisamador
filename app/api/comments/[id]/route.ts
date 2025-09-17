import {NextRequest, NextResponse} from 'next/server'
import {auth} from '@/lib/better-auth/auth'
import {updateComment, deleteComment} from '@/lib/db/comments'
import {UpdateCommentData} from '@/lib/types/comment'

export async function PUT(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  try {
    const session = await auth.api.getSession({headers: request.headers})

    if (!session) {
      return NextResponse.json({error: 'Authentication required'}, {status: 401})
    }

    const body: UpdateCommentData = await request.json()

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
    console.error('Error updating comment:', error)
    return NextResponse.json({error: 'Failed to update comment'}, {status: 500})
  }
}

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  try {
    const session = await auth.api.getSession({headers: request.headers})

    if (!session) {
      return NextResponse.json({error: 'Authentication required'}, {status: 401})
    }

    const {id} = await params

    const success = await deleteComment(id, session.user.id)

    if (!success) {
      return NextResponse.json({error: 'Comment not found or unauthorized'}, {status: 404})
    }

    return NextResponse.json({message: 'Comment deleted successfully'})
  } catch (error) {
    console.error('Error deleting comment:', error)
    return NextResponse.json({error: 'Failed to delete comment'}, {status: 500})
  }
}
