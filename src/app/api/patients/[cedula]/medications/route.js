import { connection } from "#/src/app/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
  try {
    const [result] = await connection.query("SELECT * FROM tbl_medicamentos WHERE cedula_paciente = ?", [params.cedula]);

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