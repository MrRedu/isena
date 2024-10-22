import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

export async function GET(req, { params }) {
  try {
    const [result] = await connection.query(
      'SELECT * FROM tbl_usuarios WHERE correo_usuario = ?',
      [params.email]
    )

    if (result.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ data: result[0] }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading user',
      },
      { status: 500 }
    )
  }
}