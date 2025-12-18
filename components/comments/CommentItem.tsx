'use client'

import {useState} from 'react'
import Image from 'next/image'
import {Comment} from '@/lib/types/comment'
import CommentForm from './CommentForm'
import {toast} from 'sonner'

interface EditCommentFormProps {
  comment: Comment
  onCommentUpdated: (commentId: string, content: string) => void
  onCancel: () => void
}

function EditCommentForm({comment, onCommentUpdated, onCancel}: EditCommentFormProps) {
  const [content, setContent] = useState(comment.content)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      setError('Comment cannot be empty')
      return
    }

    if (content.trim() === comment.content) {
      // No changes made, just cancel
      onCancel()
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
        }),
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update comment')
      }

      onCommentUpdated(comment.id, content.trim())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update comment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Edit your comment..."
        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        rows={4}
        disabled={isSubmitting}
      />

      <div className="mt-3 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Updating...' : 'Update Comment'}
        </button>
      </div>
    </form>
  )
}

interface CommentItemProps {
  comment: Comment
  currentUserId?: string
  onCommentUpdated: (commentId: string, content: string) => void
  onCommentDeleted: (commentId: string) => void
  onCommentAdded: (newComment: Comment) => void
}

export default function CommentItem({
  comment,
  currentUserId,
  onCommentUpdated,
  onCommentDeleted,
  onCommentAdded,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isOwner = currentUserId === comment.userId
  const canEdit = isOwner
  const canDelete = isOwner

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to delete comment')
      }

      toast.success('Comment deleted successfully')
      onCommentDeleted(comment.id)
    } catch (error) {
      console.error('Error deleting comment:', error)
      toast.error('Failed to delete comment')
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  return (
    <div className="border-l-4 border-gray-200 pl-4">
      <div className="rounded-lg bg-white p-4 shadow-xs">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {comment.user?.image && (
              <Image
                src={comment.user.image}
                alt={comment.user.name || 'User avatar'}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
            )}
            <div>
              <p className="font-medium text-gray-900">{comment.user?.name || 'Anonymous'}</p>
              <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
            </div>
          </div>

          {(canEdit || canDelete) && (
            <div className="flex space-x-2">
              {canEdit && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              )}
              {canDelete && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-sm text-red-600 underline hover:text-red-800 disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <EditCommentForm
            comment={comment}
            onCommentUpdated={(commentId, content) => {
              onCommentUpdated(commentId, content)
              setIsEditing(false)
            }}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="mb-3">
            <p className="whitespace-pre-wrap text-gray-800">{comment.content}</p>
            {comment.updatedAt > comment.createdAt && (
              <p className="mt-1 text-xs text-gray-500">(edited)</p>
            )}
          </div>
        )}

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="text-sm text-gray-600 underline hover:text-gray-800"
          >
            {isReplying ? 'Cancel Reply' : 'Reply'}
          </button>
        </div>

        {isReplying && (
          <div className="mt-4 ml-4">
            <CommentForm
              blogSlug={comment.blogSlug}
              parentId={comment.id}
              onCommentAdded={(newReply) => {
                onCommentAdded(newReply)
                setIsReplying(false)
              }}
              onCancel={() => setIsReplying(false)}
              isReply={true}
            />
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                currentUserId={currentUserId}
                onCommentUpdated={onCommentUpdated}
                onCommentDeleted={onCommentDeleted}
                onCommentAdded={onCommentAdded}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
