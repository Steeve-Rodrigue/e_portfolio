import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Kanit } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { QueryProvider } from '@/providers/QueryProvider'
import { Navbar } from '@/components/layout/Navbar'
import { ConditionalFooter } from '@/components/layout/ConditionalFooter'

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

const kanit = Kanit({
  subsets: ['latin'],
  variable: '--font-kanit',
  weight: ['400', '500', '600', '700'],
})

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Steeve | Data Scientist',
  description:
    'Portfolio of Steeve — Data Scientist specialized in ML, analytics, and scalable data systems.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(grotesk.variable, inter.variable, kanit.variable)}>
      <body>
        <QueryProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <ConditionalFooter />
        </QueryProvider>
      </body>
    </html>
  )
}
