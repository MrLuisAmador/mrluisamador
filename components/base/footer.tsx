'use cache'

export default async function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-dark-grey px-3.5 py-8 text-white">
      <div className="text-sm">
        © <span className="mr-1">{year}</span>
        <span className="mr-1">All Rights Reserved.</span>
        <a href="mailto:mrluisamador@gmail.com">Luis Amador</a>
      </div>
    </footer>
  )
}
