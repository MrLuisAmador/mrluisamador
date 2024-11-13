'use client'

import {useEffect} from 'react'
import {useRouter} from 'next/navigation'

const GoHome = () => {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/')
    }, 10000)

    // Cleanup timeout on unmount
    return () => clearTimeout(timeout)
  }, [router]) // Add router to dependencies

  return (
    <section
      id="about-me"
      className="h-screen px-5 flex justify-center items-center py-16 text-text-grey"
    >
      <div className="md:w-4/5">
        <div className="text-center">
          <h1 className="text-4xl mb-5">Thank You for reaching out!</h1>
          <p className="text-lg mb-12">I will be in contact with you shortly.</p>
        </div>
      </div>
    </section>
  )
}

export default GoHome
