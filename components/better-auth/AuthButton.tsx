'use client'

import {useAuth} from '@/lib/hooks/useAuth'
import Link from 'next/link'

export default function AuthButton() {
  const {user, isLoading, isAuthenticated, signOut} = useAuth()

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
      </div>
    )
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <span className="text-sm text-gray-700">Welcome, {user.name}</span>
        <div className="flex space-x-2">
          <Link
            href="/admin/comments"
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Admin
          </Link>
          <button
            onClick={signOut}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
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
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Sign In
    </Link>
  )
}
