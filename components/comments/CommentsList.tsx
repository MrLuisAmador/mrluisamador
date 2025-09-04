'use client'

import {useState, useEffect} from 'react'
import {Comment} from '@/lib/types/comment'
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
    setComments((prev) => {
      // If it's a reply, find the parent comment and add it to its replies
      if (newComment.parentId) {
        // Recursive function to find and update the parent comment
        const addReplyToComment = (comments: Comment[]): Comment[] => {
          return comments.map((comment) => {
            // Check if this is the direct parent
            if (comment.id === newComment.parentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newComment],
              }
            }
            // Recursively check nested replies
            if (comment.replies && comment.replies.length > 0) {
              return {
                ...comment,
                replies: addReplyToComment(comment.replies),
              }
            }
            return comment
          })
        }

        return addReplyToComment(prev)
      }
      // If it's a top-level comment, add it to the main array
      return [...prev, newComment]
    })
  }

  const handleCommentUpdated = (commentId: string, content: string) => {
    setComments((prev) => {
      // Recursive function to find and update the comment at any nesting level
      const updateCommentRecursively = (comments: Comment[]): Comment[] => {
        return comments.map((comment) => {
          // Check if this is the comment to update
          if (comment.id === commentId) {
            return {
              ...comment,
              content,
              updatedAt: new Date(),
            }
          }
          // Recursively check nested replies
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateCommentRecursively(comment.replies),
            }
          }
          return comment
        })
      }

      return updateCommentRecursively(prev)
    })
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
