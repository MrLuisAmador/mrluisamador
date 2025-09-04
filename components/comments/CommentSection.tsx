'use client'

import {Suspense, useState} from 'react'
import {useAuth} from '@/lib/hooks/useAuth'
import CommentForm from './CommentForm'
import CommentsList from './CommentsList'
import LoginPrompt from './LoginPrompt'

interface CommentSectionProps {
  blogSlug: string
}

export default function CommentSection({blogSlug}: CommentSectionProps) {
  const {user, isAuthenticated} = useAuth()
  const [refreshKey, setRefreshKey] = useState(0)

  const handleCommentAdded = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="mt-8">
      <h3 className="mb-6 text-2xl font-semibold text-gray-800">Comments</h3>

      {isAuthenticated ? (
        <CommentForm blogSlug={blogSlug} onCommentAdded={handleCommentAdded} />
      ) : (
        <LoginPrompt />
      )}

      <Suspense fallback={<CommentsSkeleton />}>
        <CommentsList key={refreshKey} blogSlug={blogSlug} currentUserId={user?.id} />
      </Suspense>
    </div>
  )
}

function CommentsSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/4 rounded bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
