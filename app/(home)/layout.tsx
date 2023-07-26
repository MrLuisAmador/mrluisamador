import Nav from "../../components/nav/nav.js"
import Footer from "../../components/footer/footer"
import { Metadata } from 'next'

import { Alice, Playfair_Display } from 'next/font/google';
import '../../styles/global.scss';
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: 'Luis Amador Portfolio',
  description: 'Luis Amador Web Developer Portfolio Website And Blog'
}
 
const alice = Alice({
  weight: '400',
  variable: '--title-font',
  subsets: ['latin'],
  display: 'swap',
});
 
const playfair_display = Playfair_Display({
  variable: '--text-font',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${alice.variable} ${playfair_display.variable}`}>
      <body>
        <div className={`${styles.bodyContainer}`}>
          <Nav />
          <div className="contentContainer">
              <main className="main-container">
                {children}
              </main>
              <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
