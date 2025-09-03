import {Metadata} from 'next'
import {Services} from '@/components/base/services'

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
      <Services
        title="Website Performance"
        description="Website performance should be high on any list. It's a major consideration of how Google Search ranks it. Slow websites will be penalized if it doesn't perform at Google preferred guidelines. Google will rank better performance websites at a higher search result and place slower site lower. I take on the best approaches to making sure a website ends back up on Google Search good side by auditing and fixing whatever is causing the poor performance."
        link="#"
        className="border-t border-r border-solid border-black md:border-y"
      />

      <Services
        title="SEO"
        description="What Good is a Beautiful Website if it Doesn't drive in traffic? Your website should not only look good, but it should also be wired up for SEO. This is something that should not be skipped. With my SEO experience I will make sure that you don't. Using the best SEO practices is what will differentiate a website from the rest."
        link="#"
        className="border-y border-solid border-black"
      />

      <Services
        title="Website Devlelopment and Enhancements"
        description="Website development and enhancements are the bread and butter of my business. I will work with you to build a website that is not only beautiful, but also functional and easy to use. I will also work with you to enhance your website to make it more user-friendly and efficient."
        link="#"
        className="border-r border-b border-solid border-black"
      />

      <Services
        title="Support and Maintenance"
        description="Maintenance is a free for all. You get a fixed amount of time per month to have me apply all or any of my expertise skill set at whatever task you need done. The task at hand will be estimated and agreed upon before being executed. You will alway get an extra default of 2.5 hours aside from your fixed monthly hours. Those 2.5 hours of time will be used to make sure the website is backed up and up to date with security patches. You will also be notified of any issues that need attention. Think of the Maintenance as your comfort zone knowing that I will be there at your will."
        link="#"
        className="border-b border-solid border-black"
      />
    </div>
  </section>
)

export default ServicePage
