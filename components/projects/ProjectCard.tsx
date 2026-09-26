import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {Media} from '@/payload-types'

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
  aspect = 'aspect-3/2',
}: ProjectCardProps) {
  // Enhanced image URL resolution
  let imageUrl = ''
  let imageAlt = title

  if (image && typeof image === 'object') {
    // The 'card' size in Payload is a portrait center-crop (768x1024).
    // We use it ONLY for the narrow portrait cards (col-span-4) where it fits the shape perfectly.
    // For wider landscape cards, we use the original uncropped image so Next.js can optimize it.
    if (colSpan.includes('col-span-4') && image.sizes?.card?.url) {
      imageUrl = image.sizes.card.url
    } else {
      imageUrl = image.url || (image.filename ? `/media/${image.filename}` : '')
    }
    imageAlt = image.alt || title
  }

  return (
    <div className={`${colSpan} group cursor-pointer`}>
      <Link
        className="block h-full"
        target="_blank"
        rel="noopener noreferrer"
        href={url}
        aria-label={title}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-white card-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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
              <div className="flex size-full items-center justify-center bg-surface-container-high">
                <span className="material-symbols-outlined text-4xl text-outline-variant">
                  image
                </span>
              </div>
            )}
          </div>

          <div className="flex grow flex-col p-8">
            <div className="mb-4 flex items-start justify-between">
              <span className="rounded-full bg-surface-container-high px-3 py-1 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                {filter}
              </span>
              <span className="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                arrow_outward
              </span>
            </div>

            <h3 className="mb-2 line-clamp-2 text-headline-md font-headline-md transition-colors group-hover:text-primary">
              {title}
            </h3>

            {description && (
              <p className="line-clamp-3 text-body-md font-body-md text-on-secondary-container">
                {description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
