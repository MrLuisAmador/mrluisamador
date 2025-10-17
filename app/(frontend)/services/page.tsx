import {Metadata} from 'next'
import {JobCard} from '@/components/ui/job-card'
import {jobs} from '@/data/jobs'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Luis Amador website to showcase his skills and services he offers to businesses',
  alternates: {
    canonical: '/services',
  },
}

const ServicePage = () => (
  <section id="skills" className="bg-skills-grey text-text-grey py-16">
    <h1 className="mb-16 text-center text-5xl">Services</h1>

    <div className="md:grid md:grid-cols-2">
      {jobs.map((job) => (
        <JobCard
          key={job.title}
          title={job.title}
          description={job.description}
          link={job.link}
          className={job.className}
        />
      ))}
    </div>
  </section>
)

export default ServicePage
