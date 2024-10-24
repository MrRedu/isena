

import { Section } from "@/components/atoms/Section";
// Mover de aqui
import { Table } from "./Table";
import { getAllPatients } from "@/services/patients";

const TABLE_HEADER_PATIENTS = ["Cédula", "Apellidos", "Nombres", "Edad", "Teléfono", "Última consulta", "Acciones"];
const TITLE_PATIENTS = "Pacientes";
const SUBTITLE_PATIENTS = "These are details about the last transactions";

export default async function PatientsPage() {
  const { data: patients } = await getAllPatients();
  const mappedPatients = patients.map((patient) => ({
    id: patient.id_paciente,
    cedula: patient.cedula_paciente,
    nombres: patient.nombres_paciente,
    apellidos: patient.apellidos_paciente,
    telefono: patient.telefono_paciente,
    fechaNacimiento: patient.fecha_nacimiento_paciente,
  }))

  return (
    <Section>
      <Table title={TITLE_PATIENTS} subtitle={SUBTITLE_PATIENTS} tableHeader={TABLE_HEADER_PATIENTS} tableRows={mappedPatients} />
    </Section>
  )
};
