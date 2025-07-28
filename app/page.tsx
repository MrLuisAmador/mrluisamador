import Link from 'next/link'
import {Nextjs, Wix} from '@/components/base/svg'
import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Home | Luis Amador Portfolio',
  description: 'Luis Amador portfolio to showcase his services and skills.',
}

export default function Home() {
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
        <div className="bg-white px-4 py-2 md:px-16 md:py-5 self-center md:self-end">
          <div>
            <Wix />
          </div>
          <p className="pb-5 pt-5 md:pt-12">
            <span className="block text-center">Do you want an afforable Website?</span>
            <span className="block text-center">
              Wix is a modern and better appoarch to rapid websites
            </span>
          </p>
        </div>
        <div className="bg-white px-4 py-2 md:px-16 md:py-5">
          <div>
            <Nextjs />
          </div>
          <p className="py-5">
            <span className="block text-center">Do you want a Web App?</span>
            <span className="block text-center">
              Nextjs is used when you need to build a sophisticated Web App
            </span>
          </p>
        </div>
      </section>
    </>
  )
}
