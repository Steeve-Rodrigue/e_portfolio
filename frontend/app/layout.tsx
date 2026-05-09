import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { QueryProvider } from '@/providers/QueryProvider'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '600', '700', '800'],
})

const vietnam = Be_Vietnam_Pro({
  subsets: ['latin'],
  variable: '--font-vietnam',
  weight: ['400', '600', '700'],
})

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
    <html lang="en" className={cn(jakarta.variable, vietnam.variable)}>
      <body className="bg-[#F7FAF9] ">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
