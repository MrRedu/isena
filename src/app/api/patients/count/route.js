import { connection } from '@/libs/mysql'
import { NextResponse } from 'next/server'

export async function GET() {
  const [result] = await connection.query('SELECT COUNT(*) FROM tbl_pacientes')
  return NextResponse.json({ count: result[0]['COUNT(*)'] })
}
