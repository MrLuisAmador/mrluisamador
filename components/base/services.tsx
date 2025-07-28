import Link from 'next/link'

export const Services = ({
  title,
  description,
  link,
  className,
}: {
  title: string
  description: string
  link: string
  className?: string
}) => {
  return (
    <>
      <Link
        href={link}
        className={`block p-5 md:basis-2/4 md:p-10 transition duration-300 hover:bg-white ${className || ''}`}
      >
        <h2 className="mb-5 text-4xl">{title}</h2>

        <div className="">
          <p>{description}</p>
        </div>
      </Link>
    </>
  )
}
