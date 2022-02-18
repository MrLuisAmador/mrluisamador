import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';


export default function FirstPost() {
  return (
    <>
     <Head>
        <title>First Post - Luis Amador Blog</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <Image
    src="/images/mugshot.png" // Route of the image file
    height={144} // Desired size with correct aspect ratio
    width={144} // Desired size with correct aspect ratio
    alt="Your Name"
  />
    </>
  )
}