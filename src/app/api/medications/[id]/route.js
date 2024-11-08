import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

// Eliminar medicamento
export async function DELETE(req, { params }) {
  try {
    const result = await connection.query(
      'DELETE FROM tbl_medicamentos WHERE id_medicamento = ?',
      [params.id]
    )

    if (result[0].length === 0) {
      return NextResponse.json(
        { message: 'Medication not found' },
        { status: 404 }
      )
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error deleting medication',
      },
      { status: 500 }
    )
  }
}
