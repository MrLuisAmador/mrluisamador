import {NextRequest, NextResponse} from 'next/server'
import {auth} from '@/lib/auth'
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

    const body: CreateCommentData = await request.json()

    if (!body.content || !body.blogSlug) {
      return NextResponse.json({error: 'Content and blog slug are required'}, {status: 400})
    }

    const comment = await createComment(body, user.id)
    return NextResponse.json(comment, {status: 201})
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json({error: 'Failed to create comment'}, {status: 500})
  }
}
