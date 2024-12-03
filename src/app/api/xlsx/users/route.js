import { connection } from '@/libs/mysql'
import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

const queryToUsers = `
SELECT 
  u.correo_usuario,
  u.contrasena_usuario,
  u.nombres_usuario,
  u.apellidos_usuario,
  r.nombre_rol AS rol_usuario,
  s.nombre_status AS status_usuario
FROM tbl_usuarios u
JOIN tbl_roles r ON u.id_rol_usuario = r.id_rol
JOIN tbl_status_usuarios s ON u.id_status_usuario = s.id_status
`

export async function GET() {
  try {
    // Consulta la tabla tbl_X
    const [rows] = await connection.execute(queryToUsers)

    // Crea un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new()

    // Convierte los datos en una hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(rows)

    // Agrega la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios')

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
    const fileName = `usuarios-${hour}:${time}-${date}-${month}-${year}`

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
      { message: 'Error generating users Excel' },
      { status: 500 }
    )
  } finally {
    await connection.end()
  }
}