'use client'

import {useSession, signOut as betterAuthSignOut} from '@/lib/better-auth/auth-client'

export function useAuth() {
  const {data: session, isPending: isLoading} = useSession()

  const handleSignOut = async () => {
    try {
      await betterAuthSignOut()
    } catch (error) {
      console.error('Signout error:', error)
    }
  }

  return {
    user: session?.user || null,
    isLoading,
    isAuthenticated: !!session?.user,
    signOut: handleSignOut,
    refresh: () => {
      // Better Auth handles session refresh automatically
      // This is kept for API compatibility but doesn't need to do anything
    },
  }
}
