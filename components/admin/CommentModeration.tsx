'use client'

import {useSession} from '@/lib/better-auth/auth-client'
import {Suspense} from 'react'
import PendingCommentsList from '../admin/PendingCommentsList'

export default function CommentModeration() {
  const {data: session} = useSession()

  if (!session) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600">Please sign in to access the admin panel.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Pending Comments</h2>
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
        <div key={i} className="animate-pulse rounded-lg border bg-white p-4">
          <div className="mb-3 flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-gray-200"></div>
              <div className="h-3 w-48 rounded bg-gray-200"></div>
              <div className="h-3 w-24 rounded bg-gray-200"></div>
              <div className="h-3 w-20 rounded bg-gray-200"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-8 w-16 rounded bg-gray-200"></div>
              <div className="h-8 w-16 rounded bg-gray-200"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 rounded bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
