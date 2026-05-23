import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Media } from '@/payload-types'

interface ProjectCardProps {
  title: string
  filter: string
  url: string
  image: Media | number | string
  description?: string
  colSpan?: string
  aspect?: string
  index?: number
}

export default function ProjectCard({ 
  title, 
  filter, 
  url, 
  image, 
  description,
  colSpan = 'md:col-span-6',
  aspect = 'aspect-[3/2]',
  index = 0
}: ProjectCardProps) {
  // Enhanced image URL resolution
  let imageUrl = ''
  let imageAlt = title

  if (image && typeof image === 'object') {
    // Try to use a specific size if it exists, otherwise use original url
    // Fallback to filename if url is missing (though Payload usually provides it)
    imageUrl = image.sizes?.card?.url || image.url || (image.filename ? `/media/${image.filename}` : '')
    imageAlt = image.alt || title
  }

  return (
    <div 
      className={`${colSpan} group cursor-pointer`}
    >
      <Link
        className="block h-full"
        target="_blank"
        rel="noopener noreferrer"
        href={url}
        aria-label={title}
      >
        <div className="bg-white rounded-xl overflow-hidden card-shadow border border-border-subtle transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
          <div className={`relative ${aspect} w-full overflow-hidden bg-surface-container`}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                priority={colSpan.includes('lg:col-span-8')}
              />
            ) : (
              <div className="bg-surface-container-high w-full h-full flex items-center justify-center">
                <span className="material-symbols-outlined text-outline-variant text-4xl">image</span>
              </div>
            )}
          </div>
          
          <div className="p-8 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-surface-container-high text-on-surface-variant text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
                {filter}
              </span>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                arrow_outward
              </span>
            </div>
            
            <h3 className="text-headline-md font-headline-md mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            
            {description ? (
              <p className="text-body-md font-body-md text-on-secondary-container line-clamp-3">
                {description}
              </p>
            ) : (
              <p className="text-body-md font-body-md text-on-secondary-container italic opacity-50">
                No description provided.
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
