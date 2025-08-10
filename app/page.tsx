import Link from 'next/link'
import {Nextjs, Wix} from '@/components/base/svg'
import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Home | Luis Amador Portfolio',
  description: 'Luis Amador portfolio to showcase his services and skills.',
  alternates: {
    canonical: '/',
  },
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType
  title: string
  description: string
}) => (
  <div className="bg-white px-4 py-2 md:px-16 md:py-5 self-center md:self-end">
    <div>
      <Icon />
    </div>
    <p className="pb-5 pt-5 md:pt-12">
      <span className="block text-center">{title}</span>
      <span className="block text-center">{description}</span>
    </p>
  </div>
)

export default function Home() {
  const services = [
    {
      icon: Wix,
      title: 'Do you want an afforable Website?',
      description: 'Wix is a modern and better appoarch to rapid websites',
    },
    {
      icon: Nextjs,
      title: 'Do you want a Web App?',
      description: 'Nextjs is used when you need to build a sophisticated Web App',
    },
  ]

  return (
    <>
      <section className="min-h-[380px] bg-theme-red flex text-center items-center">
        <div className="w-full px-3">
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl mb-3">Luis Amador</h1>

          <h2 className="text-white text-4xl lg:text-5xl mb-10">
            <span className="block text-center">why you should hire me</span>
          </h2>
          <Link
            className="border border-solid border-white text-white py-2.5 px-4 w-full max-w-[80%] md:max-w-[30%] inline-block rounded text-xl hover:bg-white/[.15] transition-colors"
            href="about"
          >
            Who am I ?
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 pt-5 md:pt-0">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </section>
    </>
  )
}
