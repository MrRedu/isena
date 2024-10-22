'use client'
import propTypes from 'prop-types'
import { SessionRedirect } from '@/components/SessionRedirec'

export default function Layout({ children }) {
  return (
    <SessionRedirect>
      <h2>Header</h2>
      {children}
      <footer>Footer</footer>
    </SessionRedirect>
  )
}

Layout.propTypes = {
  children: propTypes.node,
}