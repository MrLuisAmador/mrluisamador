import {NextRequest, NextResponse} from 'next/server'
import {auth} from '@/lib/auth'
import {updateComment, deleteComment} from '@/lib/db/comments'
import {UpdateCommentData} from '@/lib/types/comment'

export async function PUT(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
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

    const body: UpdateCommentData = await request.json()

    if (!body.content) {
      return NextResponse.json({error: 'Content is required'}, {status: 400})
    }

    const {id} = await params
    const comment = await updateComment(id, body, user.id)

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
      return NextResponse.json({error: 'Invalid session'}, {status: 400})
    }

    const {id} = await params

    const success = await deleteComment(id, user.id)

    if (!success) {
      return NextResponse.json({error: 'Comment not found or unauthorized'}, {status: 404})
    }

    return NextResponse.json({message: 'Comment deleted successfully'})
  } catch (error) {
    console.error('Error deleting comment:', error)
    return NextResponse.json({error: 'Failed to delete comment'}, {status: 500})
  }
}
