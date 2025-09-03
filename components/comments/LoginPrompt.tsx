'use client'

import Link from 'next/link'

export default function LoginPrompt() {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 text-center">
      <h4 className="mb-2 text-lg font-medium text-blue-900">Join the conversation</h4>
      <p className="mb-4 text-blue-700">
        Sign in to leave a comment and engage with other readers.
      </p>
      <Link
        href="/signin"
        className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
      >
        Sign In to Comment
      </Link>
    </div>
  )
}
