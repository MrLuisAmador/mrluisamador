import {NextRequest, NextResponse} from 'next/server'
import {auth} from '@/lib/better-auth/auth'
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
    console.error('Error fetching comments:', error)
    return NextResponse.json({error: 'Failed to fetch comments'}, {status: 500})
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({headers: request.headers})

    if (!session) {
      return NextResponse.json({error: 'Authentication required'}, {status: 401})
    }

    const body: CreateCommentData = await request.json()

    if (!body.content || !body.blogSlug) {
      return NextResponse.json({error: 'Content and blog slug are required'}, {status: 400})
    }

    const comment = await createComment(body, session.user.id)
    return NextResponse.json(comment, {status: 201})
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json({error: 'Failed to create comment'}, {status: 500})
  }
}
