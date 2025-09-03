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
  <div className="self-center bg-white px-4 py-2 md:self-end md:px-16 md:py-5">
    <div>
      <Icon />
    </div>
    <p className="pt-5 pb-5 md:pt-12">
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
      <section className="bg-theme-red flex min-h-[380px] items-center text-center">
        <div className="w-full px-3">
          <h1 className="mb-3 text-5xl text-white md:text-7xl lg:text-8xl">Luis Amador</h1>

          <h2 className="mb-10 text-4xl text-white lg:text-5xl">
            <span className="block text-center">why you should hire me</span>
          </h2>
          <Link
            className="inline-block w-full max-w-[80%] rounded border border-solid border-white px-4 py-2.5 text-xl text-white transition-colors hover:bg-white/15 md:max-w-[30%]"
            href="/about"
          >
            Who am I ?
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 pt-5 md:grid-cols-2 md:pt-0">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </section>
    </>
  )
}
