import {NextRequest, NextResponse} from 'next/server'
import {auth} from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Get the session token from cookies
    const sessionToken = request.cookies.get('auth-session-token')?.value

    if (sessionToken) {
      // Invalidate the session in Better Auth
      try {
        await auth.api.signOut({
          headers: {
            'Set-Cookie': `auth-session-token=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/`,
          },
        })
      } catch (error) {
        console.error('Error invalidating session:', error)
      }
    }

    // Create response
    const response = NextResponse.json({message: 'Signed out successfully'}, {status: 200})

    // Clear the session cookie
    response.cookies.set('auth-session-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Signout error:', error)
    return NextResponse.json({error: 'Failed to sign out'}, {status: 500})
  }
}

// Also handle GET requests for convenience
export async function GET(request: NextRequest) {
  return POST(request)
}
