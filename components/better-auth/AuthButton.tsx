'use client'

import {useAuth} from '@/lib/hooks/useAuth'
import Link from 'next/link'

export default function AuthButton() {
  const {user, isLoading, isAuthenticated, signOut} = useAuth()

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-20 rounded bg-gray-200"></div>
      </div>
    )
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <span className="text-sm text-gray-700">Welcome, {user.name}</span>
        <div className="flex space-x-2">
          <Link
            href="/comments"
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
          >
            Admin
          </Link>
          <button
            onClick={signOut}
            className="rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <Link
      href="/signin"
      className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
    >
      Sign In
    </Link>
  )
}
