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
    '/unauthorized',
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
    '/unauthorized',
  ]

  // Verificar si la ruta solicitada es una ruta protegida
  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  // Si la ruta es protegida y no hay token, redirigir a login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Lógica de acceso según el rol del usuario
  if (token) {
    const userRole = token.rol // Asumiendo que 'rol' es un string como 'Administrador', 'Desarrollador', etc.
    const userStatus = token.status

    // Restringir acceso a /unauthorized para Deshabilitados
    if (
      userStatus === 'Deshabilitado' &&
      request.nextUrl.pathname !== '/unauthorized'
    ) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    // Permitir acceso a todos los paths para Administrador y Desarrollador
    if (userRole === 'Administrador' || userRole === 'Desarrollador') {
      return NextResponse.next()
    }

    // Restringir acceso a /management y /users para Médico
    if (
      (userRole === 'Médico' || userRole === 'Visualizador') &&
      (request.nextUrl.pathname.startsWith('/management') ||
        request.nextUrl.pathname.startsWith('/users'))
    ) {
      return NextResponse.redirect(new URL('/', request.url)) // Redirigir a la página de inicio
    }
  }

  return NextResponse.next()
}
