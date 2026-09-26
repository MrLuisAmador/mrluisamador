'use client'

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import {PendingComment} from '@/lib/types/comment'
import {commentKeys} from '@/lib/comments/queryKeys'
import {toast} from 'sonner'

async function fetchPendingComments(): Promise<PendingComment[]> {
  const response = await fetch('/api/admin/comments/pending')
  if (!response.ok) {
    throw new Error('Failed to fetch pending comments')
  }
  return response.json()
}

export default function PendingCommentsList() {
  const queryClient = useQueryClient()

  const {
    data: pendingComments = [],
    isLoading,
    error,
    refetch,
  } = useQuery<PendingComment[]>({
    queryKey: commentKeys.pending,
    queryFn: fetchPendingComments,
    refetchInterval: 15000,
  })

  const approveMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const response = await fetch(`/api/admin/comments/${commentId}/approve`, {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error('Failed to approve comment')
      }
      return response.json()
    },
    onMutate: async (commentId: string) => {
      await queryClient.cancelQueries({queryKey: commentKeys.pending})
      const previousPending = queryClient.getQueryData<PendingComment[]>(commentKeys.pending)

      if (previousPending) {
        queryClient.setQueryData<PendingComment[]>(
          commentKeys.pending,
          previousPending.filter((c) => c.id !== commentId)
        )
      }
      return {previousPending}
    },
    onError: (err, _commentId, context) => {
      if (context?.previousPending) {
        queryClient.setQueryData(commentKeys.pending, context.previousPending)
      }
      toast.error(err instanceof Error ? err.message : 'Error approving comment')
    },
    onSuccess: () => {
      toast.success('Comment approved')
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: commentKeys.pending})
      queryClient.invalidateQueries({queryKey: commentKeys.all})
    },
  })

  const rejectMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const response = await fetch(`/api/admin/comments/${commentId}/reject`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to reject comment')
      }
      return response.json()
    },
    onMutate: async (commentId: string) => {
      await queryClient.cancelQueries({queryKey: commentKeys.pending})
      const previousPending = queryClient.getQueryData<PendingComment[]>(commentKeys.pending)

      if (previousPending) {
        queryClient.setQueryData<PendingComment[]>(
          commentKeys.pending,
          previousPending.filter((c) => c.id !== commentId)
        )
      }
      return {previousPending}
    },
    onError: (err, _commentId, context) => {
      if (context?.previousPending) {
        queryClient.setQueryData(commentKeys.pending, context.previousPending)
      }
      toast.error(err instanceof Error ? err.message : 'Error rejecting comment')
    },
    onSuccess: () => {
      toast.success('Comment rejected')
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: commentKeys.pending})
    },
  })

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto size-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600">
          Error: {error instanceof Error ? error.message : 'An error occurred'}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-4 text-sm text-gray-600">({pendingComments.length} comments)</p>

      {pendingComments.length === 0 ? (
        <p className="py-8 text-center text-gray-500">No pending comments to moderate.</p>
      ) : (
        <div className="space-y-4">
          {pendingComments.map((comment) => (
            <div key={comment.id} className="rounded-lg border bg-white p-4">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900">{comment.user.name}</p>
                  <p className="text-sm text-gray-500">{comment.user.email}</p>
                  <p className="text-sm text-gray-500">Blog: {comment.blogSlug}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => approveMutation.mutate(comment.id)}
                    disabled={approveMutation.isPending || rejectMutation.isPending}
                    className="rounded bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectMutation.mutate(comment.id)}
                    disabled={approveMutation.isPending || rejectMutation.isPending}
                    className="rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
              <p className="text-gray-800">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
