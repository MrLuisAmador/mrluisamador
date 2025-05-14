import {createClient, OAuthStrategy} from '@wix/sdk'
import {items} from '@wix/data'

export const getWixClient = async () => {
  const wixClient = createClient({
    modules: {items},
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    }),
  })
  return wixClient
}
