"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const GoHome = () => {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 10000);
      }, []);
   
    return (
    <section id="about-me" className="h-screen px-5 flex justify-center items-center py-16 text-text-grey">
        <div className="md:w-4/5">
            <div className="text-center">
            <h1 className="text-4xl mb-16">Thank You for reaching out!</h1>

            <p className="text-lg mb-12">I will be in contact with you shortly. Back to the home page in 5 seconds. </p>
            </div>
        </div>
    </section>
    )
}

export default GoHome