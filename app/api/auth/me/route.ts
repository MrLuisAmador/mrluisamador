import {NextRequest, NextResponse} from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const userSession = request.cookies.get('user-session')?.value

    if (!userSession) {
      return NextResponse.json({error: 'Not authenticated'}, {status: 401})
    }

    try {
      const user = JSON.parse(userSession)

      if (user.signedIn) {
        return NextResponse.json({user})
      } else {
        return NextResponse.json({error: 'Not authenticated'}, {status: 401})
      }
    } catch (error) {
      console.error('Error parsing user session:', error)
      return NextResponse.json({error: 'Invalid session'}, {status: 401})
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({error: 'Authentication check failed'}, {status: 500})
  }
}
