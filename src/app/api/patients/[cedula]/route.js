import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

export async function GET(req, { params }) {
  try {
    const [result] = await connection.query(
      'SELECT * FROM tbl_pacientes WHERE cedula_paciente = ?',
      [params.cedula]
    )

    if (result.length === 0) {
      return NextResponse.json({ message: 'Patient not found' }, { status: 404 })
    }

    return NextResponse.json({ data: result[0], message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading patient',
      },
      { status: 500 }
    )
  }
}