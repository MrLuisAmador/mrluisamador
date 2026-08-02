'use client'

import {useQuery} from '@tanstack/react-query'
import {Comment} from '@/lib/types/comment'
import CommentItem from './CommentItem'

interface CommentsListProps {
  blogSlug: string
  currentUserId?: string
}

async function fetchComments(blogSlug: string): Promise<Comment[]> {
  const response = await fetch(`/api/comments?blogSlug=${encodeURIComponent(blogSlug)}`)
  if (!response.ok) {
    throw new Error('Failed to fetch comments')
  }
  return response.json()
}

export default function CommentsList({blogSlug, currentUserId}: CommentsListProps) {
  const {
    data: comments = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['comments', blogSlug],
    queryFn: () => fetchComments(blogSlug),
  })

  if (isLoading) {
    return (
      <div className="mt-8 rounded-lg bg-gray-50 p-4">
        <div className="animate-pulse">
          <div className="mb-4 h-4 w-1/4 rounded bg-gray-200"></div>
          <div className="space-y-3">
            <div className="h-4 rounded bg-gray-200"></div>
            <div className="h-4 w-5/6 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-red-600">
          Error loading comments: {error instanceof Error ? error.message : 'Failed to fetch comments'}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-2 text-sm text-red-600 underline hover:text-red-800"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-6">
      <p className="text-sm text-gray-600">({comments.length} comments)</p>
      {comments.length === 0 ? (
        <p className="py-8 text-center text-gray-500">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUserId={currentUserId}
          />
        ))
      )}
    </div>
  )
}

