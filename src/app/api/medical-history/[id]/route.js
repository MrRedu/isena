import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

// Eliminar antecedente médico
export async function DELETE(req, { params }) {
  try {
    const result = await connection.query(
      'DELETE FROM tbl_antecedentes WHERE id_antecedente = ?',
      [params.id]
    )

    if (result[0].length === 0) {
      return NextResponse.json(
        { message: 'Medical history not found' },
        { status: 404 }
      )
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error deleting medical history',
      },
      { status: 500 }
    )
  }
}
