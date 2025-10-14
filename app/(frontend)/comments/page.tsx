import {Metadata} from 'next'
import CommentModeration from '@/components/admin/CommentModeration'

export const metadata: Metadata = {
  title: 'Comment Moderation | Admin',
  description: 'Moderate blog comments',
}

export default function AdminCommentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Comment Moderation</h1>
        <CommentModeration />
      </div>
    </div>
  )
}
