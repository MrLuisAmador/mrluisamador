'use client'

import {useState} from 'react'
import {Comment} from '@/lib/types/comment'
import CommentForm from './CommentForm'

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
    if (!confirm('Are you sure you want to delete this comment?')) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to delete comment')
      }

      onCommentDeleted(comment.id)
    } catch (error) {
      console.error('Error deleting comment:', error)
      alert('Failed to delete comment')
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
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {comment.user?.image && (
              <img
                src={comment.user.image}
                alt={comment.user.name}
                className="w-8 h-8 rounded-full"
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
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              )}
              {canDelete && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-sm text-red-600 hover:text-red-800 underline disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <CommentForm
            blogSlug={comment.blogSlug}
            onCommentAdded={() => {}}
            onCancel={() => setIsEditing(false)}
            isReply={false}
          />
        ) : (
          <div className="mb-3">
            <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
            {comment.updatedAt > comment.createdAt && (
              <p className="text-xs text-gray-500 mt-1">(edited)</p>
            )}
          </div>
        )}

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
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
