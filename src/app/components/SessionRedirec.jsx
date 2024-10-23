'use client'
import propTypes from 'prop-types'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export const SessionRedirect = ({ children }) => {
  // const { data: session } = useSession()
  // const router = useRouter()
  // useEffect(() => {
  //   if (session) {
  //     router.push('/')
  //   } else {
  //     router.push('/login')
  //   }
  // }, [session, router])
  return children
}
SessionRedirect.propTypes = {
  children: propTypes.node,
}