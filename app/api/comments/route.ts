import {NextRequest, NextResponse} from 'next/server'
import {handleApiError} from '@/lib/api/errorHandler'
import {requireAuth} from '@/lib/api/requireAuth'
import {createComment, getCommentsByBlogSlug} from '@/lib/db/comments'
import {CreateCommentData} from '@/lib/types/comment'

export async function GET(request: NextRequest) {
  try {
    const {searchParams} = new URL(request.url)
    const blogSlug = searchParams.get('blogSlug')

    if (!blogSlug) {
      return NextResponse.json({error: 'Blog slug is required'}, {status: 400})
    }

    const comments = await getCommentsByBlogSlug(blogSlug)
    return NextResponse.json(comments)
  } catch (error) {
    return handleApiError(error, 'Error fetching comments')
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request)
    if (authResult.response) return authResult.response
    const {session} = authResult

    const body = (await request.json()) as CreateCommentData

    if (!body.content || !body.blogSlug) {
      return NextResponse.json({error: 'Content and blog slug are required'}, {status: 400})
    }

    const comment = await createComment(body, session.user.id)
    return NextResponse.json(comment, {status: 201})
  } catch (error) {
    return handleApiError(error, 'Error creating comment')
  }
}
