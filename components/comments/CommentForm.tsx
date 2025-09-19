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
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={isReply ? 'Write your reply...' : 'Share your thoughts...'}
          className="w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-transparent"
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : isReply ? 'Reply' : 'Post Comment'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
