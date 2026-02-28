import {NextRequest} from 'next/server'
import {handleApiError} from '@/lib/api/errorHandler'
import {requireAuth} from '@/lib/api/requireAuth'
import {getPendingComments} from '@/lib/db/comments'

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult.response) return authResult.response

    const comments = await getPendingComments()
    return Response.json(comments)
  } catch (error) {
    return handleApiError(error, 'Error fetching pending comments')
  }
}
