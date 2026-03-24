import {NextRequest, NextResponse} from 'next/server'
import {handleApiError} from '@/lib/api/errorHandler'
import {requireAdmin} from '@/lib/api/requireAdmin'
import {approveComment} from '@/lib/db/comments'

export async function POST(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
  try {
    const authResult = await requireAdmin(request)
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
