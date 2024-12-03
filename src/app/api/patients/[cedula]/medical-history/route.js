import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

export async function GET(req, { params }) {
  try {
    const [result] = await connection.query(
      `
      SELECT 
    a.id_antecedente,
    a.cedula_paciente,
    t.id_tipo_antecedente,
    t.nombre_tipo_antecedente AS tipo_antecedente,
    a.titulo,
    a.descripcion
FROM 
    tbl_antecedentes a
JOIN 
    tbl_tipos_antecedentes t ON a.id_tipo_antecedente = t.id_tipo_antecedente
WHERE 
    a.cedula_paciente = ?
      `,
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

export async function POST(req, { params }) {
  try {
    const {
      type,
      title,
      description,
    } = await req.json()

    await connection.query('INSERT INTO tbl_antecedentes SET ?', {
      cedula_paciente: params.cedula,
      id_tipo_antecedente: type,
      titulo: title,
      descripcion: description,
    })

    return NextResponse.json(
      { message: 'Medical history created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error creating medical history',
      },
      { status: 500 }
    )
  }
}
