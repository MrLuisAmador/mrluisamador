import {NextRequest, NextResponse} from 'next/server'
import {auth} from '@/lib/better-auth/auth'

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>

export async function requireAuth(
  request: NextRequest
): Promise<
  {session: NonNullable<Session>; response: null} | {session: null; response: NextResponse}
> {
  const session = await auth.api.getSession({headers: request.headers})

  if (!session) {
    return {
      session: null,
      response: NextResponse.json({error: 'Authentication required'}, {status: 401}),
    }
  }

  return {session, response: null}
}
