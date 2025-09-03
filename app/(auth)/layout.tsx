import Link from 'next/link'

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      {/* Navigation back to main site */}
      <div className="border-b bg-white shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 transition-colors hover:text-blue-600"
            >
              ← Back to Luis Amador Portfolio
            </Link>
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}
