import type { Metadata } from 'next'
import { Rubik_Mono_One } from 'next/font/google'
import { Righteous } from 'next/font/google'
import { Bangers } from 'next/font/google'
import { Bungee } from 'next/font/google'
import './globals.css'

const font = Rubik_Mono_One({ 
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-game',
})

export const metadata: Metadata = {
  title: 'NYC Board Game Hackathon',
  description: 'Join us for an exciting 48-hour board game creation challenge in New York City',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font.variable}`}>{children}</body>
    </html>
  )
} 