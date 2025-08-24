import {createClient, OAuthStrategy} from '@wix/sdk'
import {items} from '@wix/data'

export const getWixClient = async () => {
  if (!process.env.NEXT_PUBLIC_WIX_CLIENT_ID) {
    throw new Error('NEXT_PUBLIC_WIX_CLIENT_ID environment variable is not set')
  }

  const wixClient = createClient({
    modules: {items},
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    }),
  })
  return wixClient
}
