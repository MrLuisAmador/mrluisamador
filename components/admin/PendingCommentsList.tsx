'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'

interface PendingComment {
  id: string
  content: string
  blogSlug: string
  createdAt: Date
  user: {
    name: string
    email: string
  }
}

async function fetchPendingComments(): Promise<PendingComment[]> {
  const response = await fetch('/api/comments/pending')
  if (!response.ok) {
    throw new Error('Failed to fetch pending comments')
  }
  return response.json()
}

export default function PendingCommentsList() {
  const [pendingComments, setPendingComments] = useState<PendingComment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadComments = async () => {
      try {
        const comments = await fetchPendingComments()
        setPendingComments(comments)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    loadComments()
  }, [])

  const handleApprove = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/approve`, {
        method: 'POST',
      })

      if (response.ok) {
        setPendingComments((prev) => prev.filter((c) => c.id !== commentId))
      }
    } catch (error) {
      console.error('Error approving comment:', error)
    }
  }

  const handleReject = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/reject`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPendingComments((prev) => prev.filter((c) => c.id !== commentId))
      }
    } catch (error) {
      console.error('Error rejecting comment:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600">Error: {error}</p>
        <button
          onClick={() => router.refresh()}
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
                    onClick={() => handleApprove(comment.id)}
                    className="rounded bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(comment.id)}
                    className="rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
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
