import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

export async function GET() {
  try {
    const [result] = await connection.query("SELECT * FROM tbl_medicamentos");

    return NextResponse.json({ data: result, message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading medications',
      },
      { status: 500 }
    )
  }
}