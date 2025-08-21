import {Metadata} from 'next'
import CommentModeration from '@/components/admin/CommentModeration'

export const metadata: Metadata = {
  title: 'Comment Moderation | Admin',
  description: 'Moderate blog comments',
}

export default function AdminCommentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Comment Moderation</h1>
        <CommentModeration />
      </div>
    </div>
  )
}
