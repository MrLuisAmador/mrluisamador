'use client'

import {useState, useEffect} from 'react'

interface User {
  id: string
  name: string
  email: string
  signedIn: boolean
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      })
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Check auth status error:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await fetch('/api/auth/signout', {method: 'POST', credentials: 'include'})
      setUser(null)
    } catch (error) {
      console.error('Signout error:', error)
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user?.signedIn,
    signOut,
    refresh: checkAuthStatus,
  }
}
