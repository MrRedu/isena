import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

export async function GET() {
  try {
    const [result] = await connection.query(`
      SELECT 
    u.id_usuario,
    u.nombres_usuario,
    u.apellidos_usuario,
    u.correo_usuario,
    u.contrasena_usuario,
    r.nombre_rol,
    s.nombre_status
    FROM 
        tbl_usuarios u
    JOIN 
        tbl_roles r ON u.id_rol_usuario = r.id_rol
    JOIN 
        tbl_status_usuarios s ON u.id_status_usuario = s.id_status;
      `);

    return NextResponse.json({ data: result, message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading users',
      },
      { status: 500 }
    )
  }
}

// Crear un nuevo usuario
export async function POST(req) {
  try {
    const { name, lastName, email, password } = await req.json()

    const result = await connection.query('INSERT INTO tbl_usuarios SET ?', {
      nombres_usuario: name,
      apellidos_usuario: lastName,
      correo_usuario: email,
      contrasena_usuario: password,
    })

    return NextResponse.json(
      {
        message: 'User created successfully',
        idUser: result[0].insertId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error creating user',
      },
      { status: 500 }
    )
  }
}