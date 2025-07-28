import {Metadata} from 'next'
import GoHome from './gohome'

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Portfolio Website And Blog',
  alternates: {
    canonical: '/thankyou',
  },
}

const ThankYou = () => {
  return <GoHome />
}

export default ThankYou
