import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next'
import { validatePassword } from '@/services/authServices'
import { connection } from '@/libs/mysql'

async function login(credentials) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${credentials.email}`
    )
    if (!response.ok) throw new Error('Something went wrong')
    const { data: user } = await response.json()
    if (!user) throw new Error('Incorrect credentials')

    const isPasswordValid = await validatePassword(
      credentials.password,
      user.contrasena_usuario
    )

    if (!isPasswordValid) throw new Error('Incorrect credentials')

    await connection.query('INSERT INTO tbl_bitacora SET ?', {
      id_usuario: user.id_usuario,
      descripcion_bitacora: `El usuario ${user.correo_usuario} ha iniciado sesión`,
      fecha_registro: new Date(),
    })

    return user
  } catch (error) {
    console.error('Error while logging in: ', error)
    throw new Error('Something went wrong')
  }
}

export const authOptions = {
  pages: {
    signIn: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      authorize: async credentials => {
        try {
          const user = await login(credentials)
          return user
        } catch (error) {
          throw new Error('Failed to login')
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.idUser = user.id_usuario
        token.email = user.correo_usuario
        token.name = user.nombres_usuario
        token.lastName = user.apellidos_usuario
        token.rol = user.rol_usuario
        token.status = user.status_usuario
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.idUser = token.idUser
        session.user.email = token.email
        session.user.name = token.name
        session.user.lastName = token.lastName
        session.user.rol = token.rol
        session.user.status = token.status
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
