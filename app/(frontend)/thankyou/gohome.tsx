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
      className="text-text-grey flex h-screen items-center justify-center px-5 py-16"
    >
      <div className="md:w-4/5">
        <div className="text-center">
          <h1 className="mb-5 text-4xl">Thank You for reaching out!</h1>
          <p className="mb-12 text-lg">I will be in contact with you shortly.</p>
        </div>
      </div>
    </section>
  )
}

export default GoHome
