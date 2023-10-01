import Link from 'next/link'

const Home = () => {
  return (
    <>
      <section id='hero' className="h-screen min-h-[380px] bg-theme-red flex text-center items-center">
        <div className="w-full px-3">
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl mb-5 md:mb-10">Luis Amador</h1>

          <h2 className="text-white text-4xl lg:text-5xl mb-10">
            <span className="">Web Developer, making the web a better place.</span>
            <span className="animate-blink">|</span>
          </h2>

          <Link className="border border-solid border-white text-white py-2.5 px-4 w-full max-w-[80%] md:max-w-[30%] inline-block rounded text-xl hover:bg-white/[.15] transition-colors" href="contact">Let&apos;s Talk!</Link>
        </div>
      </section>
    </>
  )
}

export default Home