import {describe, it, expect, vi, beforeEach} from 'vitest'
import {NextRequest} from 'next/server'
import {requireAuth, Session} from './requireAuth'
import {requireAdmin} from './requireAdmin'
import {auth} from '@/lib/better-auth/auth'

vi.mock('@/lib/better-auth/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}))

vi.mock('@/lib/env', () => ({
  env: {
    admin: {
      emails: ['admin@example.com'],
    },
  },
}))

describe('Auth Guards', () => {
  const dummyRequest = new NextRequest('http://localhost/api/test')

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('requireAuth', () => {
    it('should return 401 when there is no active session', async () => {
      vi.mocked(auth.api.getSession).mockResolvedValue(null)

      const result = await requireAuth(dummyRequest)

      expect(result.session).toBeNull()
      expect(result.response?.status).toBe(401)
      const json = await result.response?.json()
      expect(json).toEqual({error: 'Authentication required'})
    })

    it('should return session and null response when user is authenticated', async () => {
      const mockSession = {
        session: {
          id: 's-1',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 'u-1',
          token: 'tok',
          expiresAt: new Date(),
        },
        user: {
          id: 'u-1',
          email: 'user@example.com',
          name: 'Regular User',
          emailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }
      vi.mocked(auth.api.getSession).mockResolvedValue(mockSession as unknown as Session)

      const result = await requireAuth(dummyRequest)

      expect(result.response).toBeNull()
      expect(result.session).toEqual(mockSession)
    })
  })

  describe('requireAdmin', () => {
    it('should return 401 if user is unauthenticated', async () => {
      vi.mocked(auth.api.getSession).mockResolvedValue(null)

      const result = await requireAdmin(dummyRequest)

      expect(result.session).toBeNull()
      expect(result.response?.status).toBe(401)
    })

    it('should return 403 if user email is not an admin email', async () => {
      const regularSession = {
        session: {id: 's-1'},
        user: {id: 'u-1', email: 'notanadmin@example.com', name: 'User'},
      }
      vi.mocked(auth.api.getSession).mockResolvedValue(regularSession as unknown as Session)

      const result = await requireAdmin(dummyRequest)

      expect(result.session).toBeNull()
      expect(result.response?.status).toBe(403)
      const json = await result.response?.json()
      expect(json).toEqual({error: 'Admin access required'})
    })

    it('should allow access when user email matches admin email (case insensitive)', async () => {
      const adminSession = {
        session: {id: 's-1'},
        user: {id: 'u-admin', email: 'ADMIN@EXAMPLE.COM', name: 'Admin'},
      }
      vi.mocked(auth.api.getSession).mockResolvedValue(adminSession as unknown as Session)

      const result = await requireAdmin(dummyRequest)

      expect(result.response).toBeNull()
      expect(result.session?.user.email).toBe('ADMIN@EXAMPLE.COM')
    })
  })
})
