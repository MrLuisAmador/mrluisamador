import {NextRequest} from 'next/server'
import {handleApiError} from '@/lib/api/errorHandler'
import {requireAdmin} from '@/lib/api/requireAdmin'
import {getPendingComments} from '@/lib/db/comments'

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request)
    if (authResult.response) return authResult.response

    const comments = await getPendingComments()
    return Response.json(comments)
  } catch (error) {
    return handleApiError(error, 'Error fetching pending comments')
  }
}
