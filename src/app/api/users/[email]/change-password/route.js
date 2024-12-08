import { hashPassword, validatePassword } from '@/services/authServices'
import { connection } from '@/libs/mysql'
import { NextResponse } from 'next/server'

export async function PUT(req, { params }) {
  const { oldPassword, newPassword } = await req.json()

  const [result] = await connection.query(
    'SELECT contrasena_usuario FROM tbl_usuarios WHERE correo_usuario = ?',
    [params.email]
  )

  if (result.length === 0) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  const validationOldPassword = await validatePassword(
    oldPassword,
    result[0].contrasena_usuario
  )

  if (!validationOldPassword) {
    return NextResponse.json(
      { message: 'Incorrect old password' },
      { status: 400 }
    )
  }

  if (oldPassword === newPassword) {
    return NextResponse.json(
      { message: 'New password cannot be the same as the old password' },
      { status: 400 }
    )
  }

  const hashedNewPassword = await hashPassword(newPassword)

  if (!hashedNewPassword) {
    return NextResponse.json(
      { message: 'Error hashing new password' },
      { status: 500 }
    )
  }

  try {
    await connection.query(
      'UPDATE tbl_usuarios SET contrasena_usuario = ? WHERE correo_usuario = ?',
      [hashedNewPassword, params.email]
    )
    return NextResponse.json(
      { message: 'Password changed successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error changing password',
      },
      { status: 500 }
    )
  }
}
