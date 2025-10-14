import Link from 'next/link'
import {Metadata} from 'next'
import {Button} from '@/components/ui/button'
import {ServiceCard} from '@/components/ui/service-card'
import {services} from '@/data/service/services'

export const metadata: Metadata = {
  title: 'Home | Luis Amador Portfolio',
  description: 'Luis Amador portfolio to showcase his services and skills.',
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <>
      <section className="bg-theme-red flex min-h-[380px] items-center text-center">
        <div className="w-full px-3">
          <h1 className="mb-3 text-5xl text-white md:text-7xl lg:text-8xl">Luis Amador</h1>

          <h2 className="mb-10 text-4xl text-white lg:text-5xl">
            <span className="block text-center">why you should hire me</span>
          </h2>
          <Link href="/about">
            <Button variant="outline">Who am I ?</Button>
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
