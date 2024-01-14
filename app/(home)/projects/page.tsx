import { Metadata } from 'next'
import Shuffle from './shuffle';


export const metadata: Metadata = {
  title: 'Projects | Luis Amador Portfolio',
  description: 'Portfolio Website And Blog'
}

function Projects() {
    return(
    <Shuffle />
    )
}


export default Projects;
