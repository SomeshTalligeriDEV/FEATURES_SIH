import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { Comic_Neue, Roboto_Condensed } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const comicNeue = Comic_Neue({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
  style: ["normal", "italic"],
})

const robotoCondensed = Roboto_Condensed({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "SARATHI - The Digital Krishna for Students",
  description:
    "The Digital Krishna for Students — guiding them through the battlefield of exams and beyond, in every Indian language, online and offline.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistMono.variable} ${comicNeue.variable} ${robotoCondensed.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
