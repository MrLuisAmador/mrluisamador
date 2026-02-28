import {NextResponse} from 'next/server'

export function handleApiError(error: unknown, context: string): NextResponse {
  const message = error instanceof Error ? error.message : 'An unknown error occurred'
  console.error(`${context}:`, error)
  return NextResponse.json({error: message}, {status: 500})
}
