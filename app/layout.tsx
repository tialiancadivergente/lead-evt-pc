import type React from "react"
import type { Metadata } from "next"
import './globals.css'
import { Spectral, Bebas_Neue, Roboto, Raleway, Mulish } from 'next/font/google'
import "./globals.css"
import GoogleTagManager from "./components/GoogleTagManager"
import MicrosoftClarity from "./components/MicrosoftClarity"
import AliancaTrackingScript from "./components/AliancaTrackingScript"
import Providers from "./providers"

const spectral = Spectral({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-spectral',
  weight: ['400', '500', '600', '700']
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas-neue',
  weight: ['400']
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700']
})

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
  weight: ['200', '300', '400', '500', '600', '700', '800']
})

const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mulish',
  weight: ['300', '400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: "O Resgate dos Otimistas - Diagnóstico de Dependência Emocional",
  description:
    "Faça seu diagnóstico de dependência emocional gratuito e descubra como aumentar seu nível de permissão.",
  icons: {
    icon: '/images/cropped-Alianca-Divergente-Logotipo-Favicon-32x32.png',
    shortcut: '/images/cropped-Alianca-Divergente-Logotipo-Favicon-32x32.png',
    apple: '/images/cropped-Alianca-Divergente-Logotipo-Favicon-32x32.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/images/cropped-Alianca-Divergente-Logotipo-Favicon-32x32.png" type="image/png" />
        <link rel="shortcut icon" href="/cropped-Alianca-Divergente-Logotipo-Favicon-32x32.png" type="image/png" />
        <link rel="apple-touch-icon" href="/cropped-Alianca-Divergente-Logotipo-Favicon-32x32.png" type="image/png" />
      </head>
      <body className={`${spectral.className} ${spectral.variable} ${bebasNeue.variable} ${roboto.variable} ${raleway.variable} ${mulish.variable}`}>
        <GoogleTagManager />
        <MicrosoftClarity />
        <AliancaTrackingScript />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
