import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { formatNumber } from '@/utils/utils'

export async function GET(req, { params }) {
  try {
    const [result] = await connection.query(
      `
SELECT 
    p.cedula_paciente,
    p.nombres_paciente,
    p.apellidos_paciente,
    p.cedula_paciente,
    p.telefono_paciente,
    p.fecha_nacimiento_paciente,
    p.correo_paciente,
    p.direccion_paciente,

    -- Agrupando pesos en un array
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('fecha_peso', pw.fecha_registro, 'valor', pw.peso))
     FROM tbl_pesos pw 
     WHERE pw.cedula_paciente = p.cedula_paciente) AS pesos,

    -- Agrupando alturas en un array
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('fecha_altura', pa.fecha_registro, 'valor', pa.altura))
     FROM tbl_alturas pa 
     WHERE pa.cedula_paciente = p.cedula_paciente) AS alturas,

    -- Agrupando temperaturas en un array
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('fecha_temperatura', pt.fecha_registro, 'valor', pt.temperatura))
     FROM tbl_temperaturas pt 
     WHERE pt.cedula_paciente = p.cedula_paciente) AS temperaturas,

    -- Agrupando frecuencias respiratorias en un array
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('fecha_frecuencia_respiratoria', fr.fecha_registro, 'valor', fr.frecuencia_respiratoria))
     FROM tbl_frecuencias_respiratorias fr 
     WHERE fr.cedula_paciente = p.cedula_paciente) AS frecuencias_respiratorias,

    -- Agrupando presiones arteriales en un array
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('fecha_presion', pr.fecha_registro, 'sistolica', pr.presion_sistolica, 'diastolica', pr.presion_diastolica))
     FROM tbl_presiones_arteriales pr 
     WHERE pr.cedula_paciente = p.cedula_paciente) AS presiones_arteriales,

    -- Agrupando frecuencias cardíacas en un array
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('fecha_frecuencia_cardiaca', fc.fecha_registro, 'valor', fc.frecuencia_cardiaca))
     FROM tbl_frecuencias_cardiacas fc 
     WHERE fc.cedula_paciente = p.cedula_paciente) AS frecuencias_cardiacas,

    -- Agrupando medicamentos en un array
    (SELECT JSON_ARRAYAGG(JSON_OBJECT(
        'id_medicamento', m.id_medicamento,
        'nombre_medicamento', m.nombre_medicamento,
        'dosis_medicamento', m.dosis_medicamento,
        'via_administracion_medicamento', m.via_administracion_medicamento,
        'intervalo_medicamento', m.intervalo_medicamento,
        'fecha_inicio_medicamento', m.fecha_inicio_medicamento,
        'fecha_fin_medicamento', m.fecha_fin_medicamento
      ))
     FROM tbl_medicamentos m 
     WHERE m.cedula_paciente = p.cedula_paciente) AS medicamentos

FROM 
    tbl_pacientes p

WHERE 
    p.cedula_paciente = ?
      `,
      [params.cedula]
    )

    if (result.length === 0) {
      return NextResponse.json(
        { message: 'Patient not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { data: result[0], message: 'OK' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading patient',
      },
      { status: 500 }
    )
  }
}

export async function PUT(req, { params }) {
  try {
    const {
      nombresPaciente,
      apellidosPaciente,
      cedulaPaciente,
      telefonoPaciente,
      fechaNacimientoPaciente,
      correoPaciente,
      direccionPaciente,
    } = await req.json()

    const { user } = await getServerSession(authOptions)

    const result = await connection.query(
      'UPDATE tbl_pacientes SET ? WHERE cedula_paciente = ?',
      [
        {
          nombres_paciente: nombresPaciente,
          apellidos_paciente: apellidosPaciente,
          cedula_paciente: Number(cedulaPaciente),
          telefono_paciente: telefonoPaciente,
          fecha_nacimiento_paciente: fechaNacimientoPaciente,
          correo_paciente: correoPaciente,
          direccion_paciente: direccionPaciente,
        },
        params.cedula,
      ]
    )

    if (result[0].affectedRows === 0) {
      return NextResponse.json(
        { message: 'Patient not found' },
        { status: 404 }
      )
    }

    await connection.query('INSERT INTO tbl_bitacora SET ?', {
      id_usuario: user.idUser,
      descripcion_bitacora: `El usuario ${user.email} actualizó al paciente ${formatNumber(cedulaPaciente)}`,
      fecha_registro: new Date(),
    })

    return NextResponse.json(
      { message: 'User updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error updating user',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(req, { params }) {
  try {
    const result = await connection.query(
      'DELETE FROM tbl_pacientes WHERE cedula_paciente = ?',
      [params.cedula]
    )

    if (result[0].length === 0) {
      return NextResponse.json(
        { message: 'Patient not found' },
        { status: 404 }
      )
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error deleting patient',
      },
      { status: 500 }
    )
  }
}
