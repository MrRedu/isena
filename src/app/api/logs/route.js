import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

export async function GET() {
  try {
    const query = `
      SELECT b.*, u.correo_usuario 
      FROM tbl_bitacora b
      JOIN tbl_usuarios u ON b.id_usuario = u.id_usuario
    `

    const [result] = await connection.query(query)

    return NextResponse.json({ data: result, message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading logs',
      },
      { status: 500 }
    )
  }
}

// export async function POST(req) {}
