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


// Agregar un nuevo medicamento
export async function POST(req) {
  try {
    const { idPaciente,nombreMedicamento,dosisMedicamento,viaAdministracionMedicamento,intervaloMedicamento,fechaInicioMedicamento, fechaFinMedicamento} = await req.json()

    const result = await connection.query('INSERT INTO tbl_medicamentos SET ?', {
      id_paciente: idPaciente,
      nombre_medicamento: nombreMedicamento,
      dosis_medicamento: dosisMedicamento,
      via_administracion_medicamento: viaAdministracionMedicamento,
      intervalo_medicamento: intervaloMedicamento,
      fecha_inicio_medicamento: fechaInicioMedicamento,
      fecha_fin_medicamento: fechaFinMedicamento,
    })

    return NextResponse.json(
      {
        message: 'Medication created successfully',
        medication: {
          idMedication: result.insertId,
          idPaciente
        },
      },
      { status: 201 }
    )
  } catch (error) {
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