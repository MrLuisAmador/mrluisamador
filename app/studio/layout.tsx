export const metadata = {
  title: 'Sanity Admin',
  description: 'Sanity admin to write blog stories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
