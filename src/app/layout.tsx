import './globals.scss'
import styles from './layout.module.scss'
import { Analytics } from '@vercel/analytics/react'

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Vic van Cooten',
  description: 'Software engineer from Utrecht',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={roboto.className}>
      <div className={styles.main}>
        <div className={styles.content}>{children}</div>
      </div>
      <Analytics />
    </body>
  </html>
)

export default RootLayout
