import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

export async function GET(req, { params }) {
  try {
    const [result] = await connection.query(
      'SELECT * FROM tbl_antecedentes WHERE cedula_paciente = ?',
      [params.cedula]
    )

    if (result.length === 0) {
      return NextResponse.json(
        { message: 'Medical history not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: result, message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading medical history',
      },
      { status: 500 }
    )
  }
}
