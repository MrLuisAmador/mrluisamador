import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">Not Found</h2>
      <p className="text-gray-500 mt-2">Sorry, we could not find that page.</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
