'use client'

import {useState, useEffect} from 'react'
import {Comment} from '@/lib/types/comment'
import {addReplyToTree, removeCommentFromTree, updateCommentInTree} from '@/lib/comments/treeUtils'
import CommentItem from './CommentItem'

interface CommentsListProps {
  blogSlug: string
  currentUserId?: string
}

export default function CommentsList({blogSlug, currentUserId}: CommentsListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/comments?blogSlug=${encodeURIComponent(blogSlug)}`)

        if (!response.ok) {
          throw new Error('Failed to fetch comments')
        }

        const data = await response.json()
        setComments(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch comments')
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [blogSlug])

  const handleCommentAdded = (newComment: Comment) => {
    setComments((prev) => addReplyToTree(prev, newComment))
  }

  const handleCommentUpdated = (commentId: string, content: string) => {
    setComments((prev) => updateCommentInTree(prev, commentId, content))
  }

  const handleCommentDeleted = (commentId: string) => {
    setComments((prev) => removeCommentFromTree(prev, commentId))
  }

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
        <p className="text-red-600">Error loading comments: {error}</p>
        <button
          onClick={() => window.location.reload()}
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
            onCommentUpdated={handleCommentUpdated}
            onCommentDeleted={handleCommentDeleted}
            onCommentAdded={handleCommentAdded}
          />
        ))
      )}
    </div>
  )
}
