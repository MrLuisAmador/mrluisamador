import {Metadata} from 'next'
import Shuffle from './shuffle'

// import {createClient} from './utils/supabase/server'

export const metadata: Metadata = {
  title: 'Projects - Luis Amador Web Developer',
  description: 'Portfolio Website And Blog',
}

function Projects() {
  return (
    <section id="projects" className="h-full text-white bg-projects-orange py-16">
      <div className="mb-12">
        <h2 className="text-5xl text-center mb-10">Projects</h2>

        <h3 className="text-lg mb-8 text-center">List of Projects.</h3>
      </div>

      <Shuffle />
    </section>
  )
}

export default Projects

// export default async function Notes() {
//   const supabase = createClient()
//   const {data: notes} = await supabase.from('notes').select()

//   return <pre>{JSON.stringify(notes, null, 2)}</pre>
// }
