'use client'
import propTypes from 'prop-types'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const SessionRedirect = ({ children }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Verificar si la sesión está cargando
    if (status === 'loading') return

    const currentPath = window.location.pathname

    if (session) {
      // Si el usuario está logueado y está en /login o /register, redirigir a /
      if (currentPath === '/login' || currentPath === '/register') {
        router.push('/')
      }
    } else {
      // Si el usuario no está logueado, redirigir a /login si no está ya allí
      if (
        currentPath !== '/login' &&
        currentPath !== '/register' &&
        currentPath !== '/terms-and-conditions'
      ) {
        router.push('/login')
      }
    }
  }, [session, status, router])

  return children
}

SessionRedirect.propTypes = {
  children: propTypes.node,
}
