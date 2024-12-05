import { LogsTable } from '@/components/organisms/tables/LogsTable'
import { Section } from '@/components/atoms/Section'

export const metadata = {
  title: 'Bitácora',
  description: 'Página de la bitácora',
}

const TABLE_HEADER_LOGS = ['Usuario', 'Fecha', 'Acciones']
const TITLE_LOGS = 'Bitácora'
const SUBTITLE_LOGS = 'Tabla con los registros del sistema'

export default function LogsPage() {
  const logs = [
    {
      id: 1,
      usuario: 'admin@admin.com',
      fecha: '06/12/2024, 09:24:00 p. m.',
      acciones: 'Deshabilitó al usuario [medico@medico.com]',
    },
    {
      id: 2,
      usuario: 'admin@admin.com',
      fecha: '06/12/2024, 09:24:00 p. m.',
      acciones: 'Habilitó al usuario [medico@medico.com]',
    },
    {
      id: 3,
      usuario: 'dev@dev.com',
      fecha: '06/12/2024, 10:00:00 a. m.',
      acciones: 'Inició sesión en el sistema.',
    },
    {
      id: 4,
      usuario: 'medico@medico.com',
      fecha: '06/12/2024, 10:05:00 a. m.',
      acciones: 'Registró un nuevo paciente [21.657.789].',
    },
    {
      id: 5,
      usuario: 'visualizador@visualizador.com',
      fecha: '06/12/2024, 10:15:00 a. m.',
      acciones: 'Inició sesión en el sistema.',
    },
    {
      id: 6,
      usuario: 'dev@dev.com',
      fecha: '06/12/2024, 10:20:00 a. m.',
      acciones: 'Cerró sesión en el sistema.',
    },
    {
      id: 7,
      usuario: 'medico@medico.com',
      fecha: '06/12/2024, 10:25:00 a. m.',
      acciones: 'Registró un nuevo paciente [12.345.678].',
    },
    {
      id: 8,
      usuario: 'admin@admin.com',
      fecha: '06/12/2024, 10:30:00 a. m.',
      acciones: 'Habilitó al usuario [visualizador@visualizador.com].',
    },
    {
      id: 9,
      usuario: 'visualizador@visualizador.com',
      fecha: '06/12/2024, 10:35:00 a. m.',
      acciones: 'Cerró sesión en el sistema.',
    },
    {
      id: 10,
      usuario: 'admin@admin.com',
      fecha: '06/12/2024, 11:00:00 a. m.',
      acciones: 'Registró un nuevo paciente [8.765.432].',
    },
    {
      id: 11,
      usuario: 'dev@dev.com',
      fecha: '06/12/2024, 11:15:00 a. m.',
      acciones: 'Inició sesión en el sistema.',
    },
    {
      id: 12,
      usuario: 'dr.jones@hospital.com',
      fecha: '06/12/2024, 11:20:00 a. m.',
      acciones: 'Cerró sesión en el sistema.',
    },
    {
      id: 14,
      usuario: 'admin@admin.com',
      fecha: '06/12/2024, 11:30:00 a. m.',
      acciones: 'Deshabilitó al usuario [dev@dev.com].',
    },
    {
      id: 15,
      usuario: 'visualizador@visualizador.com',
      fecha: '06/12/2024, 11:35:00 a. m.',
      acciones: 'Inició sesión en el sistema.',
    },
    {
      id: 16,
      usuario: 'admin@admin.com',
      fecha: '06/12/2024, 11 :40 :00 a.m.',
      acciones: 'Cerró sesión en el sistema.',
    },
    {
      id: 17,
      usuario: 'dev@dev.com',
      fecha: '06 /12 /2024 ,11 :45 :00 a.m.',
      acciones: 'Registró un nuevo paciente [María López] .',
    },
    {
      id: 18,
      usuario: 'medico@medico.com',
      fecha: '06 /12 /2024 ,11 :50 :00 a.m.',
      acciones: 'Inició sesión en el sistema.',
    },
    {
      id: 19,
      usuario: 'dr.jones@hospital.com',
      fecha: '06 /12 /2024 ,11 :55 :00 a.m.',
      acciones: 'Cerró sesión en el sistema.',
    },
    {
      id: 20,
      usuario: 'visualizador@visualizador.com',
      fecha: '06 /12 /2024 ,12 :00 :00 p.m.',
      acciones: 'Deshabilitó al paciente [María López] .',
    },
  ]

  return (
    <Section>
      {logs.length > 0 && (
        <LogsTable
          title={TITLE_LOGS}
          subtitle={SUBTITLE_LOGS}
          tableHeader={TABLE_HEADER_LOGS}
          tableRows={logs}
        />
      )}
    </Section>
  )
}
