import {createAuthClient} from 'better-auth/react'

export const authClient = createAuthClient({
  fetchOptions: {
    cache: 'no-store',
  },
})

export const {signIn, signUp, useSession, signOut} = authClient
