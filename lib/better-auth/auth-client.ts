import {createAuthClient} from 'better-auth/react'

const authClient = createAuthClient({
  fetchOptions: {
    cache: 'no-store',
  },
})

export const {signIn, signUp, useSession, signOut} = authClient
