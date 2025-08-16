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
  const response = await fetch('/api/admin/comments/pending')
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
      const response = await fetch(`/api/admin/comments/${commentId}/approve`, {
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
      const response = await fetch(`/api/admin/comments/${commentId}/reject`, {
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
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error: {error}</p>
        <button
          onClick={() => router.refresh()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">({pendingComments.length} comments)</p>

      {pendingComments.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No pending comments to moderate.</p>
      ) : (
        <div className="space-y-4">
          {pendingComments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-start mb-3">
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
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(comment.id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
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
