import { LogsTable } from '@/components/organisms/tables/LogsTable'
import { Section } from '@/components/atoms/Section'
import { getAllLogs } from '@/services/logs'

export const metadata = {
  title: 'Bitácora',
  description: 'Página de la bitácora',
}
const TABLE_HEADER_LOGS = ['Usuario', 'Descripción', 'Fecha']
const TITLE_LOGS = 'Bitácora'
const SUBTITLE_LOGS = 'Tabla con los registros del sistema'

export default async function LogsPage() {
  const { data: logs = [] } = await getAllLogs()
  const logsMapped = logs.map(log => {
    return {
      id: log.id_registro,
      correo: log.correo_usuario,
      descripcion: log.descripcion_bitacora,
      fecha: log.fecha_registro,
    }
  })

  return (
    <Section>
      {logsMapped.length > 0 && (
        <LogsTable
          title={TITLE_LOGS}
          subtitle={SUBTITLE_LOGS}
          tableHeader={TABLE_HEADER_LOGS}
          tableRows={logsMapped}
        />
      )}
    </Section>
  )
}
