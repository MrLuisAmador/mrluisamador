import {media as wixMedia} from '@wix/sdk'
import Image, {ImageProps} from 'next/image'
import {cn} from '@/lib/utils'

function getImageUrlForMedia(media: string, width: number, height: number) {
  if (media.startsWith('wix:image')) {
    return wixMedia.getScaledToFillImageUrl(media, width, height, {})
  } else {
    return media
  }
}

export function WixMediaImage({
  media,
  height = 389,
  width = 800,
  alt = 'no info available for image',
  className,
  sizes = '10vw',
  objectFit,
  disableZoom = false,
}: {
  media?: string
  alt?: string
  width?: number
  height?: number
  sizes?: string
  className?: string
  disableZoom?: boolean
  objectFit?: 'cover' | 'contain'
}) {
  const imageUrl = media ? getImageUrlForMedia(media, width, height) : ''

  const styleProps: Partial<ImageProps> = objectFit
    ? {style: {objectFit}, fill: true, sizes}
    : {width, height}

  return (
    <div className="flex h-full items-center justify-center">
      <div className="group relative h-full w-full overflow-hidden">
        <Image
          {...styleProps}
          src={imageUrl}
          alt={alt}
          className={cn(
            'w-full object-cover transition duration-300 ease-in-out',
            !disableZoom && 'group-hover:scale-110',
            className
          )}
        />
      </div>
    </div>
  )
}
