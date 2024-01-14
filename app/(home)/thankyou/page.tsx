import { Metadata } from 'next'
import GoHome from './gohome'

export const metadata: Metadata = {
    title: 'Thank You | Luis Amador Portfolio',
    description: 'Portfolio Website And Blog'
}

const ThankYou = () => {
    return (
   <GoHome />
    )
}

export default ThankYou