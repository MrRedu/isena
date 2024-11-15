import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

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

export async function PUT(req, { params }) {
  try {
    const { name, lastName } = await req.json()

    const result = await connection.query(
      'UPDATE tbl_usuarios SET nombres_usuario = ?, apellidos_usuario = ? WHERE correo_usuario = ?',
      [name, lastName, params.email]
    )

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
