import {createAuthClient} from 'better-auth/react'

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_APP_URL
      : 'http://localhost:3000',
  // Add client-side optimizations
  fetchOptions: {
    cache: 'no-store', // Ensure fresh data but reduce unnecessary requests
  },
})

export const {signIn, signUp, useSession, signOut} = authClient
