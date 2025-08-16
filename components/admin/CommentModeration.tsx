'use client'

import {useSession} from '@/lib/auth-client'
import {Suspense} from 'react'
import PendingCommentsList from '../admin/PendingCommentsList'

export default function CommentModeration() {
  const {data: session} = useSession()

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please sign in to access the admin panel.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Comments</h2>
      <Suspense fallback={<CommentModerationSkeleton />}>
        <PendingCommentsList />
      </Suspense>
    </div>
  )
}

function CommentModerationSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-lg border animate-pulse">
          <div className="flex justify-between items-start mb-3">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-48"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
