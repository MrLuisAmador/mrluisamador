import {NextRequest, NextResponse} from 'next/server'
import {env} from '@/lib/env'
import {requireAuth} from '@/lib/api/requireAuth'

type RequireAdminResult =
  | {session: NonNullable<Awaited<ReturnType<typeof requireAuth>>['session']>; response: null}
  | {session: null; response: NextResponse}

export async function requireAdmin(request: NextRequest): Promise<RequireAdminResult> {
  const authResult = await requireAuth(request)
  if (authResult.response) {
    return authResult
  }

  const adminEmails = env.admin.emails
  const userEmail = authResult.session.user.email.toLowerCase()

  if (!adminEmails.includes(userEmail)) {
    return {
      session: null,
      response: NextResponse.json({error: 'Admin access required'}, {status: 403}),
    }
  }

  return authResult
}
