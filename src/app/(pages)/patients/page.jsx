import { Section } from '@/components/atoms/Section'
import { getAllPatients } from '@/services/patients'
import { PatientsTable } from '@/components/organisms/tables/PatientsTable'

export const metadata = {
  title: 'Pacientes',
  description: 'Página de pacientes',
}

const TABLE_HEADER_PATIENTS = [
  'Cédula',
  'Apellidos',
  'Nombres',
  'Edad',
  'Teléfono',
  'Última consulta',
  'Acciones',
]
const TITLE_PATIENTS = 'Pacientes'
const SUBTITLE_PATIENTS = 'Tabla con todos los pacientes registrados'

export default async function PatientsPage() {
  const { data: patients = [] } = await getAllPatients()
  const mappedPatients = patients.map(patient => ({
    cedula: patient.cedula_paciente,
    nombres: patient.nombres_paciente,
    apellidos: patient.apellidos_paciente,
    telefono: patient.telefono_paciente,
    fechaNacimiento: patient.fecha_nacimiento_paciente,
  }))

  return (
    <Section>
      {patients.length > 0 && (
        <PatientsTable
          title={TITLE_PATIENTS}
          subtitle={SUBTITLE_PATIENTS}
          tableHeader={TABLE_HEADER_PATIENTS}
          tableRows={mappedPatients}
        />
      )}
    </Section>
  )
}
