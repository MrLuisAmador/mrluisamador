'use client'

import {useState, useEffect} from 'react'
import {Comment} from '@/lib/types/comment'
import CommentItem from './CommentItem'

interface CommentsListProps {
  blogSlug: string
  currentUserId?: string
  isPending?: boolean
}

export default function CommentsList({blogSlug, currentUserId, isPending}: CommentsListProps) {
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
    setComments((prev) => {
      // If it's a reply, find the parent comment and add it to its replies
      if (newComment.parentId) {
        return prev.map((comment) => {
          // Check if this is the direct parent
          if (comment.id === newComment.parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newComment],
            }
          }
          // Check if this comment has replies that contain the parent
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === newComment.parentId) {
                  return {
                    ...reply,
                    replies: [...(reply.replies || []), newComment],
                  }
                }
                return reply
              }),
            }
          }
          return comment
        })
      }
      // If it's a top-level comment, add it to the main array
      return [...prev, newComment]
    })
  }

  const handleCommentUpdated = (commentId: string, content: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? {...comment, content, updatedAt: new Date()} : comment
      )
    )
  }

  const handleCommentDeleted = (commentId: string) => {
    setComments((prev) => {
      // Helper function to recursively remove nested replies
      const removeNestedReply = (comments: Comment[], targetId: string): Comment[] => {
        return comments.map((comment) => {
          if (comment.replies && comment.replies.length > 0) {
            // First, filter out the target comment from this level's replies
            const filteredReplies = comment.replies.filter((reply) => reply.id !== targetId)

            // Then recursively search deeper levels
            const processedReplies = removeNestedReply(filteredReplies, targetId)

            return {
              ...comment,
              replies: processedReplies,
            }
          }
          return comment
        })
      }

      // First, try to find and remove the comment from the main array
      const filteredComments = prev.filter((comment) => comment.id !== commentId)

      // If the comment wasn't found in the main array, it might be a nested reply
      if (filteredComments.length === prev.length) {
        return removeNestedReply(prev, commentId)
      }

      return filteredComments
    })
  }

  if (isLoading) {
    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error loading comments: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div
      className={`mt-8 space-y-6 transition-opacity duration-200 ${isPending ? 'opacity-50' : 'opacity-100'}`}
    >
      <p className="text-sm text-gray-600">({comments.length} comments)</p>
      {comments.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
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
