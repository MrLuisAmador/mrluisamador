'use client'

import {useSession, signOut as betterAuthSignOut} from '@/lib/better-auth/auth-client'
import {useMemo} from 'react'

export function useAuth() {
  const {data: session, isPending: isLoading} = useSession()

  const handleSignOut = async () => {
    try {
      await betterAuthSignOut()
    } catch (error) {
      console.error('Signout error:', error)
    }
  }

  // Memoize the auth state to prevent unnecessary re-renders
  const authState = useMemo(
    () => ({
      user: session?.user || null,
      isLoading,
      isAuthenticated: !!session?.user,
      signOut: handleSignOut,
      refresh: () => {
        // Better Auth handles session refresh automatically
        // This is kept for API compatibility but doesn't need to do anything
      },
    }),
    [session?.user, isLoading]
  )

  return authState
}
