'use client'

import {useState} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {Comment, CommentFormData} from '@/lib/types/comment'
import {useAuth} from '@/lib/hooks/useAuth'
import {addReplyToTree} from '@/lib/comments/treeUtils'
import {commentKeys} from '@/lib/comments/queryKeys'
import {toast} from 'sonner'

interface CommentFormProps {
  blogSlug: string
  parentId?: string
  onCommentAdded?: (comment: Comment) => void
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
  const {user} = useAuth()
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const postCommentMutation = useMutation({
    mutationFn: async (commentData: CommentFormData) => {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...commentData,
          blogSlug,
        }),
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to post comment')
      }

      return response.json() as Promise<Comment>
    },
    onMutate: async (newCommentData) => {
      await queryClient.cancelQueries({queryKey: commentKeys.byBlog(blogSlug)})

      const previousComments = queryClient.getQueryData<Comment[]>(commentKeys.byBlog(blogSlug))

      const optimisticComment: Comment = {
        id: `temp-${Date.now()}`,
        content: newCommentData.content,
        blogSlug,
        userId: user?.id || 'temp-user',
        parentId: newCommentData.parentId,
        isApproved: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: user?.id || 'temp-user',
          name: user?.name || 'You',
          image: user?.image || undefined,
        },
        replies: [],
      }

      if (previousComments) {
        queryClient.setQueryData<Comment[]>(
          commentKeys.byBlog(blogSlug),
          addReplyToTree(previousComments, optimisticComment)
        )
      }

      return {previousComments}
    },
    onError: (error, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(commentKeys.byBlog(blogSlug), context.previousComments)
      }
      toast.error(error instanceof Error ? error.message : 'Failed to post comment')
    },
    onSuccess: (newComment) => {
      setContent('')
      if (onCommentAdded) {
        onCommentAdded(newComment)
      }
      if (onCancel) {
        onCancel()
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: commentKeys.byBlog(blogSlug)})
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      return
    }

    postCommentMutation.mutate({
      content: content.trim(),
      parentId,
    })
  }

  const isSubmitting = postCommentMutation.isPending
  const error =
    postCommentMutation.error instanceof Error ? postCommentMutation.error.message : null

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
