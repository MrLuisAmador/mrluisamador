'use client'

import Link from 'next/link'

export default function LoginPrompt() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
      <h4 className="text-lg font-medium text-blue-900 mb-2">Join the conversation</h4>
      <p className="text-blue-700 mb-4">
        Sign in to leave a comment and engage with other readers.
      </p>
      <Link
        href="/signin"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
      >
        Sign In to Comment
      </Link>
    </div>
  )
}
