import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface ProjectCardProps {
  title: string
  filter: string
  url: string
  image: Media | number | string
}

export default function ProjectCard({ title, filter, url, image }: ProjectCardProps) {
  const imageUrl = typeof image !== 'number' && typeof image !== 'string' ? image.url : ''
  const imageAlt = typeof image !== 'number' && typeof image !== 'string' ? image.alt : title

  return (
    <div className={`text-text-grey basis-6/12 bg-white shadow-[0_0_1px_0_rgba(0,0,0,0.3)] lg:basis-1/4 ${filter}`}>
      <Link
        className="block"
        target="_blank"
        rel="noopener noreferrer"
        href={url}
        aria-label={title}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
        <h4 className="text-grey px-2.5 py-5 text-sm lg:text-base">
          <span className="font-semibold">Platform: &nbsp;</span>
          <span>{title}</span>
        </h4>
      </Link>
    </div>
  )
}
