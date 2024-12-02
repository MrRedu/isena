import { connection } from '@/libs/mysql'
import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

const queryToPatients = `
SELECT 
  p.cedula_paciente,
  p.nombres_paciente,
  p.apellidos_paciente,
  p.telefono_paciente,
  p.fecha_nacimiento_paciente,
  p.correo_paciente,
  p.direccion_paciente
FROM tbl_pacientes p
`

export async function GET() {
  try {
    // Consulta la tabla tbl_X
    const [rows] = await connection.execute(queryToPatients)

    // Crea un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new()

    // Convierte los datos en una hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(rows)

    // Agrega la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pacientes')

    // Genera el archivo Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
    })

    const now = new Date()
    const date = now.getDate().toString().padStart(2, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const year = now.getFullYear()
    const hour = now.getHours().toString().padStart(2, '0')
    const time = now.getMinutes().toString().padStart(2, '0')
    const fileName = `pacientes-${hour}:${time}-${date}-${month}-${year}`

    // Devuelve el archivo como respuesta
    return new Response(excelBuffer, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${fileName}.xlsx"`,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error generating patients Excel' },
      { status: 500 }
    )
  } finally {
    await connection.end()
  }
}
