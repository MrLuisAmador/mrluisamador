import Link from 'next/link'

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      {/* Navigation back to main site */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
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
