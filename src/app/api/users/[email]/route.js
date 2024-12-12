import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(req, { params }) {
  try {
    const [result] = await connection.query(
      `SELECT 
          u.id_usuario,
          u.nombres_usuario,
          u.apellidos_usuario,
          u.correo_usuario,
          u.contrasena_usuario,
          r.nombre_rol AS rol_usuario,
          s.nombre_status AS status_usuario
       FROM 
          tbl_usuarios u
       JOIN 
          tbl_roles r ON u.id_rol_usuario = r.id_rol
       JOIN 
          tbl_status_usuarios s ON u.id_status_usuario = s.id_status
       WHERE 
          u.correo_usuario = ?`,
      [params.email]
    )

    if (result.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
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
        manualMessage: 'Error loading user',
      },
      { status: 500 }
    )
  }
}

// Actualizar un usuario
export async function PUT(req, { params }) {
  try {
    const { name, lastName, idStatus, idRol } = await req.json()

    // Construir la consulta y los parámetros
    let query = 'UPDATE tbl_usuarios SET '
    const updates = []
    const paramsArray = []

    // Solo añadir actualizaciones si se proporcionan
    if (name) {
      updates.push('nombres_usuario = ?')
      paramsArray.push(name)
    }

    if (lastName) {
      updates.push('apellidos_usuario = ?')
      paramsArray.push(lastName)
    }

    if (idStatus) {
      updates.push('id_status_usuario = ?')
      paramsArray.push(Number(idStatus))
    }

    if (idRol) {
      updates.push('id_rol_usuario = ?')
      paramsArray.push(Number(idRol))
    }

    // Comprobar si hay actualizaciones para evitar consultas vacías
    if (updates.length === 0) {
      return NextResponse.json(
        {
          message: 'No data provided to update',
        },
        { status: 400 }
      )
    }

    // Añadir la condición WHERE
    query += updates.join(', ') + ' WHERE correo_usuario = ?'
    paramsArray.push(params.email)

    // Ejecutar la consulta
    const result = await connection.query(query, paramsArray)

    const { user } = await getServerSession(authOptions)

    await connection.query('INSERT INTO tbl_bitacora SET ?', {
      id_usuario: user.idUser,
      descripcion_bitacora: `El usuario ${user.email} actualizó al usuario ${params.email}`,
      fecha_registro: new Date(),
    })

    return NextResponse.json(
      {
        message: 'User updated successfully',
        idUser: result[0].insertId,
      },
      { status: 201 }
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
