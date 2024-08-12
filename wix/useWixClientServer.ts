import {createClient, OAuthStrategy} from '@wix/sdk'
import {items} from '@wix/data'
import Cookies from 'js-cookie'

const myWixClient = createClient({
  modules: {items},
  auth: OAuthStrategy({
    clientId: `${process.env.NEXT_PUBLIC_WIX_CLIENT_ID}`,
    tokens: JSON.parse(Cookies.get('session') || '{}'),
  }),
})

export async function getWixClient() {
  try {
    const response = await myWixClient.items
      .queryDataItems({dataCollectionId: 'projectGallery'})
      .ascending('orderId')
      .find()
    return response.items
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}
