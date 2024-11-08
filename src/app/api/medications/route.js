import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

export async function GET() {
  try {
    const [result] = await connection.query('SELECT * FROM tbl_medicamentos')

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

export async function POST(req) {
  try {
    // Extract medication details from the request body
    const {
      cedulaPaciente,
      nombreMedicamento,
      dosisMedicamento,
      viaAdministracionMedicamento,
      intervaloMedicamento,
      fechaInicioMedicamento,
      fechaFinMedicamento,
    } = await req.json()

    // Insert the new medication into the database
    const result = await connection.query(
      'INSERT INTO tbl_medicamentos SET ?',
      {
        cedula_paciente: cedulaPaciente,
        nombre_medicamento: nombreMedicamento,
        dosis_medicamento: dosisMedicamento,
        via_administracion_medicamento: viaAdministracionMedicamento,
        intervalo_medicamento: intervaloMedicamento,
        fecha_inicio_medicamento: fechaInicioMedicamento,
        fecha_fin_medicamento: fechaFinMedicamento,
      }
    )

    // Return a success response with the new medication ID
    return NextResponse.json(
      {
        idMedicamento: result[0].insertId,
        message: 'Medication created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    // Log the error and return a failure response
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error creating medication',
      },
      { status: 500 }
    )
  }
}
