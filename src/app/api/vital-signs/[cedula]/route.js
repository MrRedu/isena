import { NextResponse } from 'next/server'
import { connection } from '@/libs/mysql'

export async function GET( req, { params } ) {
  try {
    const [result] = await connection.query(`
    SELECT 
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('fecha_peso', pw.fecha_registro, 'valor', pw.peso))
     FROM tbl_pesos pw 
     WHERE pw.cedula_paciente = p.cedula_paciente) AS pesos,

    (SELECT JSON_ARRAYAGG(JSON_OBJECT('fecha_altura', pa.fecha_registro, 'valor', pa.altura))
     FROM tbl_alturas pa 
     WHERE pa.cedula_paciente = p.cedula_paciente) AS alturas,

    (SELECT JSON_ARRAYAGG(JSON_OBJECT('fecha_temperatura', pt.fecha_registro, 'valor', pt.temperatura))
     FROM tbl_temperaturas pt 
     WHERE pt.cedula_paciente = p.cedula_paciente) AS temperaturas,

    (SELECT JSON_ARRAYAGG(JSON_OBJECT('fecha_frecuencia_respiratoria', fr.fecha_registro, 'valor', fr.frecuencia_respiratoria))
     FROM tbl_frecuencias_respiratorias fr 
     WHERE fr.cedula_paciente = p.cedula_paciente) AS frecuencias_respiratorias,

    (SELECT JSON_ARRAYAGG(JSON_OBJECT('fecha_presion', pr.fecha_registro, 'sistolica', pr.presion_sistolica, 'diastolica', pr.presion_diastolica))
     FROM tbl_presiones_arteriales pr 
     WHERE pr.cedula_paciente = p.cedula_paciente) AS presiones_arteriales,

    (SELECT JSON_ARRAYAGG(JSON_OBJECT('fecha_frecuencia_cardiaca', fc.fecha_registro, 'valor', fc.frecuencia_cardiaca))
     FROM tbl_frecuencias_cardiacas fc 
     WHERE fc.cedula_paciente = p.cedula_paciente) AS frecuencias_cardiacas

    FROM tbl_pacientes p
    WHERE p.cedula_paciente = ?
    `, [params.cedula]);

    return NextResponse.json({ data: result[0], message: 'OK' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: error.message,
        manualMessage: 'Error loading vital signs',
      },
      { status: 500 }
    )
  }
}