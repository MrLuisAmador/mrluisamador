import {Metadata} from 'next'
import Shuffle from './shuffle'

// import {createClient} from './utils/supabase/server'

export const metadata: Metadata = {
  title: 'Projects - Luis Amador Web Developer',
  description: 'Portfolio Website And Blog',
}

function Projects() {
  return <Shuffle />
}

export default Projects

// export default async function Notes() {
//   const supabase = createClient()
//   const {data: notes} = await supabase.from('notes').select()

//   return <pre>{JSON.stringify(notes, null, 2)}</pre>
// }
