// /middleware.js
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export const config = {
  matcher: [
    '/',
    '/help/:path*',
    '/management/:path*',
    '/patients/:path*',
    '/profile/:path*',
    '/users/:path*',
  ],
}

export async function middleware(request) {
  // console.log('Middleware ejecutándose para:', request.nextUrl.pathname)

  const token = await getToken({ req: request })
  // // console.log('Token encontrado:', !!token)
  // console.log('Token encontrado:', token)

  const protectedRoutes = [
    '/',
    '/help',
    '/management',
    '/patients',
    '/profile',
    '/users',
  ]

  // Verificar si la ruta solicitada es una ruta protegida
  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  // Si la ruta es protegida y no hay token, redirigir a login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
