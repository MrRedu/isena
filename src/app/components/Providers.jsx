'use client'
import propTypes from 'prop-types'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
export function Providers({ children, session }) {
  return (
    <>
      <Toaster richColors />
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  )
}
Providers.propTypes = {
  children: propTypes.node,
  session: propTypes.object,
}
