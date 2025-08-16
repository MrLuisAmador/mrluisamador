'use client'

import {useState} from 'react'
import {Comment, CommentFormData} from '@/lib/types/comment'

interface CommentFormProps {
  blogSlug: string
  parentId?: string
  onCommentAdded: (comment: Comment) => void
  onCancel?: () => void
  isReply?: boolean
}

export default function CommentForm({
  blogSlug,
  parentId,
  onCommentAdded,
  onCancel,
  isReply = false,
}: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      setError('Comment cannot be empty')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const commentData: CommentFormData = {
        content: content.trim(),
        parentId,
      }

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...commentData,
          blogSlug,
        }),
        credentials: 'include', // Include cookies for authentication
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to post comment')
      }

      const newComment = await response.json()
      onCommentAdded(newComment)
      setContent('')

      if (onCancel) {
        onCancel()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={isReply ? 'Write your reply...' : 'Share your thoughts...'}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Posting...' : isReply ? 'Reply' : 'Post Comment'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
