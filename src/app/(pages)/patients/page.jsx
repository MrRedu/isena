

import { Section } from "@/components/atoms/Section";
// Mover de aqui
import { Table } from "./Table";

const TABLE_HEADER_PATIENTS = ["Cédula", "Apellidos", "Nombres", "Edad", "Teléfono", "Género", "Última consulta", "Acciones"];
const TABLE_ROWS_PATIENTS = [
  {
    cedula: "12333444",
    nombres: "Ramona Cleopatra",
    apellidos: "Romero Fernandez",
    telefono: "04141234567",
    genero: "femenino",
    fechaNacimiento: "12/02/1999",
    ultimaConsulta: "20/02/2023",
  },
  {
    cedula: "12666999",
    nombres: "José Ramón",
    apellidos: "Romero Fernandez",
    telefono: "04147654321",
    genero: "masculino",
    fechaNacimiento: "02/02/1984",
    ultimaConsulta: "20/02/2024",
  },
  {
    cedula: "13456789",
    nombres: "María Elena",
    apellidos: "González Pérez",
    telefono: "04141234568",
    genero: "femenino",
    fechaNacimiento: "03/03/1990",
    ultimaConsulta: "05/01/2024",
  },
  {
    cedula: "14567890",
    nombres: "Carlos Alberto",
    apellidos: "Martínez López",
    telefono: "04141234569",
    genero: "masculino",
    fechaNacimiento: "07/07/1985",
    ultimaConsulta: "09/09/2023",
  },
  {
    cedula: "15678901",
    nombres: "Ana Sofía",
    apellidos: "Torres Jiménez",
    telefono: "04141234570",
    genero: "femenino",
    fechaNacimiento: "11/11/1992",
    ultimaConsulta: "10/10/2023",
  },
  {
    cedula: "16789012",
    nombres: "Luis Miguel",
    apellidos: "Hernández Ruiz",
    telefono: "04141234571",
    genero: "masculino",
    fechaNacimiento: "04/18/1988",
    ultimaConsulta: "01/12/2023",
  },
  {
    cedula: "17890123",
    nombres: "Claudia Patricia",
    apellidos: "Vásquez Gómez",
    telefono: "04141234572",
    genero: "femenino",
    fechaNacimiento: "08/08/1995",
    ultimaConsulta: "22/11/2023",
  },
  {
    cedula: "18901234",
    nombres: "Fernando José",
    apellidos: "Rojas Martínez",
    telefono: "04141234573",
    genero: "masculino",
    fechaNacimiento: "02/01/1980",
    ultimaConsulta: "30/06/2023",
  },
];
const TITLE_PATIENTS = "Pacientes";
const SUBTITLE_PATIENTS = "These are details about the last transactions";

export default function PatientsPage() {
  return (
    <Section>


      <Table title={TITLE_PATIENTS} subtitle={SUBTITLE_PATIENTS} tableHeader={TABLE_HEADER_PATIENTS} tableRows={TABLE_ROWS_PATIENTS} />

    </Section>
  )
};
