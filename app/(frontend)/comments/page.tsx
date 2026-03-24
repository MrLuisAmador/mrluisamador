import {Metadata} from 'next'
import {headers} from 'next/headers'
import CommentModeration from '@/components/admin/CommentModeration'
import {auth} from '@/lib/better-auth/auth'
import {env} from '@/lib/env'

export const metadata: Metadata = {
  title: 'Comment Moderation | Admin',
  description: 'Moderate blog comments',
}

export default async function AdminCommentsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isAdmin =
    !!session?.user.email && env.admin.emails.includes(session.user.email.toLowerCase())

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Comment Moderation</h1>
        {isAdmin ? (
          <CommentModeration />
        ) : (
          <p className="text-gray-600">Admin access is required to view this page.</p>
        )}
      </div>
    </div>
  )
}
