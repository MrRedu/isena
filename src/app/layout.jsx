import propTypes from 'prop-types'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata = {
  title: {
    template: '%s | ISENA',
    default: 'ISENA',
  },
  description: 'Sistema de gestión de historias médicas para el Instituto de senología de Aragua',
}

export default async function RootLayout({
  children,
  params: {
    session,
    // ...params 
  },
}) {

  return (
    <html lang="es">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers session={session}>
          {children}
        </Providers >
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: propTypes.node,
  params: propTypes.object,
}