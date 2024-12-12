import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { formatNumber } from '@/utils/utils'

export async function GET() {
  try {
    const [result] = await connection.query('SELECT * FROM tbl_pacientes')

    return NextResponse.json({ data: result, message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading patients',
      },
      { status: 500 }
    )
  }
}

// Registrar un nuevo paciente
export async function POST(req) {
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

    const result = await connection.query('INSERT INTO tbl_pacientes SET ?', {
      nombres_paciente: nombresPaciente,
      apellidos_paciente: apellidosPaciente,
      cedula_paciente: Number(cedulaPaciente),
      telefono_paciente: telefonoPaciente,
      fecha_nacimiento_paciente: fechaNacimientoPaciente,
      correo_paciente: correoPaciente,
      direccion_paciente: direccionPaciente,
    })

    await connection.query('INSERT INTO tbl_bitacora SET ?', {
      id_usuario: user.idUser,
      descripcion_bitacora: `El usuario ${user.email} registró al paciente ${formatNumber(cedulaPaciente)}`,
      fecha_registro: new Date(),
    })

    return NextResponse.json(
      {
        message: 'Patient created successfully',
        patient: {
          idPatient: result[0].insertId,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error creating patient',
      },
      { status: 500 }
    )
  }
}
