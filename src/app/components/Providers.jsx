'use client'
import propTypes from 'prop-types'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
import { SessionRedirect } from './SessionRedirec'
export function Providers({ children, session }) {
  return (
    <>
      <Toaster />
      <SessionProvider session={session}>
        <SessionRedirect>
          {children}
        </SessionRedirect>
      </SessionProvider>
    </>
  )
}
Providers.propTypes = {
  children: propTypes.node,
  session: propTypes.object,
}