import {Metadata} from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services - Luis Amador Web Developer',
  description: 'Luis Amador website to showcase his skills and services he offers to businesses',
}

const Services = () => (
  <section id="skills" className="bg-skills-grey py-16 text-text-grey">
    <h1 className="text-5xl text-center mb-16">Services</h1>

    <div className="md:grid md:grid-cols-2">
      <Link
        href="#"
        className="block p-5 md:basis-2/4 md:p-10 border-solid border-t-[1px] md:border-y-[1px] border-r-[1px] border-black transition duration-300 hover:bg-white"
      >
        <h2 className="mb-5 text-4xl">Website Performance</h2>

        <div className="">
          <p>
            Website performance should be high on any list. It&apos;s a major consideration of how
            Google Search ranks it. Slow websites will be penalized if it doesn&apos;t perform at
            Google preferred guidelines. Google will rank better performance websites at a higher
            search result and place slower site lower. I take on the best approaches to making sure
            a website ends back up on Google Search good side by auditing and fixing whatever is
            causing the poor performance.
          </p>
        </div>
      </Link>

      <Link
        href="#"
        className="block p-5 md:basis-2/4 md:p-10 border-solid border-y-[1px] border-black transition duration-300 hover:bg-white"
      >
        <h1 className="mb-5 text-4xl ">SEO</h1>

        <div className="">
          <p>
            What Good is a Beautiful Website if it Doesn&apos;t drive in traffic? Your website
            should not only look good, but it should also be wired up for SEO. This is something
            that should not be skipped. With my SEO experience I will make sure that you don&apos;t.
            Using the best SEO practices is what will differentiate a website from the rest.
          </p>
        </div>
      </Link>

      <Link
        href="#"
        className="block p-5 md:basis-2/4 md:p-10 border-solid border-b-[1px] border-r-[1px] border-black transition duration-300 hover:bg-white"
      >
        <h1 className="mb-5 text-4xl ">Website Devlelopment and Enhancements</h1>

        <div className="">
          <p>
            Support and Enhancements differs from Maintenance. If requiring just a single task, I
            will handle any Support and Enhancements as specified. It could be a task that requires
            a fix, or an Enhancement that you would like to add in, or an fix/update you would like
            to make on a live current page. I will assure these items are applied in a timely
            matter.
          </p>
        </div>
      </Link>

      <Link
        href="#"
        className="block p-5 md:basis-2/4 md:p-10 border-solid border-b-[1px] border-black transition duration-300 hover:bg-white"
      >
        <h1 className="mb-5 text-4xl ">Support and Maintenance</h1>

        <div className="">
          <p>
            Maintenance is a free for all. You get a fixed amount of time per month to have me apply
            all or any of my expertise skill set at whatever task you need done. The task at hand
            will be estimated and agreed upon before being executed. You will alway get an extra
            default of 2.5 hours aside from your fixed monthly hours. Those 2.5 hours of time will
            be used to make sure the website is backed up and up to date with security patches. You
            will also be notified of any issues that need attention. Think of the Maintenance as
            your comfort zone knowing that I will be there at your will.
          </p>
        </div>
      </Link>
    </div>
  </section>
)

export default Services
